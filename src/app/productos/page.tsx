// src/app/productos/page.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { MobileFilters } from '@/components/product/MobileFilters'
import { Pagination } from '@/components/product/Pagination'

export const revalidate = 3600

interface PageProps {
  searchParams: Promise<{
    categoria?: string
    marca?: string
    q?: string
    page?: string
  }>
}

export default async function ProductosPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoria = params.categoria
  const marca = params.marca
  const q = params.q?.trim()
  const page = Number(params.page) || 1
  const pageSize = 12

  const supabase = await createClient()

  const [
    { data: categorias },
    { data: marcas },
    productosResult,
    countResult,
  ] = await Promise.all([
    supabase.from('categorias').select('slug, nombre').order('nombre'),
    supabase.from('marcas').select('slug, nombre').order('nombre'),
    (async () => {
      let query = supabase.from('productos_catalogo').select('*')
      if (categoria) query = query.eq('categoria_slug', categoria)
      if (marca) query = query.eq('marca_slug', marca)
      if (q) {
        // Busca en nombre o en marca
        query = query.or(`nombre.ilike.%${q}%,marca_nombre.ilike.%${q}%`)
      }
      const from = (page - 1) * pageSize
      return query.order('id', { ascending: false }).range(from, from + pageSize - 1)
    })(),
    (async () => {
      let query = supabase
        .from('productos_catalogo')
        .select('*', { count: 'exact', head: true })
      if (categoria) query = query.eq('categoria_slug', categoria)
      if (marca) query = query.eq('marca_slug', marca)
      if (q) {
        query = query.or(`nombre.ilike.%${q}%,marca_nombre.ilike.%${q}%`)
      }
      return query
    })(),
  ])

  const productos = productosResult.data
  const count = countResult.count
  const totalPages = count ? Math.ceil(count / pageSize) : 1

  const categoriasFiltro = (categorias ?? [])
    .filter((c) => c.slug && c.nombre)
    .map((c) => ({ slug: c.slug!, nombre: c.nombre! }))
  const marcasFiltro = (marcas ?? [])
    .filter((m) => m.slug && m.nombre)
    .map((m) => ({ slug: m.slug!, nombre: m.nombre! }))

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-900 sm:text-4xl">
          {q ? `Resultados para "${q}"` : 'Productos'}
        </h1>
        {q && (
          <Link
            href="/productos"
            className="text-sm font-semibold text-electric-600 hover:text-electric-700"
          >
            Limpiar búsqueda
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <ProductFilters
            categorias={categoriasFiltro}
            marcas={marcasFiltro}
            categoriaActual={categoria}
            marcaActual={marca}
          />
        </aside>

        <div className="flex-1">
          <p className="mb-4 text-sm text-ink-500">
            {count ?? 0} productos
            {totalPages > 1 && ` · Página ${page} de ${totalPages}`}
          </p>

          {productos && productos.length > 0 ? (
            <ProductGrid productos={productos} />
          ) : (
            <div className="mx-auto my-12 max-w-lg rounded-2xl border-2 border-dashed border-ink-900/10 bg-white px-6 py-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-electric-50 text-electric-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
                No encontramos productos
              </h2>
              <p className="mt-2 text-sm text-ink-500 sm:text-base">
                {q
                  ? `No hay resultados para "${q}". Probá con otra palabra o mirá todo el catálogo.`
                  : 'No hay productos con esos filtros. Probá con otra categoría o marca.'}
              </p>
              <Link
                href="/productos"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-electric-700"
              >
                Ver todos los productos
              </Link>
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            categoria={categoria}
            marca={marca}
            q={q}
          />
        </div>
      </div>

      <MobileFilters
        categorias={categoriasFiltro}
        marcas={marcasFiltro}
        categoriaActual={categoria}
        marcaActual={marca}
      />
    </div>
  )
}