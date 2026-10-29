// src/components/product/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Database } from '@/types/database'
import { formatPrecio, getPrecioFinal, getDescuento, tieneStock } from '@/lib/utils'

type ProductoCatalogo = Database['public']['Views']['productos_catalogo']['Row']

interface ProductCardProps {
  producto: ProductoCatalogo
  priority?: boolean
}

export function ProductCard({ producto, priority = false }: ProductCardProps) {
  const precioFinal = getPrecioFinal(producto)
  const descuento = getDescuento(producto)
  const hayStock = tieneStock(producto.stock)
  const nombre = producto.nombre ?? 'Producto sin nombre'
  const slug = producto.slug ?? String(producto.id)

  return (
    <Link
      href={`/productos/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10 hover:ring-electric-600/20"
    >
      {/* Imagen */}
      <div className="relative aspect-square w-full bg-surface">
        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            priority={priority}
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-500">
            Sin imagen
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {descuento > 0 && (
            <span className="rounded-full bg-electric-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              -{descuento}%
            </span>
          )}
          {!hayStock && (
            <span className="rounded-full bg-ink-900 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Sin stock
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {producto.marca_nombre && (
          <span className="text-xs font-semibold uppercase tracking-wide text-electric-600">
            {producto.marca_nombre}
          </span>
        )}
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold leading-tight text-ink-900 sm:min-h-[3rem] sm:text-base">
          {nombre}
        </h3>

        <div className="mt-auto pt-3">
          {descuento > 0 && producto.precio !== null && (
            <span className="block text-xs text-ink-500 line-through">
              {formatPrecio(producto.precio)}
            </span>
          )}
          <span className="font-display text-lg font-extrabold text-ink-900 sm:text-xl">
            {formatPrecio(precioFinal)}
          </span>
        </div>
      </div>
    </Link>
  )
}