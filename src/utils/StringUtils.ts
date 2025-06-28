export function splitOnNthOccurrence(
  str: string,
  separator: string,
  n: number
): [string, string] {
  const parts = str.split(separator);

  if (n <= 0 || n > parts.length - 1) {
    return [str, ""];
  }

  const beforeNth = parts.slice(0, n).join(separator);
  const afterNth = parts.slice(n).join(separator);

  return [beforeNth, afterNth];
}

export function countChar(str: string, char: string): number {
  return str.split(char).length - 1;
}