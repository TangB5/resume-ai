-- ─────────────────────────────────────────────────────────────
--  ResuMaster AI — Supabase Schema
--  Run in: Supabase Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- for text search

-- ── profiles ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                uuid         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name         text         NOT NULL DEFAULT '',
  avatar_url        text,
  preferred_locale  text         NOT NULL DEFAULT 'en'
                                 CHECK (preferred_locale IN ('en','fr','es','ar')),
  plan              text         NOT NULL DEFAULT 'free'
                                 CHECK (plan IN ('free','pro','enterprise')),
  ai_credits_used   integer      NOT NULL DEFAULT 0,
  created_at        timestamptz  NOT NULL DEFAULT now(),
  updated_at        timestamptz  NOT NULL DEFAULT now()
);

-- ── resumes ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.resumes (
  id            uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid         NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title         text         NOT NULL DEFAULT 'My Resume',
  data          jsonb        NOT NULL DEFAULT '{}',
  template_id   text         NOT NULL DEFAULT 'modern'
                             CHECK (template_id IN ('creative','simple','modern','professional')),
  color_scheme  jsonb        NOT NULL DEFAULT '{}',
  language      text         NOT NULL DEFAULT 'en',
  is_public     boolean      NOT NULL DEFAULT false,
  public_slug   text         UNIQUE,
  thumbnail_url text,
  ats_score     integer      CHECK (ats_score >= 0 AND ats_score <= 100),
  created_at    timestamptz  NOT NULL DEFAULT now(),
  updated_at    timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX idx_resumes_user_id    ON public.resumes(user_id);
CREATE INDEX idx_resumes_public_slug ON public.resumes(public_slug) WHERE public_slug IS NOT NULL;

-- ── ai_suggestions ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ai_suggestions (
  id               uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id        uuid         NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  type             text         NOT NULL CHECK (type IN ('tailor','improve','generate')),
  job_description  text,
  original_content jsonb        NOT NULL DEFAULT '{}',
  suggestions      jsonb        NOT NULL DEFAULT '{}',
  applied          boolean      NOT NULL DEFAULT false,
  created_at       timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_suggestions_resume_id ON public.ai_suggestions(resume_id);

-- ── resume_versions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.resume_versions (
  id          uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id   uuid         NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  version     integer      NOT NULL,
  data        jsonb        NOT NULL,
  created_at  timestamptz  NOT NULL DEFAULT now()
);

-- ── Triggers ──────────────────────────────────────────────────

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_versions ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles: own rows only"
  ON public.profiles FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Resumes: owner full access
CREATE POLICY "resumes: owner full access"
  ON public.resumes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Resumes: public slugs readable by anyone
CREATE POLICY "resumes: public read by slug"
  ON public.resumes FOR SELECT
  USING (is_public = true);

-- AI suggestions: owner only
CREATE POLICY "ai_suggestions: owner only"
  ON public.ai_suggestions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.resumes r
      WHERE r.id = resume_id AND r.user_id = auth.uid()
    )
  );

-- Resume versions: owner only
CREATE POLICY "resume_versions: owner only"
  ON public.resume_versions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.resumes r
      WHERE r.id = resume_id AND r.user_id = auth.uid()
    )
  );

-- ── Storage Buckets (run these too) ───────────────────────────
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true);
