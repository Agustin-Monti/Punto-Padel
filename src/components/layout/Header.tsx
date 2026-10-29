// src/components/layout/Header.tsx
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { NavMenu, type CategoriaNav } from './NavMenu'
import { SearchButton } from './SearchButton'
import { HeaderShell } from './HeaderShell'

export async function Header() {
  const supabase = await createClient()
  const { data: categorias } = await supabase
    .from('categorias')
    .select('nombre, slug')
    .order('nombre')

  const cats: CategoriaNav[] = categorias ?? []

  return (
    <HeaderShell>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/logo.webp"
          alt="Punto Padel"
          width={40}
          height={40}
          className="h-9 w-9 sm:h-10 sm:w-10"
          priority
          unoptimized
        />
        <span className="font-display text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
          PUNTO<span className="text-electric-600">PADEL</span>
        </span>
      </Link>

      {/* Nav + actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <NavMenu categorias={cats} />
        <SearchButton />
      </div>
    </HeaderShell>
  )
}