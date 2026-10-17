import {createContext} from "react";
import {loadSettings, selectedProfile} from "../../utils/LocalStorage";
import {GGPKLanguage} from "../../utils/Languages";
import type {Language} from "@shared/typedefs/Language";

export const ProfileContext = createContext({
  globalProfile: selectedProfile(),
  lang: loadSettings(selectedProfile()).language,
  setLang: (lang: Language) => {
  },
  setGlobalProfile: (profile: string) => {
  }
});