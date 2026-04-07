# emanuel-dev

Personal website built with React and Vite.

The project is a static SPA with:
- a retro terminal / arcade visual style
- local content for blog posts and games
- a small content service layer
- a dedicated feature module for browser games
- `react-i18next` for EN/PT UI translations
- Vitest for unit tests

## Overview

This site no longer depends on an external API for its core content.

Content is stored inside the repository:
- blog post metadata lives in JavaScript modules
- blog post bodies live in Markdown files
- game metadata lives in the games feature
- the actual standalone HTML/JS game files live in `public/games`

At runtime, pages consume normalized content objects through a small service layer instead of importing raw arrays directly.

## Tech Stack

- React 17
- Vite
- React Router v5
- Sass
- React Bootstrap
- `react-markdown`
- `react-i18next`
- Vitest

## Running The Project

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run start
```

Vite will start the app locally, typically at:

```text
http://localhost:3000
```

Create a production build:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Deployment

The site deploys to GitHub Pages with GitHub Actions.

The workflow lives in:

- [.github/workflows/deploy-pages.yml](./.github/workflows/deploy-pages.yml)

It runs on pushes to `main` and can also be started manually from the Actions tab.

The workflow:
- installs dependencies with `npm ci`
- runs the Vitest suite with `npm test`
- builds the Vite app with the correct GitHub Pages base path
- uploads the `dist/` folder as a Pages artifact
- deploys the artifact to the `github-pages` environment

After pushing the repository to GitHub, open the repository settings:

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

## Tests

Run the unit test suite:

```powershell
npm run test
```

Run Vitest in watch mode:

```powershell
npm run test:watch
```

Open the existing Cypress runner:

```powershell
npm run test:e2e
```

Notes:
- the active unit test setup is `Vitest`
- the Cypress setup is older and currently contains stale legacy specs from an earlier version of the project
- if E2E coverage is expanded later, Playwright would be a better fresh choice than investing further in the current Cypress setup

## Folder Structure

High-level structure:

```text
.
|-- public/
|   `-- games/
|       `-- power-connect-puzzle/
|-- src/
|   |-- Components/
|   |-- Helpers/
|   |-- Images/
|   |-- Languages/
|   |-- Layouts/
|   |-- Templates/
|   |-- content/
|   |   |-- posts/
|   |   |-- games/
|   |   |-- articles.js
|   |   |-- games.js
|   |   `-- collectionUtils.js
|   |-- features/
|   |   `-- games/
|   |-- pages/
|   |-- services/
|   |   `-- content/
|   |-- App.js
|   |-- i18n.js
|   |-- index.css
|   `-- main.js
|-- cypress/
|-- index.html
|-- package.json
`-- vite.config.js
```

What the main folders do:

- `public/`
  - static assets served directly by Vite
  - standalone browser games live here
- `src/Components/`
  - reusable UI blocks such as header, navbar, footer, about, folio
- `src/pages/`
  - route-level pages outside dedicated feature modules
- `src/features/`
  - feature-owned modules with their own data, routes, and pages
  - currently used by the games area
- `src/content/`
  - local content collections and content utilities
  - blog post metadata and Markdown files live here
- `src/services/content/`
  - thin service layer that exposes normalized getters to the UI
- `src/Languages/`
  - translation JSON files for `react-i18next`
- `src/Templates/`
  - page templates such as article rendering

## Architecture

### 1. App shell and routing

The entrypoint is:

- [main.js](./src/main.js)

This bootstraps:
- global CSS
- the i18n runtime
- the React app

Routing lives in:

- [App.js](./src/App.js)

The app uses:
- `BrowserRouter`
- a default layout wrapper
- route-level pages for home, blog, games, legal/privacy, article detail, and 404

### 2. Layout model

The default layout is:

- [defaultLayout.js](./src/Layouts/DefaultLayout/defaultLayout.js)

It provides the persistent chrome:
- top navbar
- page content
- footer

### 3. Content model

The site content is intentionally local-first.

#### Blog posts

Blog posts are split into:
- metadata in [src/content/posts/index.js](./src/content/posts/index.js)
- Markdown bodies in `src/content/posts/*.md`

The collection is normalized by:

- [collectionUtils.js](./src/content/collectionUtils.js)

That utility is responsible for:
- required field validation
- duplicate `id` / `slug` protection
- filtering unpublished entries
- sorting collections

#### Games

Games are owned by the games feature:

- [src/features/games/data.js](./src/features/games/data.js)
- [src/features/games/constants.js](./src/features/games/constants.js)

This keeps:
- game metadata
- route helpers
- launch paths

The actual standalone browser game files are kept under:

- `public/games/<slug>/`

For the current game:
- `public/games/power-connect-puzzle/index.html`
- `public/games/power-connect-puzzle/style.css`
- `public/games/power-connect-puzzle/game.js`

### 4. Service layer

UI components do not need to know where content comes from.

Instead they consume getters from:

- [src/services/content/index.js](./src/services/content/index.js)

Current getters:
- `listPosts()`
- `readPostBySlug(slug)`
- `listGames()`
- `readGameBySlug(slug)`

