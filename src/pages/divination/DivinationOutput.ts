export interface DivinationCardRegex {
  name: string;
  regex: string;
  chaosValue: number;
}

export interface DivinationPriceRegexResult {
  regex: string;
  included: DivinationCardRegex[];
  eligibleCount: number;
}

export const maxDivinationRegexLength = 250;

export function selectDivinationPriceRegex(
  cards: DivinationCardRegex[],
  minValue: number | undefined,
  maxValue: number | undefined,
): DivinationPriceRegexResult {
  const eligible = cards
    .filter((card) => card.chaosValue > 0)
    .filter((card) => (minValue === undefined || card.chaosValue >= minValue)
      && (maxValue === undefined || card.chaosValue <= maxValue));
  const included: DivinationCardRegex[] = [];
  let regex = "";

  for (const card of eligible) {
    const next = regex.length === 0 ? card.regex : `${regex}|${card.regex}`;
    if (next.length + 2 > maxDivinationRegexLength) break;
    regex = next;
    included.push(card);
  }

  return {
    regex: regex.length > 0 ? `"${regex}"` : "",
    included,
    eligibleCount: eligible.length,
  };
}

export function generateDivinationPriceRegex(
  cards: DivinationCardRegex[],
  minValue: number | undefined,
  maxValue: number | undefined,
): string {
  return selectDivinationPriceRegex(cards, minValue, maxValue).regex;
}
