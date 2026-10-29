// src/components/product/Pagination.tsx
import Link from 'next/link'

interface Props {
  totalPages: number
  currentPage: number
  categoria?: string
  marca?: string
  q?: string
}

export function Pagination({ totalPages, currentPage, categoria, marca, q }: Props) {
  if (totalPages <= 1) return null

  const buildHref = (page: number) => {
    const params = new URLSearchParams()
    if (categoria) params.set('categoria', categoria)
    if (marca) params.set('marca', marca)
    if (q) params.set('q', q)
    if (page > 1) params.set('page', String(page))
    return `/productos${params.toString() ? `?${params}` : ''}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  )

  return (
    <nav className="mt-8 flex items-center justify-center gap-1">
      {currentPage > 1 && (
        <Link href={buildHref(currentPage - 1)} className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-surface">
          Anterior
        </Link>
      )}
      {visiblePages.map((p, idx) => {
        const prev = visiblePages[idx - 1]
        const showEllipsis = prev && p - prev > 1
        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis && <span className="px-1 text-ink-500">…</span>}
            <Link
              href={buildHref(p)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                p === currentPage
                  ? 'bg-electric-600 text-white'
                  : 'text-ink-700 hover:bg-surface'
              }`}
            >
              {p}
            </Link>
          </span>
        )
      })}
      {currentPage < totalPages && (
        <Link href={buildHref(currentPage + 1)} className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-surface">
          Siguiente
        </Link>
      )}
    </nav>
  )
}