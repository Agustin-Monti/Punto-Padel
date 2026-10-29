// src/components/product/ProductGrid.tsx
import type { Database } from '@/types/database'
import { ProductCard } from './ProductCard'

type ProductoCatalogo = Database['public']['Views']['productos_catalogo']['Row']

interface ProductGridProps {
  productos: ProductoCatalogo[]
}

export function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <div className="mx-auto my-12 max-w-lg rounded-2xl border-2 border-dashed border-ink-900/10 bg-white px-6 py-12 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-electric-50 text-electric-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h2 className="font-display text-xl font-bold text-ink-900 sm:text-2xl">
          No hay productos disponibles
        </h2>
        <p className="mt-2 text-sm text-ink-500 sm:text-base">
          Próximamente tendremos más productos en nuestro catálogo. ¡Vuelve pronto!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((producto, index) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          priority={index < 2}
        />
      ))}
    </div>
  )
}