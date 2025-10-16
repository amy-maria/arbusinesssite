// pages/api/sitemap.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { request, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const GET_POSTS = gql`
  query {
    posts {
      edges {
        node {
          slug
          date
        }
      }
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { posts } = await request(API_URL, GET_POSTS);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts.edges
    .map(
      ({ node }) => `
  <url>
    <loc>https://www.example.com/blog/${node.slug}</loc>
    <lastmod>${new Date(node.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.status(200).send(xml);
}

