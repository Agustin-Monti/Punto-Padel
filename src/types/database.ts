export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3"
  }
  public: {
    Tables: {
      carrito: {
        Row: {
          cantidad: number
          created_at: string | null
          id: string
          producto_id: number
          talle: string | null
          user_id: string
        }
        Insert: {
          cantidad?: number
          created_at?: string | null
          id?: string
          producto_id: number
          talle?: string | null
          user_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string | null
          id?: string
          producto_id?: number
          talle?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carrito_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carrito_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos_catalogo"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          id: number
          imagen: string | null
          nombre: string
          slug: string | null
        }
        Insert: {
          id?: number
          imagen?: string | null
          nombre: string
          slug?: string | null
        }
        Update: {
          id?: number
          imagen?: string | null
          nombre?: string
          slug?: string | null
        }
        Relationships: []
      }
      comprobantes_transferencia: {
        Row: {
          banco: string | null
          creado_el: string | null
          email: string
          id: string
          monto: number
          nombre_completo: string
          numero_operacion: string | null
          pago_id: string | null
          url_comprobante: string
        }
        Insert: {
          banco?: string | null
          creado_el?: string | null
          email: string
          id?: string
          monto: number
          nombre_completo: string
          numero_operacion?: string | null
          pago_id?: string | null
          url_comprobante: string
        }
        Update: {
          banco?: string | null
          creado_el?: string | null
          email?: string
          id?: string
          monto?: number
          nombre_completo?: string
          numero_operacion?: string | null
          pago_id?: string | null
          url_comprobante?: string
        }
        Relationships: [
          {
            foreignKeyName: "comprobantes_transferencia_pago_id_fkey"
            columns: ["pago_id"]
            isOneToOne: false
            referencedRelation: "pagos"
            referencedColumns: ["id"]
          },
        ]
      }
      direcciones: {
        Row: {
          ciudad: string
          codigo_postal: string
          creada_el: string | null
          direccion: string
          id: string
          piso: string | null
          provincia: string
          user_id: string | null
        }
        Insert: {
          ciudad: string
          codigo_postal: string
          creada_el?: string | null
          direccion: string
          id?: string
          piso?: string | null
          provincia: string
          user_id?: string | null
        }
        Update: {
          ciudad?: string
          codigo_postal?: string
          creada_el?: string | null
          direccion?: string
          id?: string
          piso?: string | null
          provincia?: string
          user_id?: string | null
        }
        Relationships: []
      }
      favoritos: {
        Row: {
          created_at: string | null
          id: string
          producto_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          producto_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          producto_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoritos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos_catalogo"
            referencedColumns: ["id"]
          },
        ]
      }
      galeria_productos: {
        Row: {
          id: number
          imagen_galeria: string | null
          producto_id: number
        }
        Insert: {
          id?: number
          imagen_galeria?: string | null
          producto_id: number
        }
        Update: {
          id?: number
          imagen_galeria?: string | null
          producto_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "galeria_productos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "galeria_productos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos_catalogo"
            referencedColumns: ["id"]
          },
        ]
      }
      keep_alive: {
        Row: {
          id: number
          updated_at: string | null
        }
        Insert: {
          id: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      marcas: {
        Row: {
          id: number
          imagen: string | null
          nombre: string
          slug: string | null
        }
        Insert: {
          id?: number
          imagen?: string | null
          nombre: string
          slug?: string | null
        }
        Update: {
          id?: number
          imagen?: string | null
          nombre?: string
          slug?: string | null
        }
        Relationships: []
      }
      metodos_envios: {
        Row: {
          empresa: string
          id: number
          imagen: string | null
          peso_max: number | null
          precio_nacional: number | null
          precio_regional: number | null
        }
        Insert: {
          empresa: string
          id?: number
          imagen?: string | null
          peso_max?: number | null
          precio_nacional?: number | null
          precio_regional?: number | null
        }
        Update: {
          empresa?: string
          id?: number
          imagen?: string | null
          peso_max?: number | null
          precio_nacional?: number | null
          precio_regional?: number | null
        }
        Relationships: []
      }
      pagos: {
        Row: {
          apellido_comprador: string
          comprobante_transferencia_id: string | null
          created_at: string | null
          direccion: string
          dni: string
          email_comprador: string | null
          estado_pedido: string
          external_reference: string | null
          id: string
          id_transaccion: string | null
          metodo_empresa: string | null
          metodo_envio: string
          metodo_pago: string | null
          nombre_comprador: string
          preference_id: string | null
          producto_id: Json
          productos_comprados: string | null
          status: string
          stock_actualizado: boolean | null
          telefono: string
          total: number
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          apellido_comprador: string
          comprobante_transferencia_id?: string | null
          created_at?: string | null
          direccion: string
          dni: string
          email_comprador?: string | null
          estado_pedido: string
          external_reference?: string | null
          id?: string
          id_transaccion?: string | null
          metodo_empresa?: string | null
          metodo_envio: string
          metodo_pago?: string | null
          nombre_comprador: string
          preference_id?: string | null
          producto_id: Json
          productos_comprados?: string | null
          status: string
          stock_actualizado?: boolean | null
          telefono: string
          total: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          apellido_comprador?: string
          comprobante_transferencia_id?: string | null
          created_at?: string | null
          direccion?: string
          dni?: string
          email_comprador?: string | null
          estado_pedido?: string
          external_reference?: string | null
          id?: string
          id_transaccion?: string | null
          metodo_empresa?: string | null
          metodo_envio?: string
          metodo_pago?: string | null
          nombre_comprador?: string
          preference_id?: string | null
          producto_id?: Json
          productos_comprados?: string | null
          status?: string
          stock_actualizado?: boolean | null
          telefono?: string
          total?: number
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_comprobante_transferencia_id_fkey"
            columns: ["comprobante_transferencia_id"]
            isOneToOne: false
            referencedRelation: "comprobantes_transferencia"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          acabado: string | null
          ancho: string | null
          balance: string | null
          capacidad: string | null
          categoria_id: number
          color: string | null
          control: number | null
          created_at: string | null
          descripcion: string | null
          estado: string | null
          forma: string | null
          genero: string | null
          grupo_variantes: string | null
          id: number
          imagen: string | null
          imagenes: string[] | null
          juego: string | null
          largo: string | null
          marca_id: number | null
          marco: string | null
          material: string | null
          medidas: string | null
          modelo: string | null
          nombre: string
          nucleo: string | null
          oferta_activa: boolean | null
          origen: string | null
          peso: number | null
          potencia: number | null
          precio: number
          precio_oferta: number | null
          slug: string
          stock: number
          talle: string | null
          textura: string | null
          tipo_id: number
          updated_at: string | null
          valorado: boolean | null
        }
        Insert: {
          acabado?: string | null
          ancho?: string | null
          balance?: string | null
          capacidad?: string | null
          categoria_id: number
          color?: string | null
          control?: number | null
          created_at?: string | null
          descripcion?: string | null
          estado?: string | null
          forma?: string | null
          genero?: string | null
          grupo_variantes?: string | null
          id?: number
          imagen?: string | null
          imagenes?: string[] | null
          juego?: string | null
          largo?: string | null
          marca_id?: number | null
          marco?: string | null
          material?: string | null
          medidas?: string | null
          modelo?: string | null
          nombre: string
          nucleo?: string | null
          oferta_activa?: boolean | null
          origen?: string | null
          peso?: number | null
          potencia?: number | null
          precio: number
          precio_oferta?: number | null
          slug: string
          stock?: number
          talle?: string | null
          textura?: string | null
          tipo_id: number
          updated_at?: string | null
          valorado?: boolean | null
        }
        Update: {
          acabado?: string | null
          ancho?: string | null
          balance?: string | null
          capacidad?: string | null
          categoria_id?: number
          color?: string | null
          control?: number | null
          created_at?: string | null
          descripcion?: string | null
          estado?: string | null
          forma?: string | null
          genero?: string | null
          grupo_variantes?: string | null
          id?: number
          imagen?: string | null
          imagenes?: string[] | null
          juego?: string | null
          largo?: string | null
          marca_id?: number | null
          marco?: string | null
          material?: string | null
          medidas?: string | null
          modelo?: string | null
          nombre?: string
          nucleo?: string | null
          oferta_activa?: boolean | null
          origen?: string | null
          peso?: number | null
          potencia?: number | null
          precio?: number
          precio_oferta?: number | null
          slug?: string
          stock?: number
          talle?: string | null
          textura?: string | null
          tipo_id?: number
          updated_at?: string | null
          valorado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productos_marca_id_fkey"
            columns: ["marca_id"]
            isOneToOne: false
            referencedRelation: "marcas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "productos_tipo_id_fkey"
            columns: ["tipo_id"]
            isOneToOne: false
            referencedRelation: "tipo_productos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin: boolean | null
          apellido: string | null
          created_at: string
          dni: string | null
          email: string | null
          id: string
          nombre: string | null
          superadmin: boolean | null
          telefono: string | null
        }
        Insert: {
          admin?: boolean | null
          apellido?: string | null
          created_at?: string
          dni?: string | null
          email?: string | null
          id: string
          nombre?: string | null
          superadmin?: boolean | null
          telefono?: string | null
        }
        Update: {
          admin?: boolean | null
          apellido?: string | null
          created_at?: string
          dni?: string | null
          email?: string | null
          id?: string
          nombre?: string | null
          superadmin?: boolean | null
          telefono?: string | null
        }
        Relationships: []
      }
      tipo_productos: {
        Row: {
          categoria_id: number
          id: number
          nombre: string | null
          slug: string | null
        }
        Insert: {
          categoria_id: number
          id?: number
          nombre?: string | null
          slug?: string | null
        }
        Update: {
          categoria_id?: number
          id?: number
          nombre?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tipo_productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      productos_catalogo: {
        Row: {
          categoria_nombre: string | null
          categoria_slug: string | null
          color: string | null
          grupo_variantes: string | null
          id: number | null
          imagen: string | null
          marca_nombre: string | null
          marca_slug: string | null
          nombre: string | null
          oferta_activa: boolean | null
          precio: number | null
          precio_oferta: number | null
          slug: string | null
          stock: number | null
          tipo_nombre: string | null
          tipo_slug: string | null
          valorado: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      descontar_stock: {
        Args: { cantidad_comprada: number; pid: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
