// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const BASE_URL = 'https://padel-cocha-sbcy.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // Traer todos los slugs de productos
  const { data: productos } = await supabase
    .from('productos_catalogo')
    .select('slug')

  const rutasProductos: MetadataRoute.Sitemap = (productos ?? [])
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${BASE_URL}/productos/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Rutas estáticas
  const rutasEstaticas: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/productos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/terminos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  return [...rutasEstaticas, ...rutasProductos]
}