import {createContext} from "react";
import {selectedProfile} from "../../utils/LocalStorage";

export const ProfileContext = createContext({
  globalProfile: selectedProfile(),
  setGlobalProfile: (profile: string) => {
  }
});