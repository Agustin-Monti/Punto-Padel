// src/components/product/ProductSlider.tsx
import type { Database } from '@/types/database'
import { ProductCard } from './ProductCard'

type ProductoCatalogo = Database['public']['Views']['productos_catalogo']['Row']

interface ProductSliderProps {
  productos: ProductoCatalogo[]
}

export function ProductSlider({ productos }: ProductSliderProps) {
  if (productos.length === 0) return null

  return (
    <div
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollPaddingLeft: '1rem' }}
    >
      {productos.map((producto, index) => (
        <div
          key={producto.id}
          className="w-[65%] flex-shrink-0 snap-start sm:w-[45%] md:w-[32%] lg:w-[24%] xl:w-[19%]"
        >
          <ProductCard producto={producto} priority={index < 2} />
        </div>
      ))}
    </div>
  )
}