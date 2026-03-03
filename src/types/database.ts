// ─────────────────────────────────────────────────────────────
//  Supabase Table Row Types
//  Run `supabase gen types typescript` to auto-generate these
//  This is a manual version for initial development
// ─────────────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:               string
          full_name:        string
          avatar_url:       string | null
          preferred_locale: string
          plan:             'free' | 'pro' | 'enterprise'
          ai_credits_used:  number
          created_at:       string
          updated_at:       string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      resumes: {
        Row: {
          id:            string
          user_id:       string
          title:         string
          data:          Record<string, unknown>
          template_id:   string
          color_scheme:  Record<string, string>
          language:      string
          is_public:     boolean
          public_slug:   string | null
          thumbnail_url: string | null
          ats_score:     number | null
          created_at:    string
          updated_at:    string
        }
        Insert: Omit<Database['public']['Tables']['resumes']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['resumes']['Insert']>
      }
      ai_suggestions: {
        Row: {
          id:               string
          resume_id:        string
          type:             'tailor' | 'improve' | 'generate'
          job_description:  string | null
          original_content: Record<string, unknown>
          suggestions:      Record<string, unknown>
          applied:          boolean
          created_at:       string
        }
        Insert: Omit<Database['public']['Tables']['ai_suggestions']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['ai_suggestions']['Insert']>
      }
    }
  }
}
