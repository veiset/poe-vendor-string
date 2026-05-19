export function generateNumberRegex(number: string, optimize: boolean): string {
  const numbers = number.match(/\d/g);
  if (numbers === null) {
    return "";
  }
  const quant = optimize
    ? Math.floor(Number(numbers.join("")) / 10) * 10
    : Number(numbers.join(""));
  if (isNaN(quant) || quant === 0) {
    if (optimize && numbers.length === 1) {
      return ".";
    }
    return "";
  }
  if (quant >= 100) {
    return threeDigitMin(quant);
  }
  if (quant > 9) {
    const str = quant.toString();
    const d0 = str[0];
    const d1 = str[1];
    if (str[1] === "0") {
      return `([${d0}-9].|\\d..)`;
    } else if (str[0] === "9") {
      return `(${d0}[${d1}-9]|\\d..)`;
    } else {
      return `(${d0}[${d1}-9]|[${Number(d0) + 1}-9].|\\d..)`;
    }
  }
  if (quant <= 9) {
    return `([${quant}-9]|\\d..?)`;
  }
  return number;
}

/**
 * Takes a number as an input and generates a regex that matches
 * that number or a higher number (and that's less than 1000, cause size limitations)
 */
export function minNumberRegex(number: string, optimize: boolean): string {
  const numbers = number.match(/\d/g);
  if (numbers === null) {
    return "";
  }

  const n = optimize
    ? Math.floor(Number(numbers.join("")) / 10) * 10
    : Number(numbers.join(""));

  return match2(n);
}

/**
 * Regex for a 1-digit number
 */
function match1(n: number): string {
  const n1 = n % 10;
  if (n >= 9) return "";
  if (n1 === 0) return "\\d";
  return `[${n1}-9]`;
}

/**
 * Regex for a 2-digit number
 */
function match2(n: number) {
  const n2 = n % 100;
  const n1 = n % 10;
  if (n >= 99) return "\\d\\d";
  if (n2 === 0) return "\\d\\d";
  const trunc = truncateLastDigit(n2);
  const truncP1 = trunc + 1;
  const oneNumberRegex = match1(n) ? `${match1(n)}|` : ""
  if (trunc >= 2) {
    return `${oneNumberRegex}[1-${trunc}]${match1(n1)}|${truncP1}\\d`;
  } else {
    return `${oneNumberRegex}${match1(n)}|1${match1(n1)}|${truncP1}\\d`;
  }
}

/**
 * Regex for a 3-digit number
 */
function match3(n: number) {
  const n3 = n % 1000;
  const n2 = n % 100;
  const n1 = n % 10;
  if (n >= 999) return "...";
  if (n2 === 0) return "...";

  return `${match1(n)}`;
}

function truncateLastDigit(n: number): number {
  return Math.floor(n / 10);
}

function threeDigitMin(n: number): string {
  const str = n.toString();
  const d0 = str[0];
  const d1 = str[1];
  const d2 = str[2];
  const D0 = Number(d0);
  const D1 = Number(d1);
  if (d1 === "0" && d2 === "0") {
    return D0 === 9 ? `${d0}..` : `[${d0}-9]..`;
  }
  let head: string;
  if (d2 === "0") {
    head = d1 === "9" ? `${d0}9.` : `${d0}[${d1}-9].`;
  } else if (d1 === "0") {
    head = `${d0}(0[${d2}-9]|[1-9].)`;
  } else if (d1 === "9" && d2 === "9") {
    head = `${d0}99`;
  } else if (d1 === "9") {
    head = `${d0}9[${d2}-9]`;
  } else {
    head = `${d0}(${d1}[${d2}-9]|[${D1 + 1}-9].)`;
  }
  return D0 === 9 ? head : `(${head}|[${D0 + 1}-9]..)`;
}

const INTEGER_RANGE_MAX = 9999;

export function generateIntegerMinRegex(min: number): string {
  if (!Number.isInteger(min) || min > INTEGER_RANGE_MAX) return "";
  if (min <= 0) return String.raw`\d\d*`;

  const length = String(min).length;
  const sameLengthMax = Math.pow(10, length) - 1;
  const sameLengthPart = rangeRegexAtLength(length, min, sameLengthMax);
  const longerLengthPart = digitN(length + 1) + String.raw`\d*`;

  return `${sameLengthPart}|${longerLengthPart}`;
}

