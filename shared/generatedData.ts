const defaultDataUrl = "https://data.poe.re";

const dataBaseUrl = (import.meta.env.VITE_DATA_URL ?? defaultDataUrl)
  .replace(/\/$/, "");

/**
 * Where the generated files are read from:
 * - "r2": poe-item-gen's latest upload to R2, which history.json names;
 * - "local": the copies in <app>/public/generated, deployed with the app.
 */
export type DataSource = "r2" | "local";

// Change to "local" to read the copies deployed with the app instead of R2.
export const dataSource = "r2" as DataSource;

/** The games poe-item-gen uploads to R2, each to generated/<game>/<patch>/. */
export type Game = "poe1" | "poe2";

/** The generated files of a game: their source, and for R2 the upload's patch and poe-item-gen commit. */
export type GeneratedData = {source: "local"} | {source: "r2", patch: string, commit: string};

/** A generated file that failed to load. */
export interface GeneratedDataError {
  file: string;
  message: string;
}

const listeners = new Set<(error: GeneratedDataError) => void>();

/** Calls the listener whenever a generated file fails to load, until the returned function is called. */
export function onGeneratedDataError(listener: (error: GeneratedDataError) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

interface Upload {
  patch: string;
  commit: string;
}

interface History {
  current: Partial<Record<Game, Upload>>;
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

/** Finds the game's generated files: for R2, the latest upload in history.json. */
export async function loadGeneratedData(game: Game): Promise<GeneratedData> {
  if (dataSource === "local") return {source: "local"};
  const upload = (await loadHistory()).current?.[game];
  if (!upload) {
    throw new Error(`${dataBaseUrl}/history.json has no upload for ${game}`);
  }
  return {source: "r2", patch: upload.patch, commit: upload.commit};
}

function fileUrl(game: Game, data: GeneratedData, file: string): string {
  if (data.source === "local") return `/generated/${file}`;
  // A new upload for the same patch replaces its files, so the commit keeps a browser from
  // reusing a file it cached from an older upload.
  return `${dataBaseUrl}/generated/${game}/${data.patch}/${file}?v=${data.commit}`;
}

/** Fetches a generated file, e.g. `mapmods/Generated.Map.ENGLISH.min.json`, and reports a failure to onGeneratedDataError. */
export async function fetchGeneratedFile<T>(game: Game, file: string): Promise<T> {
  const url = fileUrl(game, await loadGeneratedData(game), file);
  try {
    return await fetchJson<T>(url);
  } catch (error) {
    listeners.forEach((listener) => listener({file, message: error instanceof Error ? error.message : String(error)}));
    throw error;
  }
}
