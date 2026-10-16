# poe2.re profile migrations

Saved poe2.re profiles (`poe2.profiles` in localStorage) are brought up to date by the migrations in this folder. How migrations run, how to add one and how to verify one is in the [shared README](../../../shared/migration/README.md).

## Where to look

`defaultSettings.version` is in `../settings.ts`, and profiles are loaded and saved in `../localStorage.ts`. The selectors for checking a migration on the pages:

- **/waystone, /tablet and /relic:** mods `.poe2-mod-name`, and ticked rows `.selected-mod`. On /waystone the cards are `section.filter-card` with a `.filter-card-title-text` ("I don't want any of these mods", "I want these mods").
- **Every page:** the regex `.rrb-result-text`, and saving a favorite `.rrb-favorite-button`, `.favorite-dialog input` and `.favorite-dialog-save`.
- **/favorites:** `.favorite-card-copy[aria-label='Copy <name> regex']` (stub `navigator.clipboard.writeText` to read what it copies).

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
