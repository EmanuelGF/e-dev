function assertRequiredField(collectionName, entry, fieldName) {
  if (!entry[fieldName]) {
    throw new Error(`${collectionName} entry "${entry.id || "unknown"}" is missing "${fieldName}".`);
  }
}

function assertUniqueField(collectionName, entries, fieldName) {
  const seen = new Map();

  entries.forEach((entry) => {
    const value = entry[fieldName];

    if (!value) {
      return;
    }

    if (seen.has(value)) {
      throw new Error(
        `${collectionName} contains duplicate "${fieldName}" values for "${value}".`
      );
    }

    seen.set(value, entry.id);
  });
}

export function createCollection({
  collectionName,
  entries,
  requiredFields,
  sortBy,
  transform = (entry) => entry,
}) {
  const normalizedEntries = entries.map(transform);

  normalizedEntries.forEach((entry) => {
    requiredFields.forEach((fieldName) => {
      assertRequiredField(collectionName, entry, fieldName);
    });
  });

  assertUniqueField(collectionName, normalizedEntries, "id");
  assertUniqueField(collectionName, normalizedEntries, "slug");

  const publishedEntries = normalizedEntries
    .filter((entry) => entry.published !== false)
    .sort((left, right) => {
      if (!sortBy) {
        return 0;
      }

      return String(right[sortBy]).localeCompare(String(left[sortBy]));
    });

  return Object.freeze(publishedEntries);
}

export function findBySlug(entries, slug) {
  return entries.find((entry) => entry.slug === slug) || null;
}
