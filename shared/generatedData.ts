const defaultDataUrl = "https://data.poe.re";

const dataBaseUrl = (import.meta.env.VITE_DATA_URL || defaultDataUrl)
  .replace(/\/$/, "");

// A request that hasn't answered by then fails, so a stalled connection shows an error instead of a spinner
const timeoutSeconds = 20;

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

/**
 * Where a game's generated files are: in R2, under <dataBaseUrl>/generated/<game>/<patch>/, from
 * poe-item-gen's commit; or the local copies, under /generated/.
 */
export type GeneratedData =
  | {source: "local", game: Game}
  | {source: "r2", game: Game, dataBaseUrl: string, patch: string, commit: string};

/** A generated file that failed to load, and when it was requested (performance.now()). */
export interface GeneratedDataError {
  file: string;
  message: string;
  requestedAt: number;
}

const listeners = new Set<(error: GeneratedDataError) => void>();

/** Calls the listener whenever a generated file fails to load, until the returned function is called. */
export function onGeneratedDataError(listener: (error: GeneratedDataError) => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {...init, signal: AbortSignal.timeout(timeoutSeconds * 1000)});
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new Error(`${url} didn't answer within ${timeoutSeconds} seconds`);
    }
    throw error;
  }
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

interface History {
  current: Partial<Record<Game, {patch: string, commit: string}>>;
}

let loaded: GeneratedData | undefined;

/**
 * Finds the game's generated files: for R2, the latest upload in history.json, which is
 * revalidated on every visit, so the next page load after an upload uses the new files.
 * GeneratedDataProvider calls it before anything else on the page runs.
 */
export async function loadGeneratedData(game: Game): Promise<GeneratedData> {
  if (dataSource === "local") {
    loaded = {source: "local", game};
    return loaded;
  }
  const history = await fetchJson<History>(`${dataBaseUrl}/history.json`, {cache: "no-cache"});
  const upload = history.current?.[game];
  if (!upload) {
    throw new Error(`${dataBaseUrl}/history.json has no upload for ${game}`);
  }
  loaded = {source: "r2", game, dataBaseUrl, patch: upload.patch, commit: upload.commit};
  return loaded;
}

function fileUrl(data: GeneratedData, file: string): string {
  if (data.source === "local") return `/generated/${file}`;
  // A new upload for the same patch replaces its files, so the commit keeps a browser from
  // reusing a file it cached from an older upload.
  return `${data.dataBaseUrl}/generated/${data.game}/${data.patch}/${file}?v=${data.commit}`;
}

/** Fetches a generated file, e.g. `mapmods/Generated.Map.ENGLISH.min.json`, and reports a failure to onGeneratedDataError. */
export async function fetchGeneratedFile<T>(file: string): Promise<T> {
  if (!loaded) {
    throw new Error(`Can't load ${file} before the generated data is found: GeneratedDataProvider finds it first`);
  }
  const url = fileUrl(loaded, file);
  const requestedAt = performance.now();
  try {
    return await fetchJson<T>(url);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    listeners.forEach((listener) => listener({file, message, requestedAt}));
    throw error;
  }
}
