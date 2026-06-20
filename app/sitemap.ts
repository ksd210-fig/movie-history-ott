import type { MetadataRoute } from 'next'
import { CANONICAL_FILMS, FIELDS, FieldTag } from '@/data/films'
import { SITE_URL } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const fields = Object.keys(FIELDS) as FieldTag[]

  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/timeline`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...fields.map(tag => ({
      url: `${SITE_URL}/fields/${encodeURIComponent(tag)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...CANONICAL_FILMS.map(film => ({
      url: `${SITE_URL}/films/${film.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
