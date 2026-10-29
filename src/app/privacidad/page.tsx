// src/app/privacidad/page.tsx
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Punto Padel',
  description: 'Conocé cómo protegemos y utilizamos tu información personal.',
}

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink-500">
        <Link href="/" className="hover:text-electric-600">Inicio</Link>
        <span>/</span>
        <span className="text-ink-900">Política de privacidad</span>
      </nav>

      {/* Título con acento */}
      <h1 className="border-l-4 border-electric-600 pl-4 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
        Política de Privacidad
      </h1>
      <p className="mt-3 text-sm text-ink-500">
        Última actualización: 24 de septiembre de 2025
      </p>

      {/* Contenido */}
      <div className="mt-8 space-y-8 text-ink-700 leading-relaxed">
        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Introducción
          </h2>
          <p>
            En Punto Padel LF nos tomamos muy en serio la protección de tu
            información personal. Esta política explica cómo recopilamos,
            utilizamos y protegemos tus datos cuando utilizás nuestro sitio.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Información que recopilamos
          </h2>
          <p>
            Podemos recopilar datos como nombre, correo electrónico,
            información de contacto y datos de navegación para mejorar tu
            experiencia de usuario.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Uso de la información
          </h2>
          <p>
            La información recopilada se utiliza exclusivamente para brindarte
            un mejor servicio, gestionar tus compras y enviarte comunicaciones
            relevantes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-display text-xl font-bold text-ink-900">
            Seguridad
          </h2>
          <p>
            Implementamos medidas técnicas y organizativas para proteger tus
            datos personales contra accesos no autorizados, pérdidas o
            alteraciones.
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