const defaultDataUrl = "https://data.poe.re";

const dataBaseUrl = (import.meta.env.VITE_DATA_URL ?? defaultDataUrl)
  .replace(/\/$/, "");

/** The games poe-item-gen uploads to R2, each to generated/<game>/<patch>/. */
export type Game = "poe1" | "poe2";

interface Upload {
  patch: string;
  commit: string;
}

interface History {
  current: Partial<Record<Game, Upload>>;
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

let history: Promise<History> | undefined;

// history.json names each game's latest upload. It's revalidated on every visit, so the
// next page load after an upload uses the new files.
function loadHistory(): Promise<History> {
  if (!history) {
    history = fetchJson<History>(`${dataBaseUrl}/history.json`, {cache: "no-cache"}).catch((error) => {
      history = undefined;
      throw error;
    });
  }
  return history;
}

/** Fetches a file of the game's latest upload, e.g. `mapmods/Generated.Map.ENGLISH.min.json`. */
export async function fetchGeneratedFile<T>(game: Game, file: string): Promise<T> {
  const upload = (await loadHistory()).current?.[game];
  if (!upload) {
    throw new Error(`${dataBaseUrl}/history.json has no upload for ${game}`);
  }
  // A new upload for the same patch replaces its files, so the commit keeps a browser from
  // reusing a file it cached from an older upload.
  return fetchJson<T>(`${dataBaseUrl}/generated/${game}/${upload.patch}/${file}?v=${upload.commit}`);
}