export function generateIntegerRangeRegex(min: number, max: number): string {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return "";
  if (min < 0 || max < 0 || min > max || max > INTEGER_RANGE_MAX) return "";
  if (min === 0) return maxDigitsRegex(max, String(max).length);

  const minLength = String(min).length;
  const maxLength = String(max).length;

  const parts: string[] = [];
  let fullRangeStartLength: number | undefined;
  const addFullRangePart = (endLength: number) => {
    if (fullRangeStartLength === undefined) return;
    parts.push(String.raw`[1-9]` + digitN(fullRangeStartLength - 1) + String.raw`\d?`.repeat(endLength - fullRangeStartLength));
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

function rangeRegexAtLength(length: number, min: number, max: number): string {
  if (min > max) return "";
  if (min === max) return integerText(min, length);

  const lengthMin = length === 1 ? 0 : Math.pow(10, length - 1);
  const lengthMax = Math.pow(10, length) - 1;
  if (length >= 2 && min === lengthMin && max === lengthMax) {
    return String.raw`[1-9]` + String.raw`\d`.repeat(length - 1);
  }

  const minText = integerText(min, length);
  const maxText = integerText(max, length);

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

  if (minRest === 0 && maxRest === fullRestMax) {
    if (maxDigit === minDigit) return prefix + minDigit + digitN(restLength);
    if (minDigit === 0 && maxDigit === 9) return prefix + digitN(remainingLength);
    return prefix + `[${minDigit}-${maxDigit}]` + digitN(restLength);
  }

  const parts: string[] = [];
  const betweenSpan = maxDigit - minDigit - 1;
  const hasBetweenPart = betweenSpan > 0;
  const includeMinInBetweenPart = minRest === 0 && hasBetweenPart;
  const includeMaxInBetweenPart = maxRest === fullRestMax && hasBetweenPart;

  if (!includeMinInBetweenPart) {
    if (minRest === 0) {
      parts.push(prefix + minDigit + digitN(restLength));
    } else {
      parts.push(prefix + minDigit + groupBranch(rangeRegexAtLength(restLength, minRest, fullRestMax)));
    }
  }

  if (hasBetweenPart) {
    const betweenStart = includeMinInBetweenPart ? minDigit : minDigit + 1;
    const betweenEnd = includeMaxInBetweenPart ? maxDigit : maxDigit - 1;
    if (betweenEnd === betweenStart) {
      parts.push(prefix + betweenStart + digitN(restLength));
    } else {
      parts.push(prefix + `[${betweenStart}-${betweenEnd}]` + digitN(restLength));
    }
  }

  if (!includeMaxInBetweenPart) {
    if (maxRest === fullRestMax) {
      parts.push(prefix + maxDigit + digitN(restLength));
    } else {
      parts.push(prefix + maxDigit + groupBranch(rangeRegexAtLength(restLength, 0, maxRest)));
    }
  }

  return parts.join("|");
}

function digitN(n: number): string {
  return String.raw`\d`.repeat(n);
}

function integerText(value: number, length: number): string {
  const text = String(value);
  return "0".repeat(Math.max(0, length - text.length)) + text;
}

function groupBranch(s: string): string {
  return s.includes("|") ? `(${s})` : s;
}

function maxDigitsRegex(max: number, length: number): string {
  if (max === Math.pow(10, length) - 1) {
    return String.raw`\d` + String.raw`\d?`.repeat(length - 1);
  }

  const digits = String(max).split("").map((d) => parseInt(d, 10));
  const parts: string[] = length > 1 ? [String.raw`\d` + String.raw`\d?`.repeat(length - 2)] : [];

  for (let pos = 0; pos < length; pos++) {
    const digit = digits[pos];
    const prefix = digits.slice(0, pos).join("");
    const remainingDigits = length - pos - 1;
    const isUnit = pos === length - 1;

    if (isUnit) {
      if (digit === 9) parts.push(prefix + String.raw`\d`);
      else if (digit === 0) parts.push(prefix + "0");
      else parts.push(prefix + `[0-${digit}]`);
      continue;
    }

    const lowerBound = pos === 0 ? 1 : 0;
    if (digit > lowerBound) {
      const lowerRange = digit - 1 === lowerBound ? `${lowerBound}` : `[${lowerBound}-${digit - 1}]`;
      parts.push(prefix + lowerRange + String.raw`\d`.repeat(remainingDigits));
    }

    if (digits.slice(pos + 1).every((d) => d === 9)) {
      parts.push(prefix + digit + String.raw`\d`.repeat(remainingDigits));
      return parts.join("|");
    }
  }

  return parts.join("|");
}
