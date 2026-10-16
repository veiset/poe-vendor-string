# poe.re profile migrations

Saved poe.re profiles (`profiles` in localStorage) are brought up to date by the migrations in this folder. How migrations run, how to add one and how to verify one is in the [shared README](../../../shared/migration/README.md). This one has what is particular to poe.re, and the migrations.

## poe.re

- **Settings.** `defaultSettings.version` is in `../utils/SavedSettings.ts`, and profiles are loaded and saved in `../utils/LocalStorage.ts`. The selected profile is `selectedProfile` in localStorage.
- **Oldest profiles.** Profiles have had a version since they came in #105, starting on version 1. The settings saved before that are version 0. 0 → 1 makes the first profile from them, so it works on the storage instead of on a profile: it isn't in the list in `migrations.ts`, and runs first in `migrateStoredProfiles`.
- **Favorites.** Favorites are saved in the profile, so a change to saved favorites is a profile migration here. Each favorite also has its own `schemaVersion` (1, in `../core/favorites/FavoriteTypes.ts`), which these migrations leave alone. A favorite with any other `schemaVersion` is dropped when favorites are read.
- **Verifying.** The new build is a local `pnpm dev` run (http://localhost:3000), or the PR's Cloudflare preview (linked in the "Deploying poe-production" comment on the PR, `https://<hash>.poe-production.pages.dev`). The log is `Running poe profile migration <N-1> -> <N> for '<profile>'`.
- **Selectors for agents.** On /maps, the mod columns `.mm-mod-column` with a `.mm-mod-column-title` ("I don't want any of these mods", "I want these mods"), mods `.selectable-token-list-selectable` with their text in `.selectable-token-list-text`, and ticked mods `.selectable-token-list-selected`. On every page, the regex `.rrb-result-text`, saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`, the profile `select[name=profile]`, and `.profile-actions > .export-button` and `.profile-actions > .import-button`, which open `.export-profile-box` with a `textarea`. On /favorites, `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).

## Migrations

| Version | File | Introduced | What it does |
|---|---|---|---|
| 0 → 1 | `v01_migration.ts` | 2023-12-22 (#105) | The settings saved before profiles become the default profile |
| 1 → 2 | `v02_migration.ts` | 2026-08-30 (#496) | Only the version: favorites and the boat custom text get their defaults when the profile is merged with `defaultSettings` |

### 0 → 1: the first profile

Before profiles, the map, vendor, flask and expedition pages saved their settings under their own keys: `mapSearch`, `vendorSearch`, `flaskSearch` and `expedition`. When there is no `profiles` key yet:

1. If none of the old keys are there, it's a first visit. The default profile is saved with the default settings, on the current version, and selected. Nothing is migrated or logged.
2. Otherwise the old settings are merged into the default settings and saved as the `default` profile, which is selected. It's on version 1, as its settings are in the format of that time, so the later migrations run for it too. Old settings that no page reads any more, like the map page's `badMods`, are kept as they were.
3. The old keys are removed.

### 1 → 2: favorites

#496 added `favorites` to the profile and `customText` to the boat settings, and bumped `defaultSettings.version` to 2, without a migration step. Both are new settings with a default, which a version 1 profile gets when `migrateProfile` merges it with `defaultSettings`. So this migration changes nothing, and only takes the profile to version 2.
