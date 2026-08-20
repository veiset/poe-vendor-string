export function migrateHashRoute(): void {
  const {hash} = window.location;
  if (hash.startsWith("#/")) {
    window.history.replaceState(null, "", hash.slice(1));
  }
}
