import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://aiverify.example.com'
  const paths = ['/', '/upload', '/pricing', '/about', '/docs', '/transparency', '/login', '/signup']
  const now = new Date()
  return paths.map((p) => ({ url: base + p, lastModified: now, changeFrequency: 'weekly', priority: p === '/' ? 1 : 0.6 }))
}


