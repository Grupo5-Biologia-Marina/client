// src/utils/matcher.js

export function pickPostByCategory(answers, posts) {
  if (!posts?.length) return null;

  // Contar cuántas respuestas corresponden a cada categoría
  const counts = answers.reduce((acc, ans) => {
    if (ans?.category) acc[ans.category] = (acc[ans.category] || 0) + 1;
    return acc;
  }, {});

  // Escoger la categoría con más coincidencias
  const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!topCategory) return posts[Math.floor(Math.random() * posts.length)];

  const filtered = posts.filter((p) => p.category === topCategory);
  return filtered.length > 0
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : posts[Math.floor(Math.random() * posts.length)];
}
