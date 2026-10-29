// src/app/page.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Hero } from '@/components/home/Hero'
import { Categorias } from '@/components/home/Categorias'
import { ProductSlider } from '@/components/product/ProductSlider'
import { Nosotros } from '@/components/home/Nosotros'

export const revalidate = 3600

export default async function HomePage() {
  const supabase = await createClient()

  // Productos valorados (para el slider)
  const { data: valorados } = await supabase
    .from('productos_catalogo')
    .select('*')
    .eq('valorado', true)
    .order('id', { ascending: false })
    .limit(10)

  return (
    <div>
      <Hero />

      <section className="mb-10 sm:mb-14">
        <h2 className="mb-4 font-display text-xl font-bold text-ink-900 sm:mb-6 sm:text-2xl">
          Categorías
        </h2>
        <Categorias />
      </section>

      {valorados && valorados.length > 0 && (
        <section className="mb-10 sm:mb-14">
          <div className="mb-4 flex items-end justify-between sm:mb-6">
            <h2 className="border-l-4 border-electric-600 pl-3 font-display text-xl font-bold text-ink-900 sm:text-2xl">
              Más valorados
            </h2>
            <Link
              href="/productos"
              className="rounded-full border border-electric-600 px-4 py-1.5 text-sm font-semibold text-electric-600 transition-colors hover:bg-electric-600 hover:text-white"
            >
              Ver todos
            </Link>
          </div>
          <ProductSlider productos={valorados} />
        </section>
      )}

      <Nosotros />
    </div>
  )
}