import {SelectOption} from "../settings";
import {generateBoundedValueRegex} from "@shared/core/regex/GenerateNumberRegex";

export function selectedOptionRegex(
  option: SelectOption,
  round10: boolean,
): string {
  if (option.value) {
    return `${generateBoundedValueRegex(option.value.toString(), option.ranges[0][1].toString(), round10)}.*${option.regex}`;
  } else {
    return option.regex;
  }
}
