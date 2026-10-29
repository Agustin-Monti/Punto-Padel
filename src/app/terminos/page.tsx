// src/app/terminos/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Punto Padel',
  description: 'Leé nuestros términos y condiciones de uso del sitio.',
}

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-electric-600">Inicio</Link>
        <span>/</span>
        <span className="text-ink-900">Términos y condiciones</span>
      </nav>

      {/* Título con acento */}
      <h1 className="border-l-4 border-electric-600 pl-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
        Términos y Condiciones de Uso
      </h1>
      <p className="mt-3 text-sm text-ink-500">
        Última actualización: 24 de septiembre de 2025
      </p>

      {/* Contenido */}
      <div className="mt-8 space-y-8 text-ink-700 leading-relaxed">
        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Bienvenidos a Punto Padel LF
          </h2>
          <p>
            En nuestra empresa, nos dedicamos a ofrecer soluciones innovadoras
            y de alta calidad para nuestros clientes. Con años de experiencia
            en el sector, trabajamos incansablemente para brindar los mejores
            productos y servicios.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Nuestra misión
          </h2>
          <p>
            Nuestra misión es transformar ideas en soluciones concretas que
            ayuden a nuestros clientes a alcanzar sus objetivos. Contamos con
            un equipo de profesionales altamente capacitados que están
            comprometidos con la excelencia y la innovación.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Nuestros valores
          </h2>
          <p>
            Valoramos la transparencia, la honestidad y la responsabilidad en
            todos nuestros procesos. Nos aseguramos de que cada cliente reciba
            un servicio personalizado, adaptado a sus necesidades específicas.
          </p>
        </section>
      </div>

      {/* Botón volver */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-electric-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-electric-700 hover:shadow-xl"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}