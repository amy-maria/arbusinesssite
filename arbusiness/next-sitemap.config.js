/** @type {import('next-sitemap').IConfig} */
const fetch = require('node-fetch');

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const SITE_URL = process.env.NEXT_PUBLIC_WP_SITE_URL || 'https://www.example.com';

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path, // The URL
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    // Fetch all posts from WordPress
    const query = `
      query GetAllPosts {
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

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    const posts = json.data.posts.edges;

    return posts.map(({ node }) => ({
      loc: `/blog/${node.slug}`,
      lastmod: node.date,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  },
};
