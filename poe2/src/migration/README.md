# poe2.re profile migrations

Saved poe2.re profiles (`poe2.profiles` in localStorage) are brought up to date by the migrations in this folder. How migrations run, how to add one and how to verify one is in the [shared README](../../../shared/migration/README.md). This one has what is particular to poe2.re, and the migrations.

## poe2.re

- **Settings.** `defaultSettings.version` is in `../settings.ts`, and profiles are loaded and saved in `../localStorage.ts`. The selected profile is `poe2.selectedProfile` in localStorage.
- **Oldest profiles.** Profiles saved before versions came in with 1 → 2 (#557) have no version and are on version 1.
- **Favorites.** Favorites are saved in the profile, so a change to saved favorites is a profile migration here, as in 1 → 2. Each favorite also has its own `schemaVersion` (1, in `../favorites.ts`), which these migrations leave alone. A favorite with any other `schemaVersion` is dropped when favorites are read.
- **Verifying.** The new build is a local `pnpm dev:poe2` run (http://localhost:3000), or the PR's Cloudflare preview (linked in the "Deploying poe2-production" comment on the PR, `https://<hash>.poe2-production.pages.dev`). The log is `Running poe2 profile migration <N-1> -> <N> for '<profile>'`.
- **Selectors for agents.** Cards `section.filter-card` with a `.filter-card-title-text` ("I don't want any of these mods", "I want these mods"), mods `.poe2-mod-name`, and ticked rows `.selected-mod`. On every page, the regex `.rrb-result-text`, and saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`. On /favorites, `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).

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
