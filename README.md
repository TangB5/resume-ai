# ResuMaster AI

> **AI-powered resume builder** — parse, tailor, design, and share professional resumes in minutes.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%2B%20Auth-3ECF8E?logo=supabase)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google)](https://aistudio.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Features](#3-features)
4. [Project Structure](#4-project-structure)
5. [Prerequisites](#5-prerequisites)
6. [Step 1 — Project Setup](#6-step-1--project-setup)
7. [Step 2 — Auth System](#7-step-2--auth-system)
8. [Step 3 — Onboarding Wizard](#8-step-3--onboarding-wizard) *(coming)*
9. [Step 4 — Live Editor & Templates](#9-step-4--live-editor--templates) *(coming)*
10. [Step 5 — AI Features](#10-step-5--ai-features) *(coming)*
11. [Step 6 — Export & Sharing](#11-step-6--export--sharing) *(coming)*
12. [Step 7 — Dashboard](#12-step-7--dashboard) *(coming)*
13. [Step 8 — Deployment](#13-step-8--deployment) *(coming)*
14. [Database Schema](#14-database-schema)
15. [Environment Variables](#15-environment-variables)
16. [API Reference](#16-api-reference)
17. [AI Prompt Strategy](#17-ai-prompt-strategy)
18. [Internationalization](#18-internationalization)
19. [Contributing](#19-contributing)

---

## 1. Overview

ResuMaster AI is a full-stack SaaS application that lets users build, customize, and share professional resumes. It uses **Gemini 2.5 Flash** to parse uploaded PDFs, tailor resumes to specific job descriptions, and improve individual bullet points — all in a live split-panel editor with four distinct template styles.

### What it does

| Capability | Description |
|---|---|
| **AI Parsing** | Upload a PDF or DOCX — Gemini extracts all your data into structured JSON |
| **Job Tailoring** | Paste a job description — AI performs gap analysis and suggests targeted edits |
| **Bullet Improver** | One-click rewrites using the XYZ achievement formula |
| **Live Editor** | Edit directly on the resume preview with auto-save and undo/redo |
| **4 Templates** | Creative, Simple, Modern, Professional — all with color scheme customization |
| **Public Share** | Generate a unique URL to share your resume as a hosted web page |
| **PDF / PNG Export** | High-DPI export at 3× scale using html2canvas + jsPDF |
| **Multi-language** | Full i18n for EN, FR, ES, AR — including RTL layout support |

---

## 2. Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `next` | 14+ | App Router, Server Components, Server Actions |
| `tailwindcss` | 3.x | Utility-first styling |
| `framer-motion` | latest | Page transitions, micro-animations |
| `lucide-react` | 0.x | Icon library |
| `clsx` + `tailwind-merge` | latest | Conditional class merging |

### Backend / Database
| Package | Version | Purpose |
|---|---|---|
| `@supabase/supabase-js` | latest | Database, Auth, Storage client |
| `@supabase/ssr` | latest | Server-side session handling with Next.js |

### AI Engine
| Package | Version | Purpose |
|---|---|---|
| `@google/generative-ai` | latest | Gemini 2.5 Flash — parsing, tailoring, improving |

### State & Data
| Package | Version | Purpose |
|---|---|---|
| `zustand` + `immer` | latest | Global editor state with undo/redo history |
| `@tanstack/react-query` | v5 | Server state caching and synchronization |
| `react-hook-form` + `zod` | latest | Form state and runtime validation |

### Utilities
| Package | Version | Purpose |
|---|---|---|
| `next-intl` | latest | i18n routing and translations |
| `@dnd-kit/sortable` | latest | Drag-to-reorder resume sections |
| `html2canvas` + `jspdf` | latest | PDF and PNG export |
| `pdf-parse` + `mammoth` | latest | Server-side PDF and DOCX text extraction |
| `nanoid` | latest | URL-safe public share slugs |
| `date-fns` | latest | Date formatting |

---

## 3. Features

### Multi-source Onboarding
- **Option A — Upload:** Drop a PDF or DOCX. Gemini extracts name, contact info, every job, education, skills, and projects into structured JSON. You review and confirm before saving.
- **Option B — LinkedIn:** Paste your LinkedIn profile URL. A server-side scraper extracts public profile data (or use the manual form as fallback).
- **Option C — Smart Form:** Section-by-section guided form with live mini-preview.

### AI-Powered Customization
- **Tailor to Job Offer:** Paste any job description. Gemini returns an ATS score (0–100), lists missing keywords, and generates field-level suggestions with `fieldPath` references so the UI can highlight exactly what to change.
- **Bullet Point Improver:** Rewrites individual bullets using the XYZ formula — *Accomplished [X] as measured by [Y] by doing [Z]* — with two alternative phrasings and an explanation.
- **Summary Generator:** Creates a 2–3 sentence professional summary calibrated to a target role and tone (executive / technical / creative / balanced).

### Live Editor
- Split-pane layout: form controls on the left, live A4 preview on the right
- Click any text on the preview to edit it in place
- AI sidebar slides in from the right (Framer Motion `AnimatePresence`)
- Zustand store with 50-step undo/redo history (Ctrl/Cmd + Z / Shift + Z)
- 1.5-second debounced auto-save to Supabase

### Templates
| ID | Style | Description |
|---|---|---|
| `modern` | Clean lines, sidebar layout | 30% sidebar + 70% main, accent color header bar |
| `professional` | Executive, traditional | Classic single-column, gold accent |
| `creative` | Bold, asymmetric | Color blocks, unique section arrangement |
| `simple` | Minimalist | Pure typography, maximum whitespace |

### Sharing & Export
- Toggle a resume public → generates a `nanoid(10)` slug → hosted at `/r/[slug]`
- Public page renders the full template with SSR + og:image meta tags
- PDF export: html2canvas at 3× DPI → jsPDF A4, multi-page support
- PNG export: html2canvas at 2× DPI → direct download

---

## 4. Project Structure

```
resumaster-ai/
├── src/
│   ├── app/
│   │   ├── [locale]/                   # i18n root (next-intl)
│   │   │   ├── layout.tsx              # Root layout with providers
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── (auth)/                 # Auth route group
│   │   │   │   ├── layout.tsx          # Split-panel auth layout
│   │   │   │   ├── actions.ts          # Server actions: signIn, signUp, OAuth, signOut
│   │   │   │   ├── login/page.tsx      # Login page
│   │   │   │   ├── signup/page.tsx     # Signup page
│   │   │   │   └── forgot-password/    # Password reset request
│   │   │   ├── (app)/                  # Protected app shell
│   │   │   │   ├── layout.tsx          # Sidebar + auth guard
│   │   │   │   ├── dashboard/page.tsx  # Bento grid dashboard
│   │   │   │   ├── resume/
│   │   │   │   │   ├── new/page.tsx    # Onboarding wizard
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx    # Live editor
│   │   │   │   │       └── preview/   # Full-screen preview
│   │   │   │   └── settings/page.tsx
│   │   │   └── r/[slug]/page.tsx       # Public share URL
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   ├── parse-resume/route.ts
│   │   │   │   ├── tailor/route.ts
│   │   │   │   ├── improve/route.ts
│   │   │   │   └── generate-summary/route.ts
│   │   │   └── resume/
│   │   │       ├── route.ts            # CRUD
│   │   │       └── [id]/
│   │   │           ├── export/route.ts
│   │   │           └── share/route.ts
│   │   ├── auth/callback/route.ts      # OAuth + email confirm handler
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                         # Primitives: Button, Input, Modal
│   │   ├── auth/
│   │   │   ├── AuthBackground.tsx      # Animated orb background
│   │   │   ├── AuthInput.tsx           # Input + icons + password toggle
│   │   │   └── AuthLayout.tsx          # Split-panel layout component
│   │   ├── editor/
│   │   │   ├── LiveEditor.tsx          # Main editor orchestrator
│   │   │   ├── EditableField.tsx       # Click-to-edit text field
│   │   │   ├── SectionBlock.tsx        # Experience / Education / etc.
│   │   │   ├── BulletEditor.tsx        # Bullet list with AI improve button
│   │   │   ├── AIImproveSidebar.tsx    # Slide-in AI panel
│   │   │   └── ToolbarTop.tsx          # Template switcher, export, share
│   │   ├── templates/
│   │   │   ├── TemplateModern.tsx
│   │   │   ├── TemplateProfessional.tsx
│   │   │   ├── TemplateCreative.tsx
│   │   │   └── TemplateSimple.tsx
│   │   ├── onboarding/
│   │   │   ├── WizardShell.tsx
│   │   │   ├── UploadStep.tsx
│   │   │   ├── LinkedInStep.tsx
│   │   │   └── FormStep.tsx
│   │   ├── dashboard/
│   │   │   ├── BentoGrid.tsx
│   │   │   └── ResumeCard.tsx
│   │   └── shared/
│   │       ├── LanguageSwitcher.tsx
│   │       └── ExportMenu.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts               # Browser Supabase client
│   │   │   ├── server.ts               # Server Supabase client
│   │   │   └── middleware.ts           # Session refresh
│   │   ├── gemini/
│   │   │   ├── client.ts               # Gemini SDK + retry wrapper
│   │   │   └── prompts.ts              # All prompt templates
│   │   ├── export/
│   │   │   └── pdf.ts                  # html2canvas + jsPDF
│   │   └── utils/
│   │       ├── cn.ts                   # clsx + twMerge helper
│   │       └── resume.ts               # createEmptyResume, parsedToResume
│   ├── hooks/
│   │   ├── useResume.ts
│   │   ├── useAI.ts
│   │   └── useExport.ts
│   ├── stores/
│   │   └── resumeStore.ts              # Zustand editor store (undo/redo)
│   ├── types/
│   │   ├── resume.ts                   # ResumeData, all domain types
│   │   └── database.ts                 # Supabase table row types
│   ├── i18n.ts                         # next-intl config
│   └── middleware.ts                   # Auth guard + i18n routing
├── messages/
│   ├── en.json
│   ├── fr.json
│   ├── es.json
│   └── ar.json
├── supabase/
│   └── schema.sql                      # Full DB schema + RLS policies
├── setup.sh                            # One-command project bootstrap
├── .env.local                          # Your secrets (git-ignored)
├── .env.example                        # Template for team members
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── .prettierrc
```

---

## 5. Prerequisites

Before starting, ensure you have:

| Tool | Minimum Version | Install |
|---|---|---|
| **Node.js** | 18.x LTS | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x | Bundled with Node |
| **Git** | 2.x | [git-scm.com](https://git-scm.com) |

You will also need accounts on:

- [**Supabase**](https://supabase.com) — free tier is sufficient for development
- [**Google AI Studio**](https://aistudio.google.com) — for your Gemini API key
- [**Google Cloud Console**](https://console.cloud.google.com) — for Google OAuth credentials (optional but recommended)

---

## 6. Step 1 — Project Setup

This step bootstraps the entire project: Next.js 14, all dependencies, folder structure, config files, TypeScript types, Supabase clients, Gemini integration, Zustand store, i18n messages, and the SQL schema.

### 6.1 Run the setup script

```bash
# Download (or copy) setup.sh into any empty directory
chmod +x setup.sh
./setup.sh
```

The script takes approximately 2–3 minutes. It will:

1. Verify Node 18+, npm, and git are installed
2. Create a new Next.js 14 project with App Router, TypeScript, Tailwind, `--src-dir`
3. Install all production and dev dependencies
4. Scaffold the complete folder structure
5. Write `tailwind.config.ts`, `tsconfig.json`, `next.config.ts`, `.prettierrc`
6. Set up `next-intl` with `src/i18n.ts` and translation files for EN, FR, ES, AR
7. Create all TypeScript type definitions (`resume.ts`, `database.ts`)
8. Write the three Supabase client files (browser, server, middleware)
9. Write `src/middleware.ts` combining auth guard and i18n routing
10. Write the Gemini client with exponential-backoff retry and all prompt templates
11. Write utility helpers (`cn`, `createEmptyResume`, `exportToPDF`, `exportToPNG`)
12. Create the Zustand editor store with 50-step undo/redo history
13. Drop placeholder pages so the project builds without errors
14. Write `supabase/schema.sql` with all tables, indexes, triggers, and RLS policies
15. Run `git init` with an initial commit

### 6.2 Set up Supabase

1. Go to [app.supabase.com](https://app.supabase.com) → **New Project**
2. Choose a name, strong database password, and nearest region
3. Once the project is ready, go to **SQL Editor → New Query**
4. Copy the contents of `supabase/schema.sql` and click **Run**
5. Go to **Storage → New Bucket** and create three buckets:

   | Name | Public |
   |---|---|
   | `resumes` | No |
   | `avatars` | Yes |
   | `thumbnails` | Yes |

6. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon` / `public` key
   - `service_role` key *(keep this secret — server-side only)*

### 6.3 Get your Gemini API key

1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create API key** → select your Google Cloud project
3. Copy the key

### 6.4 Fill in `.env.local`

Open `.env.local` in the project root and replace the placeholder values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Gemini AI
GEMINI_API_KEY=AIzaSy...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6.5 Start the dev server

```bash
cd resumaster-ai
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) — you should see the landing page.

### 6.6 What was generated

After Step 1, your project has:

```
✓ Next.js 14 App Router with TypeScript strict mode
✓ Tailwind CSS with custom design tokens and animations
✓ Supabase browser + server clients (SSR-compatible)
✓ Middleware combining auth guard + i18n locale routing
✓ Gemini 2.5 Flash client with retry/backoff wrapper
✓ All prompt templates (parse, tailor, improve, generate-summary)
✓ Zustand store with immer + 50-step undo/redo
✓ next-intl with EN / FR / ES / AR translation files
✓ Full TypeScript types for all domain objects
✓ supabase/schema.sql ready to run
✓ .env.local template ready to fill
✓ Git repo with clean initial commit
```

---

## 7. Step 2 — Auth System

This step implements the complete authentication UI: login, signup, forgot password, Google OAuth, and the OAuth callback handler.

### 7.1 Files to create

Copy each file below into your project at the path shown:

| Source file | Destination |
|---|---|
| `globals.css` | `src/app/globals.css` — replace entirely |
| `src/app/actions.ts` | `src/app/actions.ts` — replace placeholder |
| `src/app/auth/callback/route.ts` | `src/app/auth/callback/route.ts` |
| `src/components/auth/AuthBackground.tsx` | Same path |
| `src/components/auth/AuthInput.tsx` | Same path |
| `src/components/auth/AuthLayout.tsx` | `src/app/[locale]/(auth)/layout.tsx` |
| `pages/login/page.tsx` | `src/app/[locale]/(auth)/login/page.tsx` |
| `pages/signup/page.tsx` | `src/app/[locale]/(auth)/signup/page.tsx` |
| `pages/forgot-password/page.tsx` | `src/app/[locale]/(auth)/forgot-password/page.tsx` |

### 7.2 Set up Google OAuth (optional but recommended)

**Google Cloud Console:**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select your project → **APIs & Services → Credentials**
3. **Create Credentials → OAuth Client ID**
4. Application type: **Web application**
5. Add to **Authorized redirect URIs**:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** and **Client Secret**

**Supabase Dashboard:**

1. **Authentication → Providers → Google**
2. Toggle **Enable**
3. Paste your Client ID and Client Secret → **Save**

**Supabase URL Configuration:**

1. **Authentication → URL Configuration**
2. **Site URL:** `http://localhost:3000`
3. **Redirect URLs:** add `http://localhost:3000/auth/callback`

### 7.3 Server actions overview

All auth logic lives in `src/app/actions.ts` as Next.js Server Actions:

| Action | Trigger | Behavior |
|---|---|---|
| `signUpAction` | Signup form | Validates → `supabase.auth.signUp()` → sends confirmation email |
| `signInAction` | Login form | `signInWithPassword()` → on success redirects to `/en/dashboard` |
| `signInWithGoogleAction` | OAuth button | Returns redirect URL → client does `window.location.href` |
| `signOutAction` | Nav button | `supabase.auth.signOut()` → redirects to `/en/login` |
| `forgotPasswordAction` | Reset form | `resetPasswordForEmail()` → always returns success (anti-enumeration) |

### 7.4 How the auth flow works end-to-end

```
User fills form
      ↓
Server Action validates input
      ↓
Supabase Auth processes request
      ↓
  ┌───────────────────────────────────┐
  │ Email/Password signup             │
  │   → Confirmation email sent      │
  │   → User clicks link             │
  │   → /auth/callback?code=xxx      │
  │   → exchangeCodeForSession()     │
  │   → redirect to /en/dashboard    │
  └───────────────────────────────────┘
  ┌───────────────────────────────────┐
  │ Google OAuth                     │
  │   → signInWithOAuth()            │
  │   → redirect to Google           │
  │   → Google redirects to Supabase │
  │   → Supabase redirects to        │
  │     /auth/callback?code=xxx      │
  │   → exchangeCodeForSession()     │
  │   → redirect to /en/dashboard    │
  └───────────────────────────────────┘
```

### 7.5 Auth middleware protection

`src/middleware.ts` runs on every request and:
1. Calls `updateSession()` to refresh the Supabase JWT silently
2. Checks if the path is in `PROTECTED_PATHS` (`/dashboard`, `/resume`, `/settings`)
3. If the user is not authenticated, redirects to `/{locale}/login`
4. Applies i18n locale routing via `next-intl/middleware`

### 7.6 What was built

```
✓ Email/password signup with Supabase confirmation email
✓ Email/password signin with friendly mapped error messages
✓ Google OAuth (one-click, full PKCE redirect flow)
✓ Forgot password — reset email with anti-enumeration protection
✓ /auth/callback route for OAuth and email confirmation
✓ Password strength meter (4 levels, color-coded, with hints)
✓ Show/hide password toggle on all password fields
✓ Error display: server action errors + URL errors from OAuth
✓ Auto-profile creation via Supabase database trigger
✓ Session refresh middleware (no manual token management needed)
✓ Auth-guarded route protection
✓ Animated split-panel layout (brand panel left, form right)
✓ Mobile-responsive (brand panel hidden, stacked layout)
✓ Staggered CSS entrance animations
✓ WCAG-compliant focus rings and ARIA labels
```

### 7.7 Test your auth flow

```bash
npm run dev

# Signup
open http://localhost:3000/en/signup
# → Fill form → check email → click confirmation link → lands on /en/dashboard

# Login
open http://localhost:3000/en/login
# → Fill credentials → redirects to /en/dashboard

# Forgot password
open http://localhost:3000/en/forgot-password
# → Enter email → success screen shown

# Auth guard
open http://localhost:3000/en/dashboard  # while signed out
# → Redirects to /en/login
```

---

## 8. Step 3 — Onboarding Wizard

> **Status: Coming next**

Will implement:
- Multi-step animated wizard shell (`WizardShell.tsx`) with Framer Motion step transitions and a progress indicator
- **Option A:** PDF/DOCX file upload → server-side text extraction (pdf-parse + mammoth) → Gemini parse-resume API → review screen
- **Option B:** LinkedIn URL input → server-side scraper → structured data extraction
- **Option C:** Smart section-by-section form with Zod validation and live mini-preview
- Review step where users confirm/edit all extracted data before saving to Supabase

---

## 9. Step 4 — Live Editor & Templates

> **Status: Coming**

Will implement:
- All 4 resume templates as pixel-perfect A4 React components (794px width)
- `EditableField` with click-to-edit, contentEditable, and keyboard accessibility
- Drag-to-reorder bullets and sections using `@dnd-kit/sortable`
- Color scheme picker (predefined palettes, live CSS variable injection)
- Auto-save with 1.5s debounce, optimistic UI, Supabase upsert
- `ToolbarTop` with template switcher, zoom, export menu, share toggle, undo/redo

---

## 10. Step 5 — AI Features

> **Status: Coming**

Will implement:
- `AIImproveSidebar` slide-in drawer (Framer Motion `AnimatePresence`)
- Job description textarea → Tailor button → diff view (original vs suggested)
- Per-bullet "✨ Improve" micro-interaction with accept/reject UI
- ATS score widget with animated score reveal and category breakdown
- AI credit system with monthly limits by plan (free: 10, pro: 100)

---

## 11. Step 6 — Export & Sharing

> **Status: Coming**

Will implement:
- `exportToPDF()` — html2canvas at 3× DPI → jsPDF A4, automatic multi-page
- `exportToPNG()` — html2canvas at 2× DPI → direct download
- Public share URL: `nanoid(10)` slug → `/r/[slug]` SSR page
- OpenGraph image generation for social previews
- Auto-generated PNG thumbnail stored in Supabase Storage

---

## 12. Step 7 — Dashboard

> **Status: Coming**

Will implement:
- Bento grid with Framer Motion staggered card reveals
- Resume thumbnail cards (generated PNG previews)
- Stats widgets (total views, downloads, ATS score history)
- Quick-action: create new, duplicate, delete, toggle public

---

## 13. Step 8 — Deployment

> **Status: Coming**

Will cover:
- Vercel production deployment with environment variable setup
- Supabase production project configuration
- Custom domain setup
- Performance: Next.js Image optimization, bundle analysis
- Monitoring: Sentry error tracking, PostHog analytics
- End-to-end testing with Playwright

---

## 14. Database Schema

All tables live in the `public` schema with Row Level Security enabled.

### `profiles`
Extends `auth.users`. Created automatically via a trigger when a user signs up.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` PK | References `auth.users(id)` |
| `full_name` | `text` | Display name |
| `avatar_url` | `text` | Storage bucket path |
| `preferred_locale` | `text` | `en` / `fr` / `es` / `ar` |
| `plan` | `text` | `free` / `pro` / `enterprise` |
| `ai_credits_used` | `integer` | Monthly AI call counter |
| `created_at` | `timestamptz` | Auto-set |
| `updated_at` | `timestamptz` | Auto-updated via trigger |

### `resumes`
Core resume document. Stores the full `ResumeData` JSON.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` PK | `gen_random_uuid()` |
| `user_id` | `uuid` FK | References `profiles(id)` — cascade delete |
| `title` | `text` | e.g. "Senior Dev CV" |
| `data` | `jsonb` | Full `ResumeData` object |
| `template_id` | `text` | `creative` / `simple` / `modern` / `professional` |
| `color_scheme` | `jsonb` | `{ primary, accent, background, text }` |
| `language` | `text` | Content language code |
| `is_public` | `boolean` | Public share enabled |
| `public_slug` | `text` UNIQUE | `nanoid(10)` share key |
| `thumbnail_url` | `text` | Auto-generated PNG preview |
| `ats_score` | `integer` | Last AI ATS analysis score (0–100) |
| `created_at` | `timestamptz` | — |
| `updated_at` | `timestamptz` | Auto-updated via trigger |

### `ai_suggestions`
Persists every AI interaction for history and undo support.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` PK | — |
| `resume_id` | `uuid` FK | References `resumes(id)` — cascade delete |
| `type` | `text` | `tailor` / `improve` / `generate` |
| `job_description` | `text` | Input for tailor requests |
| `original_content` | `jsonb` | Snapshot of resume before AI changes |
| `suggestions` | `jsonb` | Array of suggested edits |
| `applied` | `boolean` | Whether the user accepted changes |
| `created_at` | `timestamptz` | — |

### `resume_versions`
Point-in-time snapshots for version history.

| Column | Type | Description |
|---|---|---|
| `id` | `uuid` PK | — |
| `resume_id` | `uuid` FK | References `resumes(id)` — cascade delete |
| `version` | `integer` | Monotonically increasing version number |
| `data` | `jsonb` | Full `ResumeData` snapshot |
| `created_at` | `timestamptz` | — |

### RLS Policies

| Table | Policy | Condition |
|---|---|---|
| `profiles` | All operations | `auth.uid() = id` |
| `resumes` | All operations | `auth.uid() = user_id` |
| `resumes` | Public SELECT | `is_public = true` |
| `ai_suggestions` | All operations | Owner via join on `resumes` |
| `resume_versions` | All operations | Owner via join on `resumes` |

---

## 15. Environment Variables

```bash
# ── Supabase ────────────────────────────────────────────────
# Project URL — safe to expose (prefixed NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co

# Anon/public key — safe to expose (used in browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Service role key — NEVER expose. Server-side only.
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# ── Gemini AI ───────────────────────────────────────────────
# Server-side only — never prefix with NEXT_PUBLIC_
GEMINI_API_KEY=AIzaSy...

# ── App ─────────────────────────────────────────────────────
# Full URL including protocol — used for OAuth redirect construction
NEXT_PUBLIC_APP_URL=http://localhost:3000   # dev
# NEXT_PUBLIC_APP_URL=https://resumaster.ai  # production

# ── Stripe (Phase 5 — monetization) ────────────────────────
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

> **Security note:** `SUPABASE_SERVICE_ROLE_KEY` and `GEMINI_API_KEY` must **never** be prefixed with `NEXT_PUBLIC_`. They are only accessed in Server Components, Route Handlers, and Server Actions — never in the browser bundle.

---

## 16. API Reference

All API routes live under `src/app/api/`. Each is a Next.js Route Handler.

### `POST /api/ai/parse-resume`
Accepts a PDF or DOCX file, extracts text server-side, and sends it to Gemini.

**Request:** `multipart/form-data` with a `file` field

**Response:**
```json
{
  "personal": { "firstName": "...", "email": "..." },
  "experience": [{ "company": "...", "bullets": ["..."] }],
  "education": [],
  "skills": [],
  "detectedLanguage": "en"
}
```

### `POST /api/ai/tailor`
Runs a gap analysis between a resume and a job description.

**Request body:**
```json
{
  "resumeId": "uuid",
  "jobDescription": "We are looking for a Senior Engineer..."
}
```

**Response:**
```json
{
  "atsScore": 58,
  "projectedScore": 81,
  "missingKeywords": ["TypeScript", "CI/CD", "system design"],
  "suggestions": [
    {
      "section": "experience",
      "fieldPath": "experience.0.bullets.1",
      "original": "Worked on backend APIs",
      "improved": "Architected and maintained 12 TypeScript REST APIs...",
      "reason": "Adds missing keyword 'TypeScript' and quantifies scope",
      "keyword": "TypeScript"
    }
  ]
}
```

### `POST /api/ai/improve`
Rewrites a single bullet point using the XYZ formula.

**Request body:**
```json
{
  "bullet": "Responsible for managing the team",
  "context": "Engineering Manager at a fintech startup"
}
```

**Response:**
```json
{
  "improved": "Led 8-person engineering team, reducing deployment cycle time by 40%",
  "alternatives": [
    "Managed cross-functional team of 8, shipping 3 major product features per quarter",
    "Directed engineering org of 8, achieving 99.9% uptime across all production services"
  ],
  "explanation": "Replaced weak 'responsible for' with 'Led', added team size and quantified outcome"
}
```

### `POST /api/ai/generate-summary`
Generates a professional summary calibrated to a target role.

**Request body:**
```json
{
  "resumeId": "uuid",
  "targetRole": "Senior Product Manager",
  "tone": "balanced"
}
```

---

## 17. AI Prompt Strategy

All prompts live in `src/lib/gemini/prompts.ts`. Every prompt instructs Gemini to return **only valid JSON** — no markdown fences, no preamble — using `responseMimeType: 'application/json'` in the generation config.

### Parse Resume Prompt
- Strict extraction only — never invent data, use `null` for missing fields
- Normalizes all dates to `YYYY-MM` format
- Splits combined bullet points into individual items
- Auto-detects document language and returns it as ISO 639-1 code
- Returns typed JSON matching `ParsedResume` interface

### Tailor to Job Prompt
- Performs keyword gap analysis between resume JSON and job description text
- Returns field-level suggestions using dot-path notation (`experience.0.bullets.2`)
- Scores ATS match before and after changes (0–100 scale, calibrated to be realistic)
- Prioritizes: exact JD keyword matches > seniority alignment > quantified achievements
- Never suggests removing truthful information

### Improve Bullet Prompt
- Rewrites using the XYZ formula: *Accomplished [X] as measured by [Y] by doing [Z]*
- Starts with a strong action verb (Led, Built, Reduced, Increased, Designed)
- Infers reasonable metrics — uses ranges rather than inventing specific numbers
- Strips weak filler phrases: "responsible for", "worked on", "helped with"
- Returns the primary rewrite + two alternatives + explanation of changes

### Retry Strategy
```
Attempt 1 → wait 1s on failure
Attempt 2 → wait 2s on failure
Attempt 3 → throw error
```
Implemented in `generateJSON()` in `src/lib/gemini/client.ts`.

---

## 18. Internationalization

### Supported Locales

| Code | Language | Direction |
|---|---|---|
| `en` | English | LTR |
| `fr` | French | LTR |
| `es` | Spanish | LTR |
| `ar` | Arabic | RTL |

### How it works

1. `src/i18n.ts` defines supported locales and loads the correct `messages/[locale].json` per request
2. `src/middleware.ts` applies `next-intl/middleware` to route `/` → `/en/`, `/fr/`, etc.
3. `src/app/[locale]/layout.tsx` wraps everything in `<NextIntlClientProvider>` and sets `dir="rtl"` for Arabic
4. Translations are accessed with `useTranslations('namespace')` in Client Components and `getTranslations()` in Server Components

### Adding a new locale

1. Add the locale code to the `locales` array in `src/i18n.ts`
2. Create `messages/[code].json` modeled on `messages/en.json`
3. Add the locale to `generateStaticParams()` in the root layout

### Translation namespace structure

```json
{
  "app":         { "name": "...", "tagline": "..." },
  "nav":         { "dashboard": "...", "newResume": "...", ... },
  "onboarding":  { "title": "...", "uploadOption": "...", ... },
  "editor":      { "save": "...", "sections": { ... } },
  "ai":          { "tailorTitle": "...", "atsScore": "...", ... },
  "templates":   { "creative": "...", "modern": "...", ... },
  "errors":      { "generic": "...", "aiLimit": "...", ... }
}
```

---

## 19. Contributing

### Development workflow

```bash
# Clone the repo
git clone https://github.com/yourname/resumaster-ai.git
cd resumaster-ai

# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Gemini keys

# Start the dev server
npm run dev
```

### Code style

- **TypeScript strict mode** — no `any`, no implicit returns
- **Prettier** auto-formats on save (`.prettierrc` configured)
- **ESLint** with `@typescript-eslint` rules
- Components are **function declarations**, not arrow functions at the module level
- Server Actions are in `actions.ts` files colocated with their route segments
- All Gemini calls go through `generateJSON()` — never call the SDK directly

### Branch naming

```
feat/step-3-onboarding
fix/auth-redirect-loop
chore/update-gemini-prompts
```

### Commit format

```
feat: add LinkedIn import to onboarding wizard
fix: correct ATS score calculation for missing keywords
docs: update README with Step 3 instructions
chore: upgrade @google/generative-ai to 0.x.x
```

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built step by step — from zero to production.</strong><br/>
  <sub>Next.js · Supabase · Gemini 2.5 Flash · Tailwind CSS · Framer Motion</sub>
</div>
