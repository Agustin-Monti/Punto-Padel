// src/components/product/ProductFilters.tsx
import Link from 'next/link'

export interface FiltroOpcion {
  slug: string
  nombre: string
}

interface Props {
  categorias: FiltroOpcion[]
  marcas: FiltroOpcion[]
  categoriaActual?: string
  marcaActual?: string
}

function buildHref(newCategoria?: string, newMarca?: string) {
  const params = new URLSearchParams()
  if (newCategoria) params.set('categoria', newCategoria)
  if (newMarca) params.set('marca', newMarca)
  return `/productos${params.toString() ? `?${params}` : ''}`
}

export function ProductFilters({
  categorias,
  marcas,
  categoriaActual,
  marcaActual,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Categorías */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900">
          Categoría
        </h3>
        <ul className="space-y-1.5">
          <li>
            <Link
              href={buildHref(undefined, marcaActual)}
              className={`text-sm ${
                !categoriaActual
                  ? 'font-semibold text-electric-600'
                  : 'text-ink-700 hover:text-electric-600'
              }`}
            >
              Todas
            </Link>
          </li>
          {categorias.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={buildHref(cat.slug, marcaActual)}
                className={`text-sm ${
                  categoriaActual === cat.slug
                    ? 'font-semibold text-electric-600'
                    : 'text-ink-700 hover:text-electric-600'
                }`}
              >
                {cat.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-ink-900">
          Marca
        </h3>
        <ul className="space-y-1.5">
          <li>
            <Link
              href={buildHref(categoriaActual, undefined)}
              className={`text-sm ${
                !marcaActual
                  ? 'font-semibold text-electric-600'
                  : 'text-ink-700 hover:text-electric-600'
              }`}
            >
              Todas
            </Link>
          </li>
          {marcas.map((m) => (
            <li key={m.slug}>
              <Link
                href={buildHref(categoriaActual, m.slug)}
                className={`text-sm ${
                  marcaActual === m.slug
                    ? 'font-semibold text-electric-600'
                    : 'text-ink-700 hover:text-electric-600'
                }`}
              >
                {m.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}