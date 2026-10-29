// src/app/productos/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatPrecio, getPrecioFinal, getDescuento, tieneStock } from '@/lib/utils'
import { ProductGallery } from '@/components/product/ProductGallery'
import { WhatsAppButton } from '@/components/product/WhatsAppButton'
import { ProductSlider } from '@/components/product/ProductSlider'
import type { Database } from '@/types/database'
import type { Metadata } from 'next'

export const revalidate = 3600

type ProductoDetalle = Database['public']['Tables']['productos']['Row'] & {
  marcas: { nombre: string | null; slug: string | null } | null
  categorias: { nombre: string | null; slug: string | null } | null
  tipo_productos: { nombre: string | null; slug: string | null } | null
  galeria_productos: { id: number; imagen_galeria: string | null }[]
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('productos')
    .select('nombre, descripcion, imagen')
    .eq('slug', slug)
    .single()

  if (!data) {
    return { title: 'Producto no encontrado | Punto Padel' }
  }

  return {
    title: `${data.nombre} | Punto Padel`,
    description: data.descripcion?.slice(0, 160) ?? 'Producto de pádel en Punto Padel.',
  }
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('productos')
    .select(`
      *,
      marcas (nombre, slug),
      categorias (nombre, slug),
      tipo_productos (nombre, slug),
      galeria_productos (id, imagen_galeria)
    `)
    .eq('slug', slug)
    .single()

  const producto = data as ProductoDetalle | null

  if (error || !producto) {
    notFound()
  }

  const precioFinal = getPrecioFinal(producto)
  const descuento = getDescuento(producto)
  const hayStock = tieneStock(producto.stock)

  const imagenes = [
    producto.imagen,
    ...(producto.galeria_productos?.map((g) => g.imagen_galeria) ?? []),
  ].filter((img): img is string => Boolean(img))

  const specs: { label: string; value: string | number | null }[] = [
    { label: 'Marca', value: producto.marcas?.nombre ?? null },
    { label: 'Categoría', value: producto.categorias?.nombre ?? null },
    { label: 'Tipo', value: producto.tipo_productos?.nombre ?? null },
    { label: 'Color', value: producto.color },
    { label: 'Forma', value: producto.forma },
    { label: 'Balance', value: producto.balance },
    { label: 'Marco', value: producto.marco },
    { label: 'Núcleo', value: producto.nucleo },
    { label: 'Acabado', value: producto.acabado },
    { label: 'Potencia', value: producto.potencia },
    { label: 'Control', value: producto.control },
    { label: 'Peso', value: producto.peso ? `${producto.peso} g` : null },
    { label: 'Material', value: producto.material },
    { label: 'Género', value: producto.genero },
    { label: 'Modelo', value: producto.modelo },
    { label: 'Origen', value: producto.origen },
    { label: 'Medidas', value: producto.medidas },
  ].filter((s) => s.value !== null && s.value !== undefined && s.value !== '')

  // Productos relacionados: misma categoría, excluyendo el actual
  const { data: relacionados } = await supabase
    .from('productos_catalogo')
    .select('*')
    .eq('categoria_slug', producto.categorias?.slug ?? '')
    .neq('id', producto.id)
    .limit(10)

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-electric-600">Inicio</Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-electric-600">Productos</Link>
        {producto.categorias?.slug && (
          <>
            <span>/</span>
            <Link
              href={`/productos?categoria=${producto.categorias.slug}`}
              className="hover:text-electric-600"
            >
              {producto.categorias.nombre}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink-900">{producto.nombre}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <ProductGallery imagenes={imagenes} nombre={producto.nombre ?? 'Producto'} />

        <div>
          {producto.marcas?.nombre && (
            <span className="text-sm font-semibold uppercase tracking-wide text-electric-600">
              {producto.marcas.nombre}
            </span>
          )}
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {producto.nombre}
          </h1>

          <div className="mt-4 flex items-end gap-3">
            <span className="font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
              {formatPrecio(precioFinal)}
            </span>
            {descuento > 0 && (
              <>
                <span className="text-lg text-ink-500 line-through">
                  {formatPrecio(producto.precio)}
                </span>
                <span className="rounded-full bg-electric-600 px-2 py-1 text-xs font-bold text-white">
                  -{descuento}%
                </span>
              </>
            )}
          </div>

          <p className="mt-2 text-sm">
            {hayStock ? (
              <span className="font-semibold text-green-600">En stock</span>
            ) : (
              <span className="font-semibold text-red-600">Sin stock</span>
            )}
          </p>

          {/* Botón WhatsApp */}
          <div className="mt-6">
            <WhatsAppButton productoNombre={producto.nombre ?? 'Producto'} />
          </div>

          {producto.descripcion && (
            <p className="mt-6 leading-relaxed text-ink-700">
              {producto.descripcion}
            </p>
          )}

          {specs.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-bold text-ink-900">
                Especificaciones
              </h2>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <dt className="text-ink-500">{spec.label}</dt>
                    <dd className="font-semibold text-ink-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Productos relacionados */}
      {relacionados && relacionados.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <div className="mb-4 sm:mb-6">
            <h2 className="border-l-4 border-electric-600 pl-3 font-display text-xl font-bold text-ink-900 sm:text-2xl">
              También te puede interesar
            </h2>
          </div>
          <ProductSlider productos={relacionados} />
        </section>
      )}
    </div>
  )
}