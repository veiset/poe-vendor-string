export interface WebSettings {
  sidebarOpen: boolean;
  optionsOpen: boolean;
  poe1League: string;
}

export const defaultWebSettings: WebSettings = {
  sidebarOpen: true,
  optionsOpen: true,
  poe1League: "",
};

export const WEB_SETTINGS_KEY = "webSettings";

export function loadWebSettings(): WebSettings {
  const raw = localStorage.getItem(WEB_SETTINGS_KEY);
  if (!raw) return defaultWebSettings;
  try {
    return {...defaultWebSettings, ...JSON.parse(raw)};
  } catch {
    return defaultWebSettings;
  }
}

export function saveWebSettings(settings: WebSettings): void {
  localStorage.setItem(WEB_SETTINGS_KEY, JSON.stringify(settings));
}
