import {createContext} from "react";

export interface Poe2ProfileContextType {
  currentProfile: string;
  setCurrentProfile: (p: string) => void;
}

export const Poe2ProfileContext = createContext<Poe2ProfileContextType>({
  currentProfile: "default",
  setCurrentProfile: () => {
  },
});
