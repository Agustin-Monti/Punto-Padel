// src/lib/utils.ts
import type { Database } from '@/types/database'

type ProductoCatalogo = Database['public']['Views']['productos_catalogo']['Row']

// Formatea precio en pesos argentinos (acepta null y devuelve "—" si no hay)
export function formatPrecio(precio: number | null): string {
  if (precio === null || precio === undefined) return '—'
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio)
}

// Devuelve el precio final (con oferta si aplica). Nunca devuelve null.
export function getPrecioFinal(
  producto: Pick<ProductoCatalogo, 'precio' | 'precio_oferta' | 'oferta_activa'>
): number {
  if (producto.oferta_activa && producto.precio_oferta !== null) {
    return producto.precio_oferta
  }
  return producto.precio ?? 0
}

// Devuelve el descuento en porcentaje (0 si no hay)
export function getDescuento(
  producto: Pick<ProductoCatalogo, 'precio' | 'precio_oferta' | 'oferta_activa'>
): number {
  if (!producto.oferta_activa || producto.precio_oferta === null) return 0
  if (producto.precio === null || producto.precio <= 0) return 0
  return Math.round(((producto.precio - producto.precio_oferta) / producto.precio) * 100)
}

// Verifica si hay stock (acepta null)
export function tieneStock(stock: number | null): boolean {
  return (stock ?? 0) > 0
}