import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/documents/'],
    },
    sitemap: 'https://naka.dev/sitemap.xml',
  };
}
