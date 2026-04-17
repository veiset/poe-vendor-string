/**
 * Fetches map-mod affix classification (prefix/suffix) from RePoE and writes
 * a tokenId -> isPrefix JSON file consumed at runtime by the Maps page.
 *
 * Source:
 *   https://github.com/lvlvllvlvllvlvl/RePoE
 *     - data/mods.min.json              - all mods incl. domain=map + generation_type
 *     - data/stat_translations.min.json - stat id -> English text
 *
 * Matching strategy:
 *   For each token in Generated.MapModsV3.ENGLISH.ts, split generalizedText on '|'
 *   to get individual stat-line alternatives, normalize, and look for any RePoE
 *   map mod whose resolved stat text matches. First match wins; a map mod's
 *   generation_type is a property of the mod itself (not per stat), so any
 *   matching alternative tells us the affix.
 *
 * Output format: { [tokenId: string]: boolean }  (true = prefix, false = suffix)
 *
 * Run: npm run fetch-map-affixes
 */

import * as fs from "fs";
import * as path from "path";

const MODS_URL = "https://raw.githubusercontent.com/lvlvllvlvllvlvl/RePoE/master/RePoE/data/mods.json";

/**
 * Manual overrides for tokens whose text isn't present in RePoE mods.json
 * (e.g., newer T17 additions that RePoE hasn't ingested yet).
 * Key is the token id as it appears in Generated.MapModsV3.ENGLISH.ts.
 * true = prefix, false = suffix.
 */
const MANUAL_OVERRIDES: Record<string, boolean> = {
  "-105914721": false,   // Players have 40% less effect of Flasks applied to them  (of Impotence)
  "972998450": true,     // Rare monsters in area Temporarily Revive on death
  "1538178254": true,    // Area contains Labyrinth Hazards
  "1861748274": true,    // Auras from Player Skills which affect Allies also affect Enemies
  "1932675161": true,    // Area contains patches of moving Marked Ground
};

const MAP_MODS_FILE = path.join(__dirname, "../src/generated/mapmods/Generated.MapModsV3.ENGLISH.ts");
const OUTPUT_FILE = path.join(__dirname, "../src/generated/mapmods/affixes/MapModAffixes.json");

interface MapModToken {
  id: number;
  rawText: string;
  generalizedText: string;
}

interface RePoEMod {
  name: string;
  domain: string;
  generation_type: string;
  text?: string;
}

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: { "User-Agent": "poe-vendor-string/1.0 (https://poe.re)" },
  });
  if (!res.ok) throw new Error(`Fetch failed ${url}: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
};

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\^|\$/g, "")
    .replace(/\{\d+\}/g, "#")       // stat translation placeholders like {0}
    .replace(/\([^)]*\)/g, "#")     // (20-60) ranges → #
    .replace(/\+/g, "")
    .replace(/-?\d+(?:\.\d+)?/g, "#") // any remaining literal numbers → #
    .replace(/#%?/g, "NUM")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const parseTokens = (content: string): MapModToken[] => {
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
  return tokens;
};

const resolveModTexts = (mod: RePoEMod): string[] =>
  (mod.text ?? "").split("\n").map(normalize).filter(Boolean);

const classifyToken = (token: MapModToken, mapMods: RePoEMod[]): boolean | null => {
  const alternatives = token.generalizedText.split("|").map(normalize).filter(Boolean);
  for (const mod of mapMods) {
    const modTexts = resolveModTexts(mod);
    for (const altText of alternatives) {
      if (modTexts.includes(altText)) {
        return mod.generation_type === "prefix";
      }
    }
  }
  return null;
};

const main = async (): Promise<void> => {
  console.log(`Reading ${MAP_MODS_FILE}`);
  const content = fs.readFileSync(MAP_MODS_FILE, "utf-8");
  const tokens = parseTokens(content);
  console.log(`  ${tokens.length} tokens`);

  console.log("Fetching RePoE mods");
  const modsRaw = await fetchJson<Record<string, RePoEMod>>(MODS_URL);

  // Regular map mods live in domain "area"; Tier-17 / "nightmare" map mods in "uber_map".
  const mapMods = Object.values(modsRaw).filter(
    (m) =>
      (m.domain === "area" || m.domain === "uber_map") &&
      (m.generation_type === "prefix" || m.generation_type === "suffix"),
  );
  console.log(`  ${mapMods.length} map prefix/suffix mods`);

  const output: Record<string, boolean> = {};
  const unmatched: MapModToken[] = [];
  let overrideCount = 0;
  for (const token of tokens) {
    const key = String(token.id);
    if (key in MANUAL_OVERRIDES) {
      output[key] = MANUAL_OVERRIDES[key];
      overrideCount++;
      continue;
    }
    const isPrefix = classifyToken(token, mapMods);
    if (isPrefix === null) {
      unmatched.push(token);
    } else {
      output[key] = isPrefix;
    }
  }
  console.log(`  ${overrideCount} from manual overrides`);

  console.log(`\nMatched ${Object.keys(output).length}/${tokens.length}`);
  if (unmatched.length > 0) {
    console.error("\nUnmatched tokens:");
    for (const t of unmatched) {
      console.error(`  ${t.id}  "${t.rawText}"`);
      console.error(`          normalized: "${normalize(t.generalizedText)}"`);
    }
    console.error("\nEvery token must be classified. Adjust the matcher or add overrides.");
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n", "utf-8");
  console.log(`\nWrote ${OUTPUT_FILE}`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
