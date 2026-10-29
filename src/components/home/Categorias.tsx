// src/components/home/Categorias.tsx
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

interface Categoria {
  id: number
  nombre: string | null
  slug: string | null
  imagen: string | null
}

function CategoriaItem({
  cat,
  className = '',
  imageClassName = 'h-full w-full',
  priority = false,
}: {
  cat: Categoria
  className?: string
  imageClassName?: string
  priority?: boolean
}) {
  const nombre = cat.nombre ?? 'Categoría'
  const slug = cat.slug ?? String(cat.id)

  return (
    <Link
      href={`/productos?categoria=${slug}`}
      className={`group relative block overflow-hidden rounded-2xl ring-1 ring-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/10 sm:rounded-3xl ${className}`}
    >
      {cat.imagen ? (
        <Image
          src={cat.imagen}
          alt={nombre}
          fill
          sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
          priority={priority}
          unoptimized
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface text-ink-500">
          Sin imagen
        </div>
      )}

      {/* Overlay con degradado */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent transition-opacity group-hover:from-ink-900/90" />

      {/* Texto abajo a la izquierda */}
      <div className="absolute inset-0 flex items-end p-5 sm:p-6">
        <span className="font-display text-xl font-bold uppercase tracking-wide text-white drop-shadow-md sm:text-2xl">
          {nombre}
        </span>
      </div>
    </Link>
  )
}

export async function Categorias() {
  const supabase = await createClient()

  const { data: categorias, error } = await supabase
    .from('categorias')
    .select('id, nombre, slug, imagen')

  if (error) {
    console.error('Error cargando categorías:', error)
    return null
  }

  const porNombre = new Map(
    (categorias ?? []).map((c) => [(c.nombre ?? '').toLowerCase(), c])
  )
  const get = (nombre: string) => porNombre.get(nombre.toLowerCase())

  const paletas = get('paletas')
  const accesorios = get('accesorios')
  const zapatillas = get('zapatillas')
  const bolsos = get('bolsos')
  const indumentaria = get('indumentaria')

  return (
    <>
      {/* 🖥️ Desktop: mismo grid 6x6, misma altura 700px */}
      <div className="hidden lg:block w-full">
        <div className="grid h-[700px] grid-cols-6 grid-rows-6 gap-3">
          {paletas && (
            <CategoriaItem
              cat={paletas}
              className="col-span-2 row-span-6"
              priority
            />
          )}
          {accesorios && (
            <CategoriaItem cat={accesorios} className="col-span-2 row-span-3" />
          )}
          {zapatillas && (
            <CategoriaItem cat={zapatillas} className="col-span-2 row-span-3" />
          )}
          {bolsos && (
            <CategoriaItem cat={bolsos} className="col-span-2 row-span-3" />
          )}
          {indumentaria && (
            <CategoriaItem
              cat={indumentaria}
              className="col-span-2 row-span-3"
            />
          )}
        </div>
      </div>

      {/* 📱 Móvil: lista vertical, mismas alturas h-64 / h-48 */}
      <div className="block space-y-3 lg:hidden">
        {[paletas, accesorios, zapatillas, bolsos, indumentaria].map((cat) => {
          if (!cat) return null
          const esPaletas = (cat.nombre ?? '').toLowerCase() === 'paletas'
          return (
            <CategoriaItem
              key={cat.id}
              cat={cat}
              className={esPaletas ? 'h-64' : 'h-48'}
              imageClassName={esPaletas ? 'object-[center_25%]' : 'object-center'}
              priority={esPaletas}
            />
          )
        })}
      </div>
    </>
  )
}