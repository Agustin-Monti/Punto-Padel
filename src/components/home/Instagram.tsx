// src/components/home/Instagram.tsx
import Image from 'next/image'

const USERNAME = 'puntopadel_lf'
const PROFILE_IMAGE = '/images/instagram/logo.webp'
const PROFILE_URL = `https://www.instagram.com/${USERNAME}`

const stats = {
  posts: 72,
  followers: 2145,
  following: 1728,
}

const recentPosts = [
  { id: '1', imageUrl: '/images/instagram/post1.webp', link: 'https://www.instagram.com/p/DIKe7WGvI0p/', alt: 'Nueva paleta de pádel', likes: 142, comments: 12 },
  { id: '2', imageUrl: '/images/instagram/post2.webp', link: 'https://www.instagram.com/p/DM0M5TouZn-/', alt: 'Clínica de pádel', likes: 85, comments: 8 },
  { id: '3', imageUrl: '/images/instagram/post3.webp', link: 'https://www.instagram.com/p/DNQW9z_uqam/', alt: 'Productos destacados', likes: 97, comments: 15 },
  { id: '4', imageUrl: '/images/instagram/post4.webp', link: 'https://www.instagram.com/p/DT-oe_CjuQ3/?img_index=1', alt: 'Torneo interno', likes: 203, comments: 24 },
  { id: '5', imageUrl: '/images/instagram/post5.webp', link: 'https://www.instagram.com/p/DS8kJ0ijgU0/', alt: 'Ofertas especiales', likes: 156, comments: 11 },
  { id: '6', imageUrl: '/images/instagram/post6.webp', link: 'https://www.instagram.com/p/DRr4B2ajs97/?img_index=1', alt: 'Nuevas zapatillas', likes: 189, comments: 19 },
]

function formatStat(n: number) {
  return n.toLocaleString('es-AR')
}

// --- Iconos SVG inline (sin dependencias) ---

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function HeartIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function CommentIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

// --- Componente ---

export function Instagram() {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink-900/5">
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-electric-500 sm:h-20 sm:w-20">
            <Image
              src={PROFILE_IMAGE}
              alt={`${USERNAME} en Instagram`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-bold text-ink-900">
              {USERNAME}
            </h3>
            <p className="text-sm text-ink-500">Punto Padel LF</p>
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600 hover:text-electric-700"
            >
              <InstagramIcon />
              Seguir
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 flex justify-around border-y border-ink-900/5 py-3">
          <div className="text-center">
            <p className="font-display text-lg font-bold text-ink-900">{formatStat(stats.posts)}</p>
            <p className="text-xs text-ink-500">Publicaciones</p>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-ink-900">{formatStat(stats.followers)}</p>
            <p className="text-xs text-ink-500">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-ink-900">{formatStat(stats.following)}</p>
            <p className="text-xs text-ink-500">Seguidos</p>
          </div>
        </div>
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-3 gap-0.5 bg-ink-900/5">
        {recentPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver publicación: ${post.alt}`}
            className="group relative aspect-square bg-white"
          >
            <Image
              src={post.imageUrl}
              alt={post.alt}
              fill
              sizes="(max-width: 1024px) 33vw, 150px"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-1 text-sm font-semibold">
                <HeartIcon />
                {post.likes}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold">
                <CommentIcon />
                {post.comments}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-ink-900/5 p-4 text-center">
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-electric-600 hover:text-electric-700"
        >
          <InstagramIcon />
          Ver perfil completo en Instagram
        </a>
      </div>
    </section>
  )
}