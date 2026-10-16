# poe.re profile migrations

Saved poe.re profiles (`profiles` in localStorage) are brought up to date by the migrations in this folder. How migrations run, how to add one and how to verify one is in the [shared README](../../../shared/migration/README.md).

## Where to look

`defaultSettings.version` is in `../utils/SavedSettings.ts`, and profiles are loaded and saved in `../utils/LocalStorage.ts`. The selectors for checking a migration on the pages:

- **/maps:** the mod columns `.mm-mod-column` with a `.mm-mod-column-title` ("I don't want any of these mods", "I want these mods"), mods `.selectable-token-list-selectable` with their text in `.selectable-token-list-text`, and ticked mods `.selectable-token-list-selected`.
- **Every page:** the regex `.rrb-result-text`, saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`, the profile `select[name=profile]`, and `.profile-actions > .export-button` and `.profile-actions > .import-button`, which open `.export-profile-box` with a `textarea`.
- **/favorites:** `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).

## Migrations

| Version | File | Introduced | What it does |
|---|---|---|---|
| 1 → 2 | `v02_migration.ts` | 2026-08-30 (#496) | Only the version: favorites and the boat custom text are new settings with a default |

### 1 → 2: favorites

#496 added favorites to the profile and a custom text to the boat page, and bumped the version to 2 without a migration step. Both are new settings with a default, so nothing in a saved profile changes; this migration only records the version.
