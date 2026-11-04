// src/components/home/MarcasSlider.tsx
import { createClient } from '@/lib/supabase/server'
import { MarcasMarquee } from './MarcasMarquee'

export async function MarcasSlider() {
  const supabase = await createClient()

  // Traemos las marcas que tengan imagen
  const { data: marcas, error } = await supabase
    .from('marcas')
    .select('id, nombre, imagen')
    .not('imagen', 'is', null)

  if (error || !marcas || marcas.length === 0) return null

  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-8 sm:mb-10">
        <h2 className="border-l-4 border-electric-600 pl-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            Marcas que trabajamos
        </h2>
        <p className="mt-2 text-sm text-ink-500">
            Las mejores marcas del circuito, seleccionadas para vos.
        </p>
        </div>
      
      {/* Componente de animación */}
      <MarcasMarquee marcas={marcas} />
    </section>
  )
}