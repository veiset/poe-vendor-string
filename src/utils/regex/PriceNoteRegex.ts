export interface PriceNoteOptions {
  currency: string;
  min: string;
  max: string;
  optimize: boolean;
}

const PRICE_AMOUNT_RE = /^\d+$/;
const CURRENCY_RE = /^[A-Za-z]+$/;
const PARTIAL_CURRENCY_RE = /^[A-Za-z]*$/;

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
    return noteRegex(minOnlyPriceRegex(minPrice), currency);
  }

  const rawMax = Number.parseInt(maxRaw, 10);
  if (rawMin > rawMax) return "";

  const maxPrice = optimizedMax(rawMax, options.optimize);
  return noteRegex(priceRangeRegex(minPrice, maxPrice), currency);
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

  return Number.parseInt(max, 10) <= 9999;
}

export function isValidPriceNoteMin(raw: string): boolean {
  const min = raw.trim();
  if (min.length === 0) return true;
  if (!PRICE_AMOUNT_RE.test(min)) return false;

  return Number.parseInt(min, 10) <= 9999;
}

function priceRangeRegex(min: number, max: number): string {
  if (min < 0 || max < 0 || min > max) return "";
  if (min === 0) return maxOnlyPriceRegex(max);

  const minLength = String(min).length;
  const maxLength = String(max).length;

  const parts: string[] = [];
  // Combine complete lengths in a row into a single [1-9]\d?\d?... branch.
  let fullRangeStartLength: number | undefined;
  const addFullRangePart = (endLength: number) => {
    if (fullRangeStartLength === undefined) return;
    parts.push(fullLengthRegex(fullRangeStartLength, endLength));
    fullRangeStartLength = undefined;
  };

  for (let length = minLength; length <= maxLength; length++) {
    const rangeMin = length === minLength ? min : Math.pow(10, length - 1);
    const rangeMax = length === maxLength ? max : Math.pow(10, length) - 1;
    const fullMin = length === 1 ? 1 : Math.pow(10, length - 1);
    const fullMax = Math.pow(10, length) - 1;

    if (rangeMin === fullMin && rangeMax === fullMax) {
      fullRangeStartLength ??= length;
      continue;
    }

    addFullRangePart(length - 1);
    parts.push(rangeRegexAtLength(length, rangeMin, rangeMax));
  }

  addFullRangePart(maxLength);

  return parts.join("|");
}

function fullLengthRegex(fromLength: number, toLength: number): string {
  const fixedDigits = Math.max(0, fromLength - 1);
  const optionalDigits = Math.max(0, toLength - fromLength);
  return String.raw`[1-9]` + dotN(fixedDigits) + String.raw`\d?`.repeat(optionalDigits);
}

function minOnlyPriceRegex(min: number): string {
  if (min <= 0) return atLeastDigitsRegex(1);

  const length = String(min).length;
  const sameLengthMax = Math.pow(10, length) - 1;
  const sameLengthPart = rangeRegexAtLength(length, min, sameLengthMax);
  const longerLengthPart = atLeastDigitsRegex(length + 1);

  return `${sameLengthPart}|${longerLengthPart}`;
}

// Any digit sequence with at least `minLength` digits.
function atLeastDigitsRegex(minLength: number): string {
  return dotN(minLength) + String.raw`\d*`;
}

// Matches every `length`-digit number in [min, max]. Uses the shared prefix
// first, then a character class when possible.
function rangeRegexAtLength(length: number, min: number, max: number): string {
  if (min > max) return "";
  if (min === max) return priceText(min, length);

  const lengthMin = length === 1 ? 0 : Math.pow(10, length - 1);
  const lengthMax = Math.pow(10, length) - 1;
  // Every number at this length, with a leading digit from 1 to 9.
  if (length >= 2 && min === lengthMin && max === lengthMax) {
    return String.raw`[1-9]` + String.raw`\d`.repeat(length - 1);
  }

  const minText = priceText(min, length);
  const maxText = priceText(max, length);

  let prefixLength = 0;
  while (prefixLength < length && minText[prefixLength] === maxText[prefixLength]) {
    prefixLength++;
  }

  const prefix = minText.slice(0, prefixLength);
  const remainingLength = length - prefixLength;
  const minDigit = parseInt(minText[prefixLength], 10);
  const maxDigit = parseInt(maxText[prefixLength], 10);
  const restLength = remainingLength - 1;
  const minRest = remainingLength > 1 ? parseInt(minText.slice(prefixLength + 1), 10) : 0;
  const maxRest = remainingLength > 1 ? parseInt(maxText.slice(prefixLength + 1), 10) : 0;
  const fullRestMax = Math.pow(10, restLength) - 1;

  // Both rest min/max include every value, so one character class is enough.
  if (minRest === 0 && maxRest === fullRestMax) {
    if (maxDigit === minDigit) return prefix + minDigit + dotN(restLength);
    if (minDigit === 0 && maxDigit === 9) return prefix + dotN(remainingLength);
    return prefix + `[${minDigit}-${maxDigit}]` + dotN(restLength);
  }

  const parts: string[] = [];
  const betweenSpan = maxDigit - minDigit - 1;
  const hasBetweenPart = betweenSpan > 0;
  // If an edge includes a full rest range, include its digit in the shared class.
  const includeMinInBetweenPart = minRest === 0 && hasBetweenPart;
  const includeMaxInBetweenPart = maxRest === fullRestMax && hasBetweenPart;

  if (!includeMinInBetweenPart) {
    if (minRest === 0) {
      parts.push(prefix + minDigit + dotN(restLength));
    } else {
      parts.push(prefix + minDigit + groupBranch(minRestRegex(restLength, minRest)));
    }
  }

  if (hasBetweenPart) {
    const betweenStart = includeMinInBetweenPart ? minDigit : minDigit + 1;
    const betweenEnd = includeMaxInBetweenPart ? maxDigit : maxDigit - 1;
    if (betweenEnd === betweenStart) {
      parts.push(prefix + betweenStart + dotN(restLength));
    } else {
      parts.push(prefix + `[${betweenStart}-${betweenEnd}]` + dotN(restLength));
    }
  }

  if (!includeMaxInBetweenPart) {
    if (maxRest === fullRestMax) {
      parts.push(prefix + maxDigit + dotN(restLength));
    } else {
      parts.push(prefix + maxDigit + groupBranch(maxRestRegex(restLength, maxRest)));
    }
  }

  return parts.join("|");
}

