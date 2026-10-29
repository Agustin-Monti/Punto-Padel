// src/components/product/MobileFilters.tsx
'use client'

import { useState } from 'react'
import { ProductFilters, type FiltroOpcion } from './ProductFilters'

interface Props {
  categorias: FiltroOpcion[]
  marcas: FiltroOpcion[]
  categoriaActual?: string
  marcaActual?: string
}

export function MobileFilters(props: Props) {
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-electric-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-electric-700 lg:hidden"
        aria-label="Abrir filtros"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filtros
      </button>

      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setAbierto(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          abierto ? 'translate-y-0' : 'translate-y-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de productos"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink-900">Filtros</h2>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="rounded-full p-2 text-ink-500 hover:bg-surface"
            aria-label="Cerrar filtros"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Contenido de filtros: al hacer clic en un Link, cerramos el sheet */}
        <div onClick={() => setAbierto(false)}>
          <ProductFilters {...props} />
        </div>

        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="mt-6 w-full rounded-full bg-electric-600 py-3 text-sm font-bold text-white hover:bg-electric-700"
        >
          Ver resultados
        </button>
      </div>
    </>
  )
}