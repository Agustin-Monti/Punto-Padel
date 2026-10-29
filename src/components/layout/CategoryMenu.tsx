// src/components/layout/CategoryMenu.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Categoria {
  nombre: string
  slug: string
}

export function CategoryMenu({ categorias }: { categorias: Categoria[] }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setAbierto(!abierto)}
        className="text-sm font-semibold text-ink-700 hover:text-electric-600 transition-colors"
      >
        Categorías
      </button>
      
      {abierto && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-lg ring-1 ring-ink-900/5">
          {categorias.map((cat) => (
            <Link
              key={cat.slug}
              href={`/productos?categoria=${cat.slug}`}
              className="block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-surface hover:text-electric-600"
              onClick={() => setAbierto(false)}
            >
              {cat.nombre}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}