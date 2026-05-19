import {generateIntegerRangeRegex, generateNumberRegex} from "./GenerateNumberRegex";

export interface PriceNoteOptions {
  currency: string;
  min: string;
  max: string;
  optimize: boolean;
}

const PRICE_AMOUNT_RE = /^\d+$/;
const CURRENCY_RE = /^[A-Za-z]+$/;
const PARTIAL_CURRENCY_RE = /^[A-Za-z]*$/;
const PRICE_AMOUNT_MAX = 999;

// Round a price bound by keeping the leading digit and filling the rest:
// fillDigit=9 rounds an upper bound up (42 -> 49, 345 -> 399).
// fillDigit=0 rounds a lower bound down (23 -> 20, 234 -> 200).
function roundToLeadingDigit(n: number, fillDigit: 0 | 9): number {
  const digits = String(n).length;
  if (digits === 1) return n;
  const magnitude = Math.pow(10, digits - 1);
  const leading = Math.floor(n / magnitude);
  return fillDigit === 9 ? leading * magnitude + (magnitude - 1) : leading * magnitude;
}

function optimizedMax(rawMax: number, optimize: boolean): number {
  return optimize ? roundToLeadingDigit(rawMax, 9) : rawMax;
}

function optimizedMin(rawMin: number, optimize: boolean): number {
  if (!optimize || rawMin === 0) return rawMin;
  return roundToLeadingDigit(rawMin, 0);
}

export function generatePriceNoteRegex(options: PriceNoteOptions): string {
  const currency = options.currency.trim();
  if (!CURRENCY_RE.test(currency)) return "";

  const minRaw = options.min.trim();
  const maxRaw = options.max.trim();
  if (minRaw.length === 0 && maxRaw.length === 0) return "";

  if (!isValidPriceNoteMin(minRaw)) return "";
  if (!isValidPriceNoteMax(maxRaw)) return "";

  const rawMin = minRaw.length === 0 ? 0 : Number.parseInt(minRaw, 10);
  const minPrice = optimizedMin(rawMin, options.optimize);

  if (maxRaw.length === 0) {
    const priceRegex = minPrice === 0
      ? generateIntegerRangeRegex(0, PRICE_AMOUNT_MAX)
      : generateNumberRegex(String(minPrice), false);
    return noteRegex(priceRegex, currency);
  }

  const rawMax = Number.parseInt(maxRaw, 10);
  if (rawMin > rawMax) return "";

  const maxPrice = optimizedMax(rawMax, options.optimize);
  return noteRegex(generateIntegerRangeRegex(minPrice, maxPrice), currency);
}

function noteRegex(priceRegex: string, currency: string): string {
  const simplified = simplifySmallRanges(priceRegex);
  const hasBranch = simplified.includes("|");
  const amount = hasBranch ? `(${simplified})` : simplified;
  return String.raw`"Note:.*? ${amount} ${currency}"`;
}

// Collapses single-digit char classes the same way OptimizedMapOutput.optimize
// does for the quantity regex: [X-X] -> X, [X-(X+1)] -> [XY].
function simplifySmallRanges(s: string): string {
  return s.replace(/\[(\d)-(\d)\]/g, (m, a, b) => {
    const span = Number(b) - Number(a);
    if (span === 0) return a;
    if (span === 1) return `[${a}${b}]`;
    return m;
  });
}

// Allows the empty string so partial typing does not lock the field.
export function isValidPriceNoteCurrencyInput(raw: string): boolean {
  return PARTIAL_CURRENCY_RE.test(raw);
}

export function isValidPriceNoteMax(raw: string): boolean {
  const max = raw.trim();
  if (max.length === 0) return true;
  if (!PRICE_AMOUNT_RE.test(max)) return false;

  return Number.parseInt(max, 10) <= PRICE_AMOUNT_MAX;
}

export function isValidPriceNoteMin(raw: string): boolean {
  const min = raw.trim();
  if (min.length === 0) return true;
  if (!PRICE_AMOUNT_RE.test(min)) return false;

  return Number.parseInt(min, 10) <= PRICE_AMOUNT_MAX;
}
