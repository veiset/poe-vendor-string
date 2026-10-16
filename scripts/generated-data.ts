// Fetches poe-item-gen's generated files from R2 (https://data.poe.re) into the apps, pinned by each app's
// generated-data.lock.json: the game, patch and poe-item-gen commit, and the sha256 of every file.
//
//   pnpm generated-data              fetch the pinned files; files that already match are kept
//   pnpm generated-data --check      only compare the local files with the lock, and exit 1 if they differ
//   pnpm generated-data pin          pin each game's latest upload (history.json `current`), then fetch it
//
// Options: --app=poe|poe2 (default both), --out=<dir> (write the apps under another folder).
// The files go where poe-item-gen's copyGeneratedFiles puts them: `.ts` in <app>/src/types/generated,
// `.min.json` in <app>/public/generated, and the other `.json` in <app>/generated.
//
// R2 keeps one folder per patch, generated/<game>/<patch>/, and a newer poe-item-gen commit for the same patch
// replaces its files. A pinned file that R2 no longer has fails the fetch rather than shipping other data.
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATA_URL = process.env.GENERATED_DATA_URL ?? 'https://data.poe.re';
const APPS = {poe: 'poe1', poe2: 'poe2'} as const;
type App = keyof typeof APPS;

interface Lock {
  game: string;
  patch: string;
  commit: string;
  files: Record<string, string>;
}

interface Upload {
  game: string;
  patch: string;
  commit: string;
  time: string;
}

const args = process.argv.slice(2);
const option = (name: string) => args.find(a => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const command = args.find(a => !a.startsWith('--')) ?? 'fetch';
const check = args.includes('--check');
const out = path.resolve(option('out') ?? ROOT);
const apps = (option('app')?.split(',') ?? Object.keys(APPS)) as App[];

const sha256 = (bytes: Buffer) => crypto.createHash('sha256').update(bytes).digest('hex');
const lockFile = (app: App) => path.join(ROOT, app, 'generated-data.lock.json');
const folderUrl = (lock: Lock) => `${DATA_URL}/generated/${lock.game}/${lock.patch}/`;

function destination(app: App, file: string): string {
  if (file.endsWith('.ts')) return path.join(out, app, 'src/types/generated', file);
  if (file.endsWith('.min.json')) return path.join(out, app, 'public/generated', file);
  if (file.endsWith('.json')) return path.join(out, app, 'generated', file);
  throw new Error(`Unsupported generated file: ${file}`);
}

// A Windows checkout with core.autocrlf has CRLF line endings, but the generator writes LF.
function matches(file: string, hash: string): boolean {
  if (!fs.existsSync(file)) return false;
  const bytes = fs.readFileSync(file);
  return sha256(bytes) === hash || sha256(Buffer.from(bytes.toString('utf8').replace(/\r\n/g, '\n'))) === hash;
}

async function download(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function inBatches<T>(items: T[], size: number, run: (item: T) => Promise<void>) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(run));
  }
}

function parseSums(text: string): Record<string, string> {
  return Object.fromEntries(text.split('\n').filter(line => line.trim()).map(line => {
    const [hash, file] = line.split(/\s+\*?/);
    return [file, hash];
  }));
}

async function pin(app: App): Promise<void> {
  const history = JSON.parse((await download(`${DATA_URL}/history.json`)).toString('utf8'));
  const upload: Upload = history.current[APPS[app]];
  const lock: Lock = {game: upload.game, patch: upload.patch, commit: upload.commit, files: {}};
  lock.files = parseSums((await download(`${folderUrl(lock)}SHA256SUMS`)).toString('utf8'));
  fs.writeFileSync(lockFile(app), JSON.stringify(lock, null, 2) + '\n');
  console.log(`${app}: pinned ${lock.game} ${lock.patch} (commit ${lock.commit}), ${Object.keys(lock.files).length} files`);
}

async function fetchPinned(app: App): Promise<boolean> {
  const lock: Lock = JSON.parse(fs.readFileSync(lockFile(app), 'utf8'));
  const stale = Object.entries(lock.files).filter(([file, hash]) => !matches(destination(app, file), hash));
  const name = `${app} (${lock.game} ${lock.patch}, commit ${lock.commit})`;
  if (check) {
    stale.forEach(([file]) => console.log(`  differs: ${path.relative(out, destination(app, file))}`));
    console.log(`${name}: ${stale.length} of ${Object.keys(lock.files).length} files differ from the lock`);
    return stale.length === 0;
  }

  const moved: string[] = [];
  await inBatches(stale, 8, async ([file, hash]) => {
    const bytes = await download(folderUrl(lock) + file);
    if (sha256(bytes) !== hash) {
      moved.push(file);
      return;
    }
    fs.mkdirSync(path.dirname(destination(app, file)), {recursive: true});
    fs.writeFileSync(destination(app, file), bytes);
  });
  if (moved.length > 0) {
    throw new Error(`${name}: R2 no longer has the pinned version of ${moved.length} file(s), e.g. ${moved.slice(0, 3).join(', ')}.\n` +
      `A newer poe-item-gen upload replaced them. Pin it with "pnpm generated-data pin --app=${app}".`);
  }
  console.log(`${name}: ${stale.length} downloaded, ${Object.keys(lock.files).length - stale.length} already up to date`);
  return true;
}

async function main() {
  if (command === 'pin') {
    for (const app of apps) await pin(app);
  } else if (command !== 'fetch') {
    throw new Error(`Unknown command: ${command}. Supported: fetch (default), pin`);
  }
  let ok = true;
  for (const app of apps) ok = await fetchPinned(app) && ok;
  if (!ok) process.exit(1);
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