This matters because it makes a future API migration easier:
- today the source is local files
- later the source could be an API
- the UI can keep using the same retrieval interface

### 5. Feature structure

The games area has been separated into a dedicated feature module:

- [src/features/games/index.js](./src/features/games/index.js)
- [src/features/games/GamesPage.js](./src/features/games/GamesPage.js)
- [src/features/games/GameDetailPage.js](./src/features/games/GameDetailPage.js)

This gives the games area ownership over:
- its pages
- its data
- its route constants
- its launch paths

### 6. Translations

UI translations use `react-i18next`.

Configuration:

- [src/i18n.js](./src/i18n.js)

Language files:
- [src/Languages/en.json](./src/Languages/en.json)
- [src/Languages/pt.json](./src/Languages/pt.json)

Behavior:
- UI labels are read with `t("...")`
- language is persisted in `localStorage`
- English is the fallback language

### 7. Styling

Global design tokens live in:

- [src/index.css](./src/index.css)

This file defines shared:
- fonts
- accent colors
- backgrounds
- glows
- border strengths
- radii

Component and page SCSS files consume those tokens to keep the visual style consistent.

## How Blog Posts Work

Each post has:
- metadata in `src/content/posts/index.js`
- a Markdown body in `src/content/posts/`

Example metadata fields:
- `id`
- `slug`
- `title`
- `subtitle`
- `createdAt`
- `heroImage`
- `contentFile`
- `author`
- `published`

The article page:
- resolves the post by `slug`
- fetches the Markdown file URL
- renders the Markdown with `react-markdown`

## How To Add A New Post

### Step 1. Create the Markdown file

Add a new file inside:

- `src/content/posts/`

Example:

```text
src/content/posts/my-new-post.md
```

### Step 2. Write the article body in Markdown

Example:

```md
## My New Post

This is the body of the post.

- First point
- Second point

[Example link](https://example.com)
```

### Step 3. Add a hero image

Place the image in:

- `src/Images/`

### Step 4. Register the post metadata

Open:

- [src/content/posts/index.js](./src/content/posts/index.js)

At the top:
- import the hero image
- import the Markdown file using `?url`

Example:

```js
import myHeroImage from "../../Images/my-hero-image.svg";
import myNewPostContent from "./my-new-post.md?url";
```

Then add a new entry to `postEntries`:

```js
{
  id: "article-my-new-post",
  slug: "my-new-post",
  title: "My New Post",
  subtitle: "Short description shown in the blog list.",
  createdAt: "2026-04-06",
  heroImage: myHeroImage,
  contentFile: myNewPostContent,
  author: "emanuel-dev",
  published: true,
}
```

### Step 5. Start the app and verify

```powershell
npm run start
```

The post URL will be:

```text
/blog/my-new-post
```

## How Games Work

The games section uses two layers:

1. feature metadata in:
   - [src/features/games/data.js](./src/features/games/data.js)
2. standalone game files in:
   - `public/games/<slug>/`

The React app is responsible for:
- listing games
- showing game metadata
- embedding the standalone game in an `iframe`

The standalone game is responsible for:
- its own HTML
- its own CSS
- its own JavaScript gameplay

## How To Add A New Game

### Step 1. Create the static game folder

Add a new folder under:

- `public/games/`

Example:

```text
public/games/my-game/
```

Add the game files there, typically:

```text
public/games/my-game/index.html
public/games/my-game/style.css
public/games/my-game/game.js
```

### Step 2. Register the game metadata

Open:

- [src/features/games/data.js](./src/features/games/data.js)

Add a new entry to `gameEntries`:

```js
{
  id: "game-my-game",
  slug: "my-game",
  title: "My Game",
  description: "Short description of the game.",
  author: "Emanuel Faisca",
  publishedAt: "2026-04-06",
  launchPath: getGameLaunchPath("my-game"),
  status: "playable",
  statusLabel: "Playable now",
  published: true,
}
```

### Step 3. Verify the routes

The list page remains:

```text
/games
```

The game detail page becomes:

```text
/games/my-game
```

The standalone HTML game file is served from:

```text
/games/my-game/index.html
```

## Important Conventions

- slugs must be unique
- ids must be unique
- `published: false` hides an entry from the public collection
- post Markdown files are imported as URLs with `?url`
- game launch files under `public/games` must keep a stable folder structure
- pages should consume content through the service layer when possible

## Testing Strategy

Current recommended split:

- `Vitest` for unit tests around logic and content
- a very small E2E suite for smoke flows only

Good unit test targets:
- collection validation
- sorting
- slug lookup
- route helpers
- content service getters

Good E2E test targets:
- homepage renders
- navbar navigation works
- blog list opens an article
- games page opens a game
- language switching works

## Current Known Technical Notes

- the project uses React 17 and React Router v5
- the app has been migrated from CRA to Vite
- the current Cypress setup is legacy and not a good source of confidence
- some static assets are still heavy, especially icon bundles and the GIF used in the hero

## Suggested Next Improvements

- replace legacy Cypress coverage with a small Playwright smoke suite
- reduce large asset payloads
- add more unit tests for feature modules and helpers
- introduce multilingual content for blog posts if needed later

