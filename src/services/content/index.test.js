import { describe, expect, it } from "vitest";
import { listGames, listPosts, readGameBySlug, readPostBySlug } from "./index";

describe("content service", () => {
  it("lists posts newest first", () => {
    const posts = listPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.map((post) => post.slug)).toEqual([
      "stride3d-tutorials",
      "best-game-engine-for-csharp-programmers",
      "2026-approach-to-development",
    ]);
  });

  it("reads a post by slug", () => {
    const post = readPostBySlug("best-game-engine-for-csharp-programmers");

    expect(post).not.toBeNull();
    expect(post.title).toBe("Best Game Engine for C# Programmers");
    expect(post.author).toBe("emanuel-dev");
  });

  it("returns null for an unknown post slug", () => {
    expect(readPostBySlug("missing-post")).toBeNull();
  });

  it("lists games from the feature collection", () => {
    const games = listGames();

    expect(games).toHaveLength(1);
    expect(games[0].slug).toBe("power-connect-puzzle");
    expect(games[0].launchPath).toBe("/games/power-connect-puzzle/index.html");
  });

  it("reads a game by slug", () => {
    const game = readGameBySlug("power-connect-puzzle");

    expect(game).not.toBeNull();
    expect(game.title).toBe("Power Connect Puzzle");
    expect(game.status).toBe("playable");
  });

  it("returns null for an unknown game slug", () => {
    expect(readGameBySlug("missing-game")).toBeNull();
  });
});
