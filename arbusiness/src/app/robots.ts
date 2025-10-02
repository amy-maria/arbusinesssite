
// app/robots.ts
import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Apply rules to all crawlers (Googlebot, Bingbot, etc.)
        allow: '/', // Allow crawling of all pages by default
        disallow: [
          '/admin/', // Block the WordPress/CMS admin area
          '/api/', // Block API routes
          '/private-pages-or-drafts/', // Block any specific staging/private URLs
        ],
      },
      // You can add more specific rules for other user agents if needed
    ],
    sitemap: `${SITE_URL}/sitemap.xml`, // Point crawlers to your sitemap
    host: SITE_URL,
  };
}
