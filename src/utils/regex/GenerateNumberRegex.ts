export function generateNumberRegex(number: string, optimize: boolean): string {
  const numbers = number.match(/\d/g);
  if (numbers === null) {
    return "";
  }
  const quant = optimize
    ? Math.floor((Number(numbers.join("")) / 10)) * 10
    : Number(numbers.join(""));
  if (isNaN(quant) || quant === 0) {
    if (optimize && numbers.length === 1) {
      return ".";
    }
    return "";
  }
  if (quant >= 200) {
    return `2..`;
  }
  if (quant > 100) {
    const str = quant.toString();
    const d0 = str[0];
    const d1 = str[1];
    const d2 = str[2];
    if (str[1] === "0" && str[2] === "0") {
      return `${d0}..`;
    } else if (str[2] === "0") {
      return `1[${d1}-9].`;
    } else if (str[1] === "0") {
      return `(\\d0[${d2}-9]|\\d[1-9].)`;
    } else if (str[1] === "9" && str[2] === "9") {
      return `199`;
    } else {
      if (d1 === "9") {
        return `19[${d2}-9]`;
      }
      return `1([${d1}-9][${d2}-9]|[${Number(d1) + 1}-9].)`;
    }
  }
  if (quant === 100) {
    return `(\\d{3})`;
  }
  if (quant > 9) {
    const str = quant.toString();
    const d0 = str[0];
    const d1 = str[1];
    if (str[1] === "0") {
      return `([${d0}-9].|1..)`;
    } else if (str[0] === "9") {
      return `(${d0}[${d1}-9]|1..)`;
    } else {
      return `(${d0}[${d1}-9]|[${Number(d0) + 1}-9].|1..)`;
    }
  }
  if (quant <= 9) {
    return `([${quant}-9]|\\d..?)`;
  }
  return number;
}