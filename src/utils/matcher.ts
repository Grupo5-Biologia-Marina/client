export interface Answer {
  index?: number;
  category?: string;
}

export interface Post {
  id: number | string;
  title: string;
  description?: string;
  category: string;
  image_url?: string;
}

export function pickPostByCategory(
  answers: (Answer | null)[],
  posts: Post[]
): Post | null {
  if (!posts?.length) return null;

  const counts: Record<string, number> = answers.reduce((acc, ans) => {
    if (ans?.category) acc[ans.category] = (acc[ans.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (!topCategory) return posts[Math.floor(Math.random() * posts.length)];

  const filtered = posts.filter((p) => p.category === topCategory);
  return filtered.length > 0
    ? filtered[Math.floor(Math.random() * filtered.length)]
    : posts[Math.floor(Math.random() * posts.length)];
}
