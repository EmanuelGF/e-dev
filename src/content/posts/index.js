import articleHeroAiDevelopment from "../../Images/article-ai-development.svg";
import articleHeroCsharpGameEngines from "../../Images/article-csharp-game-engines.svg";
import articleHeroStride3d from "../../Images/article-stride3d.svg";
import stride3dTutorialsContent from "./Stride3D-tutorials.md?url";
import bestGameEngineForCsharpProgrammersContent from "./Best-Game-Engine-for-Csharp-programmers.md?url";
import approachToDevelopmentContent from "./2026-approach-to-development.md?url";
import { createCollection, findBySlug } from "../collectionUtils";

const postEntries = [
  {
    id: "article-stride3d-tutorials",
    slug: "stride3d-tutorials",
    title: "Stride3D Tutorials",
    subtitle: "A small game development tutorial series using Stride3D and C#.",
    createdAt: "2026-03-28",
    heroImage: articleHeroStride3d,
    contentFile: stride3dTutorialsContent,
    author: "emanuel-dev",
    published: true,
  },
  {
    id: "article-best-game-engine-for-csharp-programmers",
    slug: "best-game-engine-for-csharp-programmers",
    title: "Best Game Engine for C# Programmers",
    subtitle: "A practical comparison of Unity, Stride, MonoGame, Godot and Flax for developers who already like C#.",
    createdAt: "2026-03-19",
    heroImage: articleHeroCsharpGameEngines,
    contentFile: bestGameEngineForCsharpProgrammersContent,
    author: "emanuel-dev",
    published: true,
  },
  {
    id: "article-2026-approach-to-development",
    slug: "2026-approach-to-development",
    title: "My 2026 Approach to Software Development",
    subtitle: "Thoughts on staying useful, creative and technical in an AI-assisted development era.",
    createdAt: "2026-03-08",
    heroImage: articleHeroAiDevelopment,
    contentFile: approachToDevelopmentContent,
    author: "emanuel-dev",
    published: true,
  },
];

export const posts = createCollection({
  collectionName: "posts",
  entries: postEntries,
  requiredFields: ["id", "slug", "title", "subtitle", "createdAt", "heroImage", "contentFile"],
  sortBy: "createdAt",
});

export function getAllPosts() {
  return [...posts];
}

export function getPostBySlug(slug) {
  return findBySlug(posts, slug);
}
