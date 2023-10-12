export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          area: string
          category: string
          description: string
          id: number
          military: boolean
          name: string
          need_help: boolean
          phones: string[]
          subcategory: string
          time: string
          urgency: number
        }
        Insert: {
          area: string
          category: string
          description: string
          id?: never
          military: boolean
          name: string
          need_help: boolean
          phones: string[]
          subcategory: string
          time: string
          urgency: number
        }
        Update: {
          area?: string
          category?: string
          description?: string
          id?: never
          military?: boolean
          name?: string
          need_help?: boolean
          phones?: string[]
          subcategory?: string
          time?: string
          urgency?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
