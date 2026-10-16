import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {dateTextFromString} from "./ExpeditionUtils";

// Imports only ExpeditionUtils, not the expedition page, like the beast,
// scarab, tattoo and runegraft pages do.
describe("dateTextFromString", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-16T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows how long ago the economy was updated", () => {
    expect(dateTextFromString("2026-10-16T10:00:00Z"))
      .toMatch(/^Economy last updated 2 hours ago, next update at ~/);
  });

  it("says when the economy is old", () => {
    expect(dateTextFromString("2026-10-13T12:00:00Z"))
      .toBe("Old economy. Using data from 3 days ago. Prices will soon be updated.");
  });

  it("waits when the update time is not a date", () => {
    expect(dateTextFromString("not a date"))
      .toBe("Economy real time is being updated. Will be ready in 5 mins or less.");
  });
});
