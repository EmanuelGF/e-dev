import { describe, expect, it } from "vitest";
import { GAMES_BASE_ROUTE, getGameLaunchPath, getGameRoute } from "./constants";

describe("games route helpers", () => {
  it("defines a stable base route", () => {
    expect(GAMES_BASE_ROUTE).toBe("/games");
  });

  it("builds game detail routes", () => {
    expect(getGameRoute("power-connect-puzzle")).toBe("/games/power-connect-puzzle");
  });

  it("builds static launch paths", () => {
    expect(getGameLaunchPath("power-connect-puzzle")).toBe(
      "/games/power-connect-puzzle/index.html"
    );
  });
});
