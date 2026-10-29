// src/components/layout/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'
import { InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/SocialIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.webp"
                alt="Punto Padel"
                width={36}
                height={36}
                className="h-9 w-9"
                unoptimized
              />
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                PUNTO<span className="text-electric-400">PADEL</span>
              </span>
            </Link>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-400"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Gobernador Mansilla - Paraná Entre Rios, Argentina</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-400"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:+5493445532916"
                  className="transition-colors hover:text-electric-400"
                >
                  +54 9 3445 532916
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-400"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="mailto:puntopadellf@gmail.com"
                  className="transition-colors hover:text-electric-400"
                >
                  puntopadellf@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Tienda
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/productos"
                  className="transition-colors hover:text-electric-400"
                >
                  Todos los productos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/terminos"
                  className="transition-colors hover:text-electric-400"
                >
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="transition-colors hover:text-electric-400"
                >
                  Política de privacidad
                </Link>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Punto Padel"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Punto Padel"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#25F4EE]"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Punto Padel"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-[#1877F2]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright + developer */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-xs sm:flex-row sm:justify-between sm:text-left">
          <p className="text-white/50">
            © {year} Punto Padel. Todos los derechos reservados.
          </p>

          {/* Logo del developer */}
          <a
            href="https://portfolio-personal3.vercel.app/es"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-white/40 transition-opacity hover:opacity-100"
            aria-label="Desarrollado por [tu nombre]"
          >
            <span className="text-xs">Desarrollado por</span>
            <Image
              src="/images/marcapersonal.webp" // 👈 reemplaza con tu logo real
              alt="Logo del desarrollador"
              width={36}
              height={36}
              className="h-9 w-9 opacity-60 transition-opacity group-hover:opacity-100"
              unoptimized
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
