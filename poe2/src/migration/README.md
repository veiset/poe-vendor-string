# poe2.re profile migrations

Saved poe2.re profiles (`poe2.profiles` in localStorage) are brought up to date by the migrations in this folder. How migrations run, how to add one and how to verify one is in the [shared README](../../../shared/migration/README.md).

## Where to look

`defaultSettings.version` is in `../settings.ts`, and profiles are loaded and saved in `../localStorage.ts`. The selectors for checking a migration on the pages:

- **/waystone, /tablet and /relic:** mods `.poe2-mod-name`, and ticked rows `.selected-mod`. On /waystone the cards are `section.filter-card` with a `.filter-card-title-text` ("I don't want any of these mods", "I want these mods").
- **Every page:** the regex `.rrb-result-text`, and saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`.
- **/favorites:** `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).

## Migrations

| Version | File | Introduced | What changed |
|---|---|---|---|
| 1 → 2 | `v02_migration.ts` | 2026-10-16 (#557) | #557 made the waystone and tablet pages match saved mods to the data by id and take the regex from the data. The ids had changed when the data was regenerated in #536 (2026-09-27) and #549 (2026-10-08), and saved mods still had their old ids and regexes. This migration gives saved waystone and tablet mods, in profiles and in favorites, the ids of the current data, and drops the mods that are no longer in it. |
