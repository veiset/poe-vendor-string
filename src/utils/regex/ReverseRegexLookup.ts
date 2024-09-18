export const regexSearch = (value: string, s: string | undefined) => {
  if (!s) return false;
  const regexp = reverseRegexLookupSanitize(s);
  return regexp ? value.toLowerCase().match(regexp) : false;
}

const reverseRegexLookupSanitize = (regex: string): RegExp | undefined => {
  try {
    const sanitized = regex.toLowerCase()
      .split("\" ")
      .join("|")
      .replace(/\\"(?:m q|iz).*%/, "")
      .replaceAll("\"", "")
      .replaceAll("!", "")
      .trim();
    return new RegExp(`${sanitized}`);
  } catch (e) {
    return undefined;
  }
}
