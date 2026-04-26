export interface PriceNoteOptions {
  enabled: boolean;
  currency: string;
  max: string;
}

const INTEGER_MAX_RE = /^\d+$/;
const REGEX_METACHARS = /[.*+?()[\]{}^$|\\]/g;

function escapeRegex(s: string): string {
  return s.replaceAll(REGEX_METACHARS, String.raw`\$&`);
}

export function generatePriceNoteRegex(options: PriceNoteOptions): string {
  if (!options.enabled) return "";

  const currency = options.currency.trim();
  if (currency.length === 0) return "";

  const max = options.max.trim();
  if (!INTEGER_MAX_RE.test(max)) return "";

  const intPart = Number.parseInt(max, 10);
  if (intPart > 999) return "";

  const intRegex = boundedIntRegex(intPart);
  const needsWrap = intRegex.includes("|");
  const amount = needsWrap ? `(${intRegex})` : intRegex;
  const currencyEscaped = escapeRegex(currency);

  return String.raw`"Note:.*?\b${amount}\b.*${currencyEscaped}"`;
}

function boundedIntRegex(n: number): string {
  if (n === 0) return "0";
  if (n === 9) return String.raw`\d`;
  if (n <= 9) return `[0-${n}]`;
  if (n === 99) return String.raw`[1-9]?\d`;
  if (n === 100) return String.raw`[1-9]?\d|100`;
  if (n === 999) return String.raw`[1-9]?\d|[1-9]\d\d`;

  if (n <= 99) {
    return twoDigitBoundedRegex(n);
  }

  return threeDigitBoundedRegex(n);
}

function twoDigitBoundedRegex(n: number): string {
  const tens = Math.floor(n / 10);
  const units = n % 10;
  const parts: string[] = [String.raw`\d`];

  if (tens > 1) {
    if (tens - 1 === 1) {
      parts.push(String.raw`1\d`);
    } else {
      parts.push(`[1-${tens - 1}]` + String.raw`\d`);
    }
  }

  if (units === 9) {
    parts.push(`${tens}` + String.raw`\d`);
  } else if (units === 0) {
    parts.push(`${tens}0`);
  } else {
    parts.push(`${tens}[0-${units}]`);
  }

  return parts.join("|");
}

function threeDigitBoundedRegex(n: number): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;
  const parts: string[] = [String.raw`[1-9]?\d`];

  if (h > 1) {
    if (h - 1 === 1) {
      parts.push(String.raw`1\d\d`);
    } else {
      parts.push(`[1-${h - 1}]` + String.raw`\d\d`);
    }
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
