# Profile migrations

Saved poe2.re profiles (`poe2.profiles` in localStorage) are brought up to date by the migrations in this folder.

## How it works

1. **Versions.** Every profile has a `version`. Profiles saved before versions existed have none and count as version 1. New profiles start on `defaultSettings.version` (`../settings.ts`).
2. **At startup.** `migrateStoredProfiles` (`migrations.ts`) runs in `../index.tsx` before the app renders, so no page reads an old profile. For each profile below `defaultSettings.version`, it runs every migration newer than the profile's version, in order, then saves the profiles.
3. **On import.** An imported profile goes through `migrateProfile` before it's saved. Exports include the version, and an export without one is version 1.
4. **On failure.** If a migration fails (e.g. the data can't be fetched), the profile keeps its version and is migrated again on the next visit. A page that loads its data before then works with the old profile.

## Adding a migration

1. Write `vNN_migration.ts` with `migrateV<N-1>ToV<N>(settings): Promise<Settings>`. It can run on profiles of any age, so keep it self-contained.
2. Add `{version: N, migrate: migrateV<N-1>ToV<N>}` to the end of the list in `migrations.ts`.
3. Bump `defaultSettings.version` to N.
4. Add its test cases in `vNN_migration.test.ts`, and a section below.
5. Verify it with real stored data, as described next.

## Verifying a migration

Make the old data on poe2.re, which runs the version before the migration, and load it into the new build. The new build is a local `pnpm dev:poe2` run (http://localhost:3000), or the PR's Cloudflare preview (linked in the "Deploying poe2-production" comment on the PR, `https://<hash>.poe2-production.pages.dev`). Each site has its own localStorage, so the data is copied over by hand.

1. **Make the old data on poe2.re.** Pick what the migration changes, e.g. waystone and tablet mods with a value, and save a favorite. To start from a clean profile, run `localStorage.clear()` in the DevTools console and reload.
2. **Copy the localStorage.** In the DevTools console on poe2.re:

   ```js
   copy(JSON.stringify(Object.fromEntries(Object.keys(localStorage).map((key) => [key, localStorage.getItem(key)]))))
   ```

3. **Load it into the new build.** Open the local run or the preview, and in its console replace `<copied>` with the copied text:

   ```js
   const saved = <copied>; localStorage.clear(); for (const [key, value] of Object.entries(saved)) localStorage.setItem(key, value); location.reload();
   ```

4. **Check.**
   - The console logs `Running poe2 profile migration <N-1> -> <N> for '<profile>'` once per old profile.
   - `JSON.parse(localStorage.getItem("poe2.profiles"))` has `version: N` and the migrated parts.
   - The pages show the same selections as on poe2.re, and their regex and the favorites list use the current data.
   - After another reload nothing is logged, as the profiles are already migrated.

This assumes poe2.re still runs the version before the migration, so it saves profiles in the format the migration starts from.

**For agents.** The same steps work headless with playwright-core, e.g. `chromium.launch({channel: "msedge", headless: true})`:
- Read the storage on poe2.re with `page.evaluate`, `page.goto` the new build, write it with `page.evaluate`, and `page.goto` again: the migration only runs when the app starts.
- Collect the migration log with `page.on("console", ...)`.
- Selectors: cards `section.filter-card` with a `.filter-card-title-text` ("I don't want any of these mods", "I want these mods"), mods `.poe2-mod-name`, ticked rows `.selected-mod`, the regex `.rrb-result-text`, saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`, and on /favorites `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).
- Hide the consent banner (`#ncmp__tool`) so it doesn't block clicks. `browsingTopics` page errors come from the ad scripts and can be ignored.
- Two dev servers on one `node_modules` share the Vite cache (`node_modules/.vite/poe2`), which breaks React ("Invalid hook call"). Run one at a time, or restart with `--force`.

## Migrations

| Version | File | Introduced | What it does |
|---|---|---|---|
| 1 → 2 | `v02_migration.ts` | 2026-10-16 (#557) | Saved waystone and tablet mods get the ids of the current data |

### 1 → 2: waystone and tablet mods by id

The pages match saved mods to the data by id and take the regex from the data. But the ids changed when the data was regenerated in #536 (2026-09-27) and again in #549 (2026-10-08), and saved mods kept their old id and regex. Mods saved between those two dates also have `#` in their name where the data now has `##`.

For the waystone wanted and unwanted mods and the tablet affixes, in the profile and in each waystone or tablet favorite:

1. Load the current data in the profile's language, or the favorite's language (English if it has none). This is skipped when there are no saved mods.
2. Match each saved mod by id; if the id isn't in the data, by name (`#` and `##` alike), or else by its old regex.
3. Give a matched mod the current id, name, regex and ranges. Its ticked state and value are kept.
4. Drop mods that are no longer in the data, and keep a mod saved twice only once, preferring the ticked copy.
