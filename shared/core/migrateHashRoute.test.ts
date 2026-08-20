import {migrateHashRoute} from "./migrateHashRoute";

describe("migrateHashRoute", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  test("converts legacy hash routes to browser routes", () => {
    window.history.replaceState(null, "", "/#/maps?league=standard");

    migrateHashRoute();

    expect(window.location.pathname).toBe("/maps");
    expect(window.location.search).toBe("?league=standard");
    expect(window.location.hash).toBe("");
  });
});
