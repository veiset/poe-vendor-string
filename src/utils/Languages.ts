import {regexMapModsCHINESE} from "../generated/mapmods/Generated.MapModsV3.CHINESE";
import {regexMapModsENGLISH} from "../generated/mapmods/Generated.MapModsV3.ENGLISH";
import {Regex} from "../generated/GeneratedTypes";
import {MapModsTokenOption} from "../generated/mapmods/GeneratedTypes";
import {regexMapModsFRENCH} from "../generated/mapmods/Generated.MapModsV3.FRENCH";
import {regexMapModsGERMAN} from "../generated/mapmods/Generated.MapModsV3.GERMAN";
import {regexMapModsJAPANESE} from "../generated/mapmods/Generated.MapModsV3.JAPANESE";
import {regexMapModsKOREAN} from "../generated/mapmods/Generated.MapModsV3.KOREAN";
import {regexMapModsPORTUGUESE} from "../generated/mapmods/Generated.MapModsV3.PORTUGUESE";
import {regexMapModsRUSSIAN} from "../generated/mapmods/Generated.MapModsV3.RUSSIAN";
import {regexMapModsSPANISH} from "../generated/mapmods/Generated.MapModsV3.SPANISH";
import {regexMapModsTHAI} from "../generated/mapmods/Generated.MapModsV3.THAI";

export type RepoeLanguageData = {
  readonly urlKey: string;
  readonly short: string;
  readonly name: string;
  readonly flag: string;
};

export const RepoeLanguage = {
  ENGLISH: {urlKey: "", short: "en", name: "English", flag: "🇺🇸"},
  FRENCH: {urlKey: "French", short: "fr", name: "French", flag: "🇫🇷"},
  GERMAN: {urlKey: "German", short: "de", name: "German", flag: "🇩🇪"},
  JAPANESE: {urlKey: "Japanese", short: "ja", name: "Japanese", flag: "🇯🇵"},
  KOREAN: {urlKey: "Korean", short: "ko", name: "Korean", flag: "🇰🇷"},
  PORTUGUESE: {urlKey: "Portuguese", short: "pt", name: "Portuguese", flag: "🇵🇹"},
  RUSSIAN: {urlKey: "Russian", short: "ru", name: "Russian", flag: "🇷🇺"},
  SPANISH: {urlKey: "Spanish", short: "es", name: "Spanish", flag: "🇪🇸"},
  THAI: {urlKey: "Thai", short: "th", name: "Thai", flag: "🇹🇭"},
  CHINESE: {urlKey: "Traditional%20Chinese", short: "zh", name: "Chinese", flag: "🇨🇳"},
} as const;

export const LanguageFiles: {
  mapmods: Record<RepoeLanguageKey, Regex<MapModsTokenOption>>
} = {
  mapmods: {
    ENGLISH:    regexMapModsENGLISH,
    FRENCH:     regexMapModsFRENCH,
    GERMAN:     regexMapModsGERMAN,
    JAPANESE:   regexMapModsJAPANESE,
    KOREAN:     regexMapModsKOREAN,
    PORTUGUESE: regexMapModsPORTUGUESE,
    RUSSIAN:    regexMapModsRUSSIAN,
    SPANISH:    regexMapModsSPANISH,
    THAI:       regexMapModsTHAI,
    CHINESE:    regexMapModsCHINESE,
  }
};

export type RepoeLanguageKey = keyof typeof RepoeLanguage;