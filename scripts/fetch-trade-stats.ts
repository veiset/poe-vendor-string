/**
 * Script to fetch trade stats from PoE API and match them to map mod entries.
 *
 * This script:
 * 1. Fetches all stats from https://www.pathofexile.com/api/trade/data/stats
 * 2. Filters to only get "explicit" category entries
 * 3. Matches them against generalizedText in Generated.MapModsV3.ENGLISH.ts
 * 4. Outputs a JSON mapping file: { tokenId: tradeStatId }
 *
 * Run with: npm run fetch-trade-stats
 */

import * as fs from 'fs';
import * as path from 'path';

const STATS_API_URL = 'https://www.pathofexile.com/api/trade/data/stats';
const MAP_MODS_FILE = path.join(__dirname, '../src/generated/mapmods/Generated.MapModsV3.ENGLISH.ts');
const OUTPUT_FILE = path.join(__dirname, '../src/generated/mapmods/trade/TradeStatIdMatching.json');

interface TradeStatEntry {
  id: string;
  text: string;
  type: string;
}

interface TradeStatGroup {
  id: string;
  label: string;
  entries: TradeStatEntry[];
}

interface TradeStatsResponse {
  result: TradeStatGroup[];
}

interface MapModToken {
  id: number;
  generalizedText: string;
  rawText: string;
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\^|\$/g, '') // Remove regex anchors
    .replace(/\([^)]*\)/g, '#') // Replace (XX-YY) with #
    .replace(/\+/g, '') // Remove + signs
    .replace(/#%?/g, 'NUM') // Replace # or #% with NUM
    .replace(/[^\w\s]/g, ' ') // Replace special chars with space
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

function textsMatch(generalizedText: string, tradeText: string): boolean {
  const alternatives = generalizedText.split('|');

  for (const alt of alternatives) {
    const normalizedMod = normalizeText(alt);
    const normalizedTrade = normalizeText(tradeText);

    if (normalizedMod === normalizedTrade) {
      return true;
    }

    // Check if one contains the other (for partial matches)
    if (normalizedMod.includes(normalizedTrade) || normalizedTrade.includes(normalizedMod)) {
      const lenRatio = Math.min(normalizedMod.length, normalizedTrade.length) /
                       Math.max(normalizedMod.length, normalizedTrade.length);
      if (lenRatio > 0.7) {
        return true;
      }
    }

    // Handle map mods that don't have "have #% chance to" prefix
    const tradeWithoutChance = normalizedTrade
      .replace(/monsters have NUM chance to /i, 'monsters ')
      .replace(/players have NUM chance to /i, 'players ');

    if (normalizedMod === tradeWithoutChance) {
      return true;
    }

    const mapModWithChance = normalizedMod.replace(/^monsters /, 'monsters have NUM chance to ');
    if (mapModWithChance === normalizedTrade) {
      return true;
    }

    // Handle negative map mods mapped to positive trade stats
    const modWithPositive = normalizedMod
      .replace(/ less /g, ' more ')
      .replace(/ reduced /g, ' increased ');

    if (modWithPositive === normalizedTrade) {
      return true;
    }
  }

  return false;
}

async function fetchTradeStats(): Promise<TradeStatEntry[]> {
  console.log('Fetching trade stats from PoE API...');

  const response = await fetch(STATS_API_URL, {
    headers: {
      'User-Agent': 'poe-vendor-string/1.0 (https://poe.re)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
  }

  const data: TradeStatsResponse = await response.json();

  const explicitGroup = data.result.find(group => group.id === 'explicit');

  if (!explicitGroup) {
    throw new Error('Could not find "explicit" stat group in API response');
  }

  console.log(`Found ${explicitGroup.entries.length} explicit stats`);
  return explicitGroup.entries;
}

function parseMapModsFile(content: string): MapModToken[] {
  const tokenRegex = /\{id:\s*(-?\d+),\s*regex:\s*"[^"]*",\s*rawText:\s*"([^"]*)",\s*generalizedText:\s*"([^"]*)"/g;

  const tokens: MapModToken[] = [];
  let match;

  while ((match = tokenRegex.exec(content)) !== null) {
    tokens.push({
      id: parseInt(match[1], 10),
      rawText: match[2],
      generalizedText: match[3],
    });
  }

  console.log(`Parsed ${tokens.length} tokens from map mods file`);
  return tokens;
}

async function main() {
  try {
    console.log(`Reading ${MAP_MODS_FILE}...`);
    const fileContent = fs.readFileSync(MAP_MODS_FILE, 'utf-8');

    const tokens = parseMapModsFile(fileContent);
    const tradeStats = await fetchTradeStats();

    console.log('\nMatching tokens to trade stats...\n');

    const mapping: Record<string, string> = {};
    const unmatched: MapModToken[] = [];

    for (const token of tokens) {
      let found = false;
      for (const stat of tradeStats) {
        if (textsMatch(token.generalizedText, stat.text)) {
          mapping[token.id] = stat.id;
          found = true;
          console.log(`✓ Matched: "${token.rawText.substring(0, 50)}..." -> ${stat.id}`);
          break;
        }
      }
      if (!found) {
        unmatched.push(token);
      }
    }

    const matchedCount = Object.keys(mapping).length;

    // Write JSON mapping file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mapping, null, 2) + '\n', 'utf-8');

    console.log('\n' + '='.repeat(60));
    console.log(`Results:`);
    console.log(`  Matched: ${matchedCount}/${tokens.length} (${((matchedCount/tokens.length)*100).toFixed(1)}%)`);
    console.log(`  Unmatched: ${unmatched.length}`);

    if (unmatched.length > 0) {
      console.log('\nUnmatched mods (generalizedText -> normalized):');
      unmatched.forEach(token => {
        console.log(`  - "${token.generalizedText}"`);
        console.log(`    normalized: "${normalizeText(token.generalizedText)}"`);
      });
    }

    console.log(`\nOutput: ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
