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
4. Add a test to `migrations.test.ts` and a section below.

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
