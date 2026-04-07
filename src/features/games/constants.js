export const GAMES_BASE_ROUTE = "/games";

export function getGameRoute(slug) {
  return `${GAMES_BASE_ROUTE}/${slug}`;
}

export function getGameLaunchPath(slug) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${basePath}${GAMES_BASE_ROUTE}/${slug}/index.html`;
}
