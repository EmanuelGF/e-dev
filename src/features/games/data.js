import { createCollection, findBySlug } from "../../content/collectionUtils";
import { getGameLaunchPath } from "./constants";

const gameEntries = [
  {
    id: "game-power-connect-puzzle",
    slug: "power-connect-puzzle",
    title: "Power Connect Puzzle",
    description:
      "A fast puzzle game built with HTML canvas where you connect power slabs, clear linked groups, and spend ability points strategically.",
    author: "emanuel-dev",
    publishedAt: "2026-04-05",
    launchPath: getGameLaunchPath("power-connect-puzzle"),
    status: "playable",
    statusLabel: "Playable now",
    published: true,
  },
];

export const gamesCollection = createCollection({
  collectionName: "games",
  entries: gameEntries,
  requiredFields: ["id", "slug", "title", "description", "author", "publishedAt", "launchPath"],
  sortBy: "publishedAt",
});

export function listGames() {
  return [...gamesCollection];
}

export function readGameBySlug(slug) {
  return findBySlug(gamesCollection, slug);
}
