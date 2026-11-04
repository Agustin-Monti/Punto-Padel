// src/components/home/MarcasMarquee.tsx
'use client'

import Image from 'next/image'

interface Marca {
  id: number
  nombre: string | null
  imagen: string | null
}

export function MarcasMarquee({ marcas }: { marcas: Marca[] }) {
  // Duplicamos el array para hacer el efecto infinito
  const marcasDuplicadas = [...marcas, ...marcas]

  return (
    <>
      {/* Estilos para la animación */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        /* Pausa la animación al hacer hover */
        .group-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="group-marquee relative flex w-full overflow-hidden py-4">
        {/* Gradientes a los lados para que el corte no sea brusco */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent sm:w-32" />

        {/* Carrusel */}
        <div className="animate-marquee flex w-max items-center gap-8 px-4 sm:gap-16">
          {marcasDuplicadas.map((marca, index) => (
            <div
              key={`${marca.id}-${index}`}
              className="group/logo flex h-16 w-32 flex-shrink-0 items-center justify-center sm:h-20 sm:w-40"
            >
              {marca.imagen ? (
                <img
                  src={marca.imagen}
                  alt={marca.nombre ?? 'Marca'}
                  className="max-h-full max-w-full object-contain opacity-50 grayscale transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-ink-500">
                  {marca.nombre}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}