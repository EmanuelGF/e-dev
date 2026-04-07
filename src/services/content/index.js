import { getAllPosts, getPostBySlug } from "../../content/posts/index.js";
import {
  listGames as listFeatureGames,
  readGameBySlug as readFeatureGameBySlug,
} from "../../features/games/data";

export function listPosts() {
  return getAllPosts();
}

export function readPostBySlug(slug) {
  return getPostBySlug(slug);
}

export function listGames() {
  return listFeatureGames();
}

export function readGameBySlug(slug) {
  return readFeatureGameBySlug(slug);
}
