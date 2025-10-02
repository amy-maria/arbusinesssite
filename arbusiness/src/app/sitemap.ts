// app/sitemap.ts
import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';

// 1. Function to fetch data from your GraphQL endpoint
async function getDynamicRoutes() {
  const GRAPHQL_ENDPOINT = process.env.WORDPRESS_API_URL;

  // A simple GraphQL query to get slugs/URIs and last modified dates
  const QUERY = `
    query SitemapContent {
      posts(first: 500) {
        nodes { uri modified }
      }
      pages(first: 500) {
        nodes { uri modified }
      }
    }
  `;

  // Make the fetch request
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: QUERY }),
    // Use Incremental Static Regeneration (ISR) to keep the sitemap fresh
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  const { data } = await response.json();
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getDynamicRoutes();

  // 2. Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    // Add other static pages here
  ];

  // 3. Map WordPress Posts to the Sitemap format
  const postRoutes: MetadataRoute.Sitemap = data.posts.nodes.map((post: any) => ({
    url: `${SITE_URL}${post.uri}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 4. Map WordPress Pages to the Sitemap format
  const pageRoutes: MetadataRoute.Sitemap = data.pages.nodes
    .filter((page: any) => page.uri !== '/') // Filter out the home page (already in staticRoutes)
    .map((page: any) => ({
      url: `${SITE_URL}${page.uri}`,
      lastModified: new Date(page.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  // 5. Combine and return all routes
  return [...staticRoutes, ...postRoutes, ...pageRoutes];
}