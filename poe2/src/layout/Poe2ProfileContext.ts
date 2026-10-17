import {createContext} from "react";
import type {GGPKLanguageKey} from "@poe/utils/Languages";

export interface Poe2ProfileContextType {
  currentProfile: string;
  setCurrentProfile: (p: string) => void;
  language: GGPKLanguageKey;
  setLanguage: (language: GGPKLanguageKey) => void;
}

export const Poe2ProfileContext = createContext<Poe2ProfileContextType>({
  currentProfile: "default",
  setCurrentProfile: () => {
  },
  language: "ENGLISH",
  setLanguage: () => {},
});
