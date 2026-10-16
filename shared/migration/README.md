# Profile migrations

poe.re and poe2.re save their profiles in localStorage, and migrations bring saved profiles up to date when what a profile saves changes. The runner is `ProfileMigrations.ts` in this folder. Each app has its own migrations in `src/migration/`: `migrations.ts` gives the runner the app's list of migrations, its defaults and its storage, and a README has the selectors for the app's pages and a table of its migrations:

| | poe.re | poe2.re |
|---|---|---|
| Migrations | [`poe/src/migration/`](../../poe/src/migration/README.md) | [`poe2/src/migration/`](../../poe2/src/migration/README.md) |
| Settings and `defaultSettings.version` | `poe/src/utils/SavedSettings.ts` | `poe2/src/settings.ts` |
| Profiles in localStorage | `profiles` | `poe2.profiles` |
| Migration log | `Running poe profile migration …` | `Running poe2 profile migration …` |
| Local run | `pnpm dev` (http://localhost:3000) | `pnpm dev:poe2` (http://localhost:3000) |
| Cloudflare preview | "Deploying poe-production" comment on the PR, `https://<hash>.poe-production.pages.dev` | "Deploying poe2-production" comment on the PR, `https://<hash>.poe2-production.pages.dev` |

## How it works

1. **Versions.** Every profile has a `version`. A profile saved without one counts as version 1 (`profileVersion`). New profiles start on `defaultSettings.version`.
2. **At startup.** The app's `migrateStoredProfiles` (from `migrations.ts`) runs in `index.tsx` before the app renders, so no page reads an old profile. For each profile below `defaultSettings.version`, it runs every migration newer than the profile's version, in order, then saves the profiles.
3. **On import.** An imported profile goes through `migrateProfile` before it's saved. Exports include the version, and an export without one is version 1.
4. **On failure.** If a migration fails (e.g. the data can't be fetched), the profile keeps its version and is migrated again on the next visit. A page that loads its data before then works with the old profile.
5. **Only migrations raise the version.** Loading, saving, importing and exporting a profile keep the version it has. A profile whose version is raised anywhere else would never get the migrations in between.

A new setting with a default needs no migration: a profile is merged with `defaultSettings` whenever it's loaded, so it gets the default. A migration is for changing what is already saved, e.g. renaming a setting or giving saved mods new ids.

Favorites are saved in the profile, so a change to saved favorites is a profile migration too. Each favorite also has its own `schemaVersion` (1), which the migrations leave alone: a favorite with any other `schemaVersion` is dropped when favorites are read.

## Adding a migration

1. Write `vNN_migration.ts` with `migrateV<N-1>ToV<N>(settings): Promise<Settings>`. It can run on profiles of any age, so keep it self-contained.
2. Add `{version: N, migrate: migrateV<N-1>ToV<N>}` to the end of the list in the app's `migrations.ts`.
3. Bump `defaultSettings.version` to N.
4. Add its test cases in `vNN_migration.test.ts`, and a row to the table in the app's README on what changed and why it needs a migration. What the migration does belongs in the code.
5. Verify it with real stored data, as described next.

## Verifying a migration

Make the old data on the live site (poe.re or poe2.re), which runs the version before the migration, and load it into the new build: a local run or the PR's Cloudflare preview (see the table above). Each site has its own localStorage, so the data is copied over by hand.

1. **Make the old data on the live site.** Pick what the migration changes, e.g. mods with a value, and save a favorite. To start from a clean profile, run `localStorage.clear()` in the DevTools console and reload.
2. **Copy the localStorage.** In the DevTools console on the live site:

   ```js
   copy(JSON.stringify(Object.fromEntries(Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)]))))
   ```

3. **Load it into the new build.** Open the local run or the preview, and in its console replace `<copied>` with the copied text:

   ```js
   const saved = <copied>; localStorage.clear(); for (const [key, value] of Object.entries(saved)) localStorage.setItem(key, value); location.reload();
   ```

4. **Check.**
   - The console logs `Running <app> profile migration <N-1> -> <N> for '<profile>'` once per old profile.
   - `JSON.parse(localStorage.getItem("<profiles key>"))` has `version: N` and the migrated parts.
   - The pages show the same selections as on the live site, and their regex and the favorites list use the current data.
   - After another reload nothing is logged, as the profiles are already migrated.

This assumes the live site still runs the version before the migration, so it saves profiles in the format the migration starts from. For a format older than that, edit the copied profile back to it before loading it, e.g. remove the settings that came later.

**For agents.** The same steps work headless with playwright-core, e.g. `chromium.launch({channel: "msedge", headless: true})`:
- Read the storage on the live site with `page.evaluate`, `page.goto` the new build, write it with `page.evaluate`, and `page.goto` again: the migration only runs when the app starts. To write the storage before the app has started once, `page.route` a path on the site to a blank page and `page.goto` that first.
- Collect the migration log with `page.on("console", ...)`.
- Load the same storage into the live site too, and compare what both store and show. Only what the migration changes should differ.
- The app's README lists the selectors for its pages.
- Hide the consent banner (`#ncmp__tool`) so it doesn't block clicks. `browsingTopics` page errors come from the ad scripts and can be ignored.
- Two dev servers on one `node_modules` share the app's Vite cache (`node_modules/.vite/poe` or `node_modules/.vite/poe2`), which breaks React ("Invalid hook call"). Run one at a time, or restart with `--force`.
