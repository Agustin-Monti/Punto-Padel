// src/components/home/Nosotros.tsx
import Image from 'next/image'
import { Instagram } from './Instagram'
import { InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/SocialIcons'

export function Nosotros() {
  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Nuestra comunidad
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-ink-500 sm:text-base">
          Conectamos con nuestra comunidad a través de las redes sociales y compartimos nuestra pasión por el pádel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Instagram */}
        <div>
          <Instagram />
        </div>

        {/* Relato del fundador */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink-900/5 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-lg sm:h-32 sm:w-32">
              <Image
                src="/images/instagram/cocha2.webp"
                alt="Luciano Forti, fundador de Punto Padel"
                fill
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-display text-2xl font-bold text-ink-900">
                Luciano Forti
              </h3>
              <p className="mt-1 text-sm font-semibold text-electric-600">
                Fundador de Punto Padel LF
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
            <p>
              En <span className="font-semibold text-ink-900">Punto Padel LF</span>, nuestra misión es ofrecer productos de la más alta calidad y asesoramiento personalizado a cada cliente. Somos apasionados del pádel y creemos en la cercanía con nuestra comunidad.
            </p>
            <p>
              Cada artículo que ves en nuestra tienda fue cuidadosamente seleccionado pensando en vos, en tu juego y en tu experiencia. Desde paletas hasta accesorios, todo pasa por un riguroso proceso de selección.
            </p>
            <p className="font-medium text-ink-900">
              ¡Gracias por ser parte de esta historia y por confiar en nosotros para acompañarte en cada punto!
            </p>
          </div>

          {/* Redes sociales grandes (reemplaza el bloque de texto) */}
          <div className="mt-6 flex flex-col items-center gap-4 border-t border-ink-900/5 pt-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
            {/* Instagram: degradado oficial */}
            <a
                href="https://www.instagram.com/puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Punto Padel"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:shadow-lg"
            >
                <InstagramIcon className="h-6 w-6" />
            </a>

            {/* TikTok: negro con acento cian */}
            <a
                href="https://www.tiktok.com/@puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Punto Padel"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-black hover:text-[#25F4EE] hover:shadow-[0_0_20px_rgba(37,244,238,0.6)]"
            >
                <TikTokIcon className="h-6 w-6" />
            </a>

            {/* Facebook: azul oficial */}
            <a
                href="https://www.facebook.com/puntopadel_lf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Punto Padel"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-white transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:shadow-lg"
            >
                <FacebookIcon className="h-6 w-6" />
            </a>
            </div>
            <span className="text-sm text-ink-500">Punto Padel LF</span>
          </div>
        </div>
      </div>
    </section>
  )
}