// src/components/layout/NavMenu.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/SocialIcons'

export interface CategoriaNav {
  nombre: string | null
  slug: string | null
}

export function NavMenu({ categorias }: { categorias: CategoriaNav[] }) {
  const [catAbierto, setCatAbierto] = useState(false)
  const [movilAbierto, setMovilAbierto] = useState(false)
  const [montado, setMontado] = useState(false)

  useEffect(() => {
    setMontado(true)
  }, [])

  useEffect(() => {
    if (movilAbierto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [movilAbierto])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    if (!catAbierto) return
    const onClick = () => setCatAbierto(false)
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [catAbierto])

  const catsValidas = categorias.filter((c) => c.slug && c.nombre)

  const panelMovil = movilAbierto ? (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={() => setMovilAbierto(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        id="mobile-menu"
        className="fixed inset-y-0 right-0 z-[110] flex w-80 max-w-[85vw] flex-col overflow-y-auto bg-surface shadow-2xl lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header del panel */}
        <div className="flex items-center justify-between border-b border-ink-900/5 bg-white px-5 py-4">
          <span className="font-display text-lg font-bold tracking-tight text-ink-900">
            PUNTO<span className="text-electric-600">PADEL</span>
          </span>
          <button
            type="button"
            onClick={() => setMovilAbierto(false)}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-ink-500 transition-colors hover:bg-surface hover:text-ink-900"
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

        <div className="flex-1 px-5 py-6">
          {/* CTA principal */}
          <Link
            href="/productos"
            onClick={() => setMovilAbierto(false)}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-full bg-electric-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-electric-700 hover:shadow-xl"
          >
            Ver catálogo
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Links principales */}
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setMovilAbierto(false)}
              className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                Inicio
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>

            <Link
              href="/productos"
              onClick={() => setMovilAbierto(false)}
              className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric-50 text-electric-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                Todos los productos
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-ink-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </nav>

          {/* Categorías */}
          <div className="mt-8">
            <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-ink-500">
              Categorías
            </h3>
            <ul className="mt-2 space-y-1">
              {catsValidas.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/productos?categoria=${cat.slug}`}
                    onClick={() => setMovilAbierto(false)}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-white hover:text-electric-600"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric-600" aria-hidden="true" />
                      {cat.nombre}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Redes sociales al fondo */}
        <div className="border-t border-ink-900/5 bg-white px-5 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">
            Seguinos
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/puntopadel_lf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Punto Padel"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.tiktok.com/@puntopadel_lf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Punto Padel"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#25F4EE]"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/puntopadel_lf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Punto Padel"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-[#1877F2]"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </aside>
    </>
  ) : null

  return (
    <>
      {/* ====== DESKTOP ====== */}
      <nav className="hidden items-center gap-6 text-sm font-semibold text-ink-700 lg:flex">
        <Link href="/productos" className="transition-colors hover:text-electric-600">
          Productos
        </Link>

        {/* Dropdown categorías: el contenedor con hover incluye botón + dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setCatAbierto(true)}
          onMouseLeave={() => setCatAbierto(false)}
        >
          <button
            type="button"
            className="flex items-center gap-1 transition-colors hover:text-electric-600"
            aria-expanded={catAbierto}
            aria-haspopup="true"
            onClick={(e) => {
              e.stopPropagation()
              setCatAbierto((v) => !v)
            }}
          >
            Categorías
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-4 w-4 transition-transform ${catAbierto ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {catAbierto && (
            <div
              className="absolute left-0 top-full z-50 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-ink-900/5">
                {catsValidas.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/productos?categoria=${cat.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-surface hover:text-electric-600"
                    onClick={() => setCatAbierto(false)}
                  >
                    {cat.nombre}
                  </Link>
                ))}
                {catsValidas.length === 0 && (
                  <span className="block px-3 py-2 text-sm text-ink-500">Sin categorías</span>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ====== MÓVIL: botón hamburguesa ====== */}
      <button
        type="button"
        onClick={() => setMovilAbierto(true)}
        aria-label="Abrir menú"
        aria-controls="mobile-menu"
        className="rounded-full p-2 text-ink-700 transition-colors hover:bg-surface hover:text-electric-600 lg:hidden"
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
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* ====== MÓVIL: panel en portal ====== */}
      {montado && panelMovil
        ? createPortal(panelMovil, document.body)
        : null}
    </>
  )
}