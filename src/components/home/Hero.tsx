// src/components/home/Hero.tsx
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type SlideType = 'imagen' | 'video'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [slideActivo, setSlideActivo] = useState<SlideType>('imagen')
  const [videoListo, setVideoListo] = useState(false)
  const [esDesktop, setEsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setEsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setEsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const conn = (navigator as any).connection
    const esLenta =
      conn?.effectiveType === 'slow-2g' ||
      conn?.effectiveType === '2g' ||
      conn?.saveData === true
    if (esLenta) return

    const cargar = () => {
      const video = videoRef.current
      if (!video) return
      video.load()
    }

    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(cargar, { timeout: 3000 })
      return () => (window as any).cancelIdleCallback(id)
    } else {
      const id = setTimeout(cargar, 2000)
      return () => clearTimeout(id)
    }
  }, [])

  useEffect(() => {
    if (!videoListo) return
    if (slideActivo === 'imagen') {
      const timer = setTimeout(() => {
        const video = videoRef.current
        if (!video) return
        video.currentTime = 0
        video.play().catch(() => {})
        setSlideActivo('video')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [videoListo, slideActivo])

  const handleVideoEnded = () => setSlideActivo('imagen')

  const poster = esDesktop
    ? '/images/hero-poster-desktop.webp'
    : '/images/hero-poster-mobile.webp'

  // Móvil: 5/6 con min-h 65vh (como antes)
  // Tablet (sm): altura 420px
  // Desktop chico (lg, 1024–1535): altura 380px → cerca de 4:1, sin recorte fuerte
  // Desktop grande (xl, ≥1536): altura 620px → más protagonismo
  const mediaClasses =
    'w-full object-cover object-center aspect-[5/6] min-h-[65vh] sm:aspect-auto sm:min-h-[420px] lg:min-h-[380px] xl:min-h-[620px]'

  return (
    <section className="relative -mt-6 mb-8 w-screen ml-[calc(50%-50vw)] overflow-hidden sm:-mt-8 sm:mb-12">
      {/* Slide Imagen (LCP) */}
      <div
        className={`transition-opacity duration-700 ${
          slideActivo === 'imagen' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ position: slideActivo === 'video' ? 'absolute' : 'relative', inset: 0 }}
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/baner3-desktop.webp" />
          <img
            src="/images/baner3-mobile.webp"
            alt="Punto Padel"
            fetchPriority="high"
            className={mediaClasses}
          />
        </picture>
      </div>

      {/* Slide Video */}
      <div
        className={`transition-opacity duration-700 ${
          slideActivo === 'video' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ position: slideActivo === 'video' ? 'relative' : 'absolute', inset: 0 }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="none"
          poster={poster}
          onCanPlay={() => setVideoListo(true)}
          onEnded={handleVideoEnded}
          className={mediaClasses}
        >
          <source src="/images/video-promocional-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/images/video-promocional-desktop.mp4" type="video/mp4" media="(min-width: 768px)" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Contenido con padding inferior escalado por breakpoint */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8 sm:p-8 sm:pb-10 lg:p-10 lg:pb-6 xl:p-16 xl:pb-20">
        <div className="hidden sm:block">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl lg:text-6xl xl:text-8xl">
            Tu próximo partido<br className="hidden lg:block" /> empieza acá
          </h1>
          <p className="mt-2 max-w-xl text-base text-white/90 sm:mt-3 sm:text-lg xl:mt-4 xl:text-2xl">
            Las mejores paletas de pádel, al mejor precio.
          </p>
        </div>

        <Link
          href="/productos"
          className="mt-3 inline-flex w-fit items-center justify-center rounded-full bg-electric-600 px-6 py-2.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-electric-700 hover:shadow-2xl sm:mt-4 sm:px-8 sm:py-3 sm:text-base xl:mt-6 xl:px-10 xl:py-4 xl:text-lg"
        >
          Ver catálogo
        </Link>
      </div>
    </section>
  )
}