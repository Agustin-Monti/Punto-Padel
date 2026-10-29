// src/components/product/ProductGallery.tsx
'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface ProductGalleryProps {
  imagenes: string[]
  nombre: string
}

export function ProductGallery({ imagenes, nombre }: ProductGalleryProps) {
  const [activa, setActiva] = useState(0)
  const [lightboxAbierto, setLightboxAbierto] = useState(false)
  const [zoomActivo, setZoomActivo] = useState(false)

  // Ref para el contenedor de la imagen principal (donde se aplica el zoom)
  const contenedorRef = useRef<HTMLDivElement>(null)
  // Ref para la imagen (para aplicar transform sin re-render)
  const imagenRef = useRef<HTMLImageElement>(null)

  if (imagenes.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface text-ink-500">
        Sin imagen
      </div>
    )
  }

  // Zoom con seguimiento del cursor (solo desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomActivo || !contenedorRef.current || !imagenRef.current) return
    const rect = contenedorRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    // transform-origin dinámico: el zoom se centra en el cursor
    imagenRef.current.style.transformOrigin = `${x}% ${y}%`
  }

  const toggleZoom = () => {
    // Solo en desktop (>= 1024px)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setZoomActivo((v) => !v)
      if (imagenRef.current) {
        imagenRef.current.style.transformOrigin = '50% 50%'
      }
    } else {
      // En móvil, el clic abre el lightbox
      setLightboxAbierto(true)
    }
  }

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      toggleZoom()
    } else {
      setLightboxAbierto(true)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Imagen principal */}
        <div
          ref={contenedorRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            if (zoomActivo && imagenRef.current) {
              imagenRef.current.style.transformOrigin = '50% 50%'
            }
          }}
          className={`relative aspect-square w-full overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/5 ${
            zoomActivo ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          role="button"
          tabIndex={0}
          aria-label={zoomActivo ? 'Quitar zoom' : 'Ampliar imagen'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick()
            }
          }}
        >
          {/* Usamos <img> nativo para controlar el transform-origin sin re-render */}
          <img
            ref={imagenRef}
            src={imagenes[activa]}
            alt={nombre}
            className={`h-full w-full object-contain p-6 transition-transform duration-300 ease-out ${
              zoomActivo ? 'scale-[2.5]' : 'scale-100'
            }`}
            draggable={false}
          />

          {/* Indicador de zoom (solo desktop) */}
          <div className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-ink-900/70 px-3 py-1.5 text-xs font-semibold text-white lg:flex lg:items-center lg:gap-1.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {zoomActivo ? 'Clic para salir' : 'Clic para zoom'}
          </div>
        </div>

        {/* Miniaturas */}
        {imagenes.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {imagenes.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => {
                  setActiva(i)
                  setZoomActivo(false)
                  if (imagenRef.current) {
                    imagenRef.current.style.transformOrigin = '50% 50%'
                  }
                }}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white ring-1 transition ${
                  i === activa ? 'ring-2 ring-electric-600' : 'ring-ink-900/5'
                }`}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${nombre} - imagen ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox nativo (móvil y desktop si quieren pantalla completa) */}
      {lightboxAbierto && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-black/90 p-4 backdrop:bg-black/90"
          onClick={() => setLightboxAbierto(false)}
        >
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagenes[activa]}
              alt={nombre}
              className="max-h-full max-w-full object-contain"
              style={{ touchAction: 'pinch-zoom' }}
            />
            <button
              type="button"
              onClick={() => setLightboxAbierto(false)}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
              aria-label="Cerrar"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </dialog>
      )}
    </>
  )
}