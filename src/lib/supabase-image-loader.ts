// src/lib/supabase-image-loader.ts
export default function supabaseLoader({ src }: { src: string }) {
  // 1. Rutas locales de public/ → se sirven tal cual desde la raíz
  if (src.startsWith('/')) return src

  // 2. URLs completas (Supabase u otras) → se devuelven tal cual
  if (src.startsWith('http')) return src

  // 3. Rutas relativas de Supabase (ej: "productos/productos/archivo.png")
  const projectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}`
}