function dotN(n: number): string {
  return String.raw`\d`.repeat(n);
}

function priceText(price: number, length: number): string {
  const text = String(price);
  return "0".repeat(Math.max(0, length - text.length)) + text;
}

// Group the branch regex so a prefix applies to every branch:
// `prefix + (a|b|c)`. Without grouping: `(prefix + a) | b | c`.
function groupBranch(s: string): string {
  return s.includes("|") ? `(${s})` : s;
}

function minRestRegex(length: number, min: number): string {
  if (length === 0) return "";
  if (length === 1) {
    if (min === 9) return "9";
    return `[${min}-9]`;
  }
  return rangeRegexAtLength(length, min, Math.pow(10, length) - 1);
}

function maxRestRegex(length: number, max: number): string {
  if (length === 0) return "";
  if (length === 1) {
    if (max === 0) return "0";
    return `[0-${max}]`;
  }
  return rangeRegexAtLength(length, 0, max);
}

function maxOnlyPriceRegex(max: number): string {
  if (max === 0) return "0";
  if (max === 9) return String.raw`\d`;
  if (max <= 9) return `[0-${max}]`;
  if (max === 99) return String.raw`\d\d?`;
  if (max === 999) return String.raw`\d\d?\d?`;
  if (max === 9999) return String.raw`\d\d?\d?\d?`;
  if (max === 100) return String.raw`\d\d?|100`;

  if (max <= 99) {
    return twoDigitMaxRegex(max);
  }

  if (max <= 999) {
    return threeDigitMaxRegex(max);
  }

  return fourDigitMaxRegex(max);
}

function twoDigitMaxRegex(max: number): string {
  const t = Math.floor(max / 10);
  const u = max % 10;
  const parts: string[] = [String.raw`\d`];

  if (t > 1) {
    if (t - 1 === 1) {
      parts.push(String.raw`1\d`);
    } else {
      parts.push(`[1-${t - 1}]` + String.raw`\d`);
    }
  }

  if (u === 9) {
    parts.push(`${t}` + String.raw`\d`);
  } else if (u === 0) {
    parts.push(`${t}0`);
  } else {
    parts.push(`${t}[0-${u}]`);
  }

  return parts.join("|");
}

function threeDigitMaxRegex(max: number): string {
  const h = Math.floor(max / 100);
  const t = Math.floor((max % 100) / 10);
  const u = max % 10;
  const parts: string[] = [String.raw`\d\d?`];

  if (h > 1) {
    if (h - 1 === 1) {
      parts.push(String.raw`1\d\d`);
    } else {
      parts.push(`[1-${h - 1}]` + String.raw`\d\d`);
    }
  }

  // X99 form: use a single \d\d for the last two digits.
  if (t === 9 && u === 9) {
    parts.push(`${h}` + String.raw`\d\d`);
    return parts.join("|");
  }

  if (t > 0) {
    if (t - 1 === 0) {
      parts.push(`${h}0` + String.raw`\d`);
    } else {
      parts.push(`${h}[0-${t - 1}]` + String.raw`\d`);
    }
  }

  if (u === 9) {
    parts.push(`${h}${t}` + String.raw`\d`);
  } else if (u === 0) {
    parts.push(`${h}${t}0`);
  } else {
    parts.push(`${h}${t}[0-${u}]`);
  }

  return parts.join("|");
}

function fourDigitMaxRegex(max: number): string {
  const th = Math.floor(max / 1000);
  const h = Math.floor((max % 1000) / 100);
  const t = Math.floor((max % 100) / 10);
  const u = max % 10;
  const parts: string[] = [String.raw`\d\d?\d?`];

  if (th > 1) {
    if (th - 1 === 1) {
      parts.push(String.raw`1\d\d\d`);
    } else {
      parts.push(`[1-${th - 1}]` + String.raw`\d\d\d`);
    }
  }

  // X999 form: use a single \d\d\d for the last three digits.
  if (h === 9 && t === 9 && u === 9) {
    parts.push(`${th}` + String.raw`\d\d\d`);
    return parts.join("|");
  }

  if (h > 0) {
    if (h - 1 === 0) {
      parts.push(`${th}0` + String.raw`\d\d`);
    } else {
      parts.push(`${th}[0-${h - 1}]` + String.raw`\d\d`);
    }
  }

  if (t > 0) {
    if (t - 1 === 0) {
      parts.push(`${th}${h}0` + String.raw`\d`);
    } else {
      parts.push(`${th}${h}[0-${t - 1}]` + String.raw`\d`);
    }
  }

  if (u === 9) {
    parts.push(`${th}${h}${t}` + String.raw`\d`);
  } else if (u === 0) {
    parts.push(`${th}${h}${t}0`);
  } else {
    parts.push(`${th}${h}${t}[0-${u}]`);
  }

  return parts.join("|");
}
