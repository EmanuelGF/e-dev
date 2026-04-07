import { describe, expect, it } from "vitest";
import { createCollection, findBySlug } from "./collectionUtils";

describe("createCollection", () => {
  it("filters unpublished entries and sorts by the requested field descending", () => {
    const collection = createCollection({
      collectionName: "posts",
      entries: [
        { id: "one", slug: "one", title: "One", createdAt: "2026-01-01", published: true },
        { id: "two", slug: "two", title: "Two", createdAt: "2026-03-01", published: true },
        { id: "three", slug: "three", title: "Three", createdAt: "2026-02-01", published: false },
      ],
      requiredFields: ["id", "slug", "title", "createdAt"],
      sortBy: "createdAt",
    });

    expect(collection.map((entry) => entry.slug)).toEqual(["two", "one"]);
  });

  it("throws when a required field is missing", () => {
    expect(() =>
      createCollection({
        collectionName: "posts",
        entries: [{ id: "one", slug: "one" }],
        requiredFields: ["id", "slug", "title"],
      })
    ).toThrow('posts entry "one" is missing "title".');
  });

  it("throws when duplicate slugs exist", () => {
    expect(() =>
      createCollection({
        collectionName: "posts",
        entries: [
          { id: "one", slug: "same", title: "One" },
          { id: "two", slug: "same", title: "Two" },
        ],
        requiredFields: ["id", "slug", "title"],
      })
    ).toThrow('posts contains duplicate "slug" values for "same".');
  });
});

describe("findBySlug", () => {
  const entries = [
    { id: "one", slug: "first" },
    { id: "two", slug: "second" },
  ];

  it("returns the matching entry", () => {
    expect(findBySlug(entries, "second")).toEqual(entries[1]);
  });

  it("returns null when no entry exists", () => {
    expect(findBySlug(entries, "missing")).toBeNull();
  });
});
