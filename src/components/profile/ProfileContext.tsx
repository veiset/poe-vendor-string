import {createContext} from "react";
import {loadSettings, selectedProfile} from "../../utils/LocalStorage";
import {RepoeLanguage, RepoeLanguageKey} from "../../utils/Languages";

export const ProfileContext = createContext({
  globalProfile: selectedProfile(),
  lang: loadSettings(selectedProfile()).language,
  setLang: (lang: RepoeLanguageKey) => {
  },
  setGlobalProfile: (profile: string) => {
  }
});