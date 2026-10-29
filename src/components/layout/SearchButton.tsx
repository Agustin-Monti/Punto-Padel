// src/components/layout/SearchButton.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function SearchButton() {
  const [abierto, setAbierto] = useState(false)
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (abierto) inputRef.current?.focus()
  }, [abierto])

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    const term = q.trim()
    router.push(term ? `/productos?q=${encodeURIComponent(term)}` : '/productos')
    setAbierto(false)
    setQ('')
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Buscar"
        className="rounded-full p-2 text-ink-700 transition-colors hover:bg-surface hover:text-electric-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {abierto && (
        <form
          onSubmit={enviar}
          className="absolute right-0 top-full z-50 mt-2 w-[22rem] max-w-[90vw] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink-900/5 sm:w-[28rem]"
        >
          <div className="flex items-center gap-2 rounded-xl border border-ink-900/10 bg-surface px-3 py-2 focus-within:border-electric-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 flex-shrink-0 text-ink-500" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar paletas, marcas, modelos..."
              className="w-full bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-500"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="Limpiar"
                className="rounded-full p-1 text-ink-500 hover:text-ink-900"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-ink-500">Enter para buscar</span>
            <button
              type="submit"
              className="rounded-full bg-electric-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-electric-700"
            >
              Buscar
            </button>
          </div>
        </form>
      )}
    </div>
  )
}