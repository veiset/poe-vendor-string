import {createContext} from "react";
import {loadSettings, selectedProfile} from "../../utils/LocalStorage";
import {GGPKLanguage, GGPKLanguageKey} from "../../utils/Languages";

export const ProfileContext = createContext({
  globalProfile: selectedProfile(),
  lang: loadSettings(selectedProfile()).language,
  setLang: (lang: GGPKLanguageKey) => {
  },
  setGlobalProfile: (profile: string) => {
  }
});