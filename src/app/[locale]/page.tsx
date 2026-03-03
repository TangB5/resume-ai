
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ResuMaster AI — Resumes that get you hired',
  description:
    'AI-powered resume builder. Upload your PDF, tailor to any job description, and export a stunning resume in minutes.',
  openGraph: {
    title:       'ResuMaster AI',
    description: 'AI-powered resume builder. Tailor, design, share.',
    type:        'website',
  },
}

// ── Static data ───────────────────────────────────────────────

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    label:       'AI Resume Parsing',
    description: 'Drop your existing PDF or DOCX. Gemini 2.5 Flash extracts every job, skill, and achievement into structured data instantly.',
    accent:      '#63b3ed',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label:       'Tailor to Any Job',
    description: 'Paste a job description. AI performs a gap analysis, injects missing keywords, and shows your projected ATS score before and after.',
    accent:      '#68d391',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    label:       'Bullet Point Improver',
    description: 'One click rewrites any bullet using the XYZ achievement formula — with metrics, strong verbs, and two alternative phrasings.',
    accent:      '#f6ad55',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    label:       '4 Premium Templates',
    description: 'Modern, Professional, Creative, and Simple. All fully customizable with color schemes and a live click-to-edit preview.',
    accent:      '#b794f4',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    label:       'Export PDF & PNG',
    description: 'High-DPI export at 3× scale. Download a pixel-perfect PDF or a PNG preview — ready to attach to any application.',
    accent:      '#fc8181',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
    ),
    label:       'Share a Public Link',
    description: 'Toggle your resume public and share a unique URL. Recipients see a beautifully hosted web version — no PDF needed.',
    accent:      '#63b3ed',
  },
]

const STEPS = [
  {
    num:         '01',
    title:       'Upload or build',
    description: 'Drop your existing resume or build from scratch with our smart guided form. LinkedIn import also supported.',
  },
  {
    num:         '02',
    title:       'Customize & tailor',
    description: 'Pick a template, adjust colors, and paste any job description to get AI-powered tailoring suggestions.',
  },
  {
    num:         '03',
    title:       'Export or share',
    description: 'Download a high-quality PDF, a PNG preview, or share your resume via a unique public URL.',
  },
]

const TESTIMONIALS = [
  {
    quote:  'Got 3 interviews in the first week after tailoring my resume with ResuMaster AI. The ATS score went from 51 to 89.',
    name:   'Sarah K.',
    role:   'Product Manager · Hired at Stripe',
    avatar: 'SK',
    color:  '#63b3ed',
  },
  {
    quote:  'The bullet point improver alone saved me hours. It turned a wall of generic text into a resume I\'m actually proud of.',
    name:   'Marcus T.',
    role:   'Software Engineer · Hired at Vercel',
    avatar: 'MT',
    color:  '#68d391',
  },
  {
    quote:  'I uploaded my old PDF, picked the Modern template, and had a stunning resume in under 10 minutes. Incredible.',
    name:   'Aisha R.',
    role:   'UX Designer · Hired at Figma',
    avatar: 'AR',
    color:  '#f6ad55',
  },
]

// ── Page component ────────────────────────────────────────────

export default async function LandingPage({
                                            params,
                                          }: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Server-side translation (unused keys fall back to English values below)
  // const t = await getTranslations('app')

  return (
    <div
      style={{
        background:  '#07090f',
        color:       '#e8ecf4',
        fontFamily:  "'DM Sans', sans-serif",
        overflowX:   'hidden',
      }}
    >

      {/* ── Noise texture ── */}
      <div
        aria-hidden="true"
        style={{
          position:        'fixed',
          inset:           0,
          pointerEvents:   'none',
          zIndex:          0,
          opacity:         0.025,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════ */}
      <header
        style={{
          position:        'sticky',
          top:             0,
          zIndex:          50,
          borderBottom:    '1px solid rgba(255,255,255,0.06)',
          background:      'rgba(7,9,15,0.85)',
          backdropFilter:  'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div
          style={{
            maxWidth:      '1200px',
            margin:        '0 auto',
            padding:       '0 24px',
            height:        '64px',
            display:       'flex',
            alignItems:    'center',
            justifyContent:'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div
              style={{
                width:         '34px',
                height:        '34px',
                borderRadius:  '10px',
                background:    '#63b3ed',
                display:       'flex',
                alignItems:    'center',
                justifyContent:'center',
                boxShadow:     '0 0 20px rgba(99,179,237,0.35)',
                flexShrink:    0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 4h12M3 7h8M3 10h10M3 13h6" stroke="#07090f" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily:  "'Syne', sans-serif",
                fontWeight:  800,
                fontSize:    '17px',
                color:       '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              ResuMaster <span style={{ color: '#63b3ed' }}>AI</span>
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <nav
            aria-label="Main navigation"
            style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
          >
            {[
              { label: 'Features',   href: '#features'   },
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Templates',  href: '#templates'  },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize:    '14px',
                  color:       '#9ca3af',
                  textDecoration: 'none',
                  transition:  'color 0.2s',
                  display:     'none', // shown via CSS below
                }}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href={`/${locale}/login`}
              style={{
                padding:       '8px 18px',
                fontSize:      '13px',
                fontWeight:    500,
                color:         '#9ca3af',
                textDecoration:'none',
                borderRadius:  '8px',
                transition:    'color 0.2s',
              }}
            >
              Sign in
            </Link>
            <Link
              href={`/${locale}/signup`}
              style={{
                padding:       '9px 20px',
                fontSize:      '13px',
                fontWeight:    700,
                fontFamily:    "'Syne', sans-serif",
                color:         '#07090f',
                background:    '#63b3ed',
                textDecoration:'none',
                borderRadius:  '9px',
                letterSpacing: '0.03em',
                boxShadow:     '0 2px 16px rgba(99,179,237,0.25)',
                transition:    'background 0.2s, box-shadow 0.2s',
                whiteSpace:    'nowrap',
              }}
            >
              Get started free
            </Link>
          </div>
        </div>
      </header>


      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          position:  'relative',
          padding:   'clamp(80px, 12vw, 140px) 24px clamp(80px, 10vw, 120px)',
          textAlign: 'center',
          overflow:  'hidden',
        }}
      >
        {/* Radial glow background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset:    0,
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,179,237,0.1) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset:    0,
            opacity:  0.03,
            backgroundImage: 'linear-gradient(rgba(99,179,237,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.8) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto' }}>

          {/* Badge */}
          <div
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              padding:       '6px 16px',
              background:    'rgba(99,179,237,0.08)',
              border:        '1px solid rgba(99,179,237,0.2)',
              borderRadius:  '100px',
              fontSize:      '11px',
              fontWeight:    600,
              color:         '#63b3ed',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom:  '32px',
            }}
          >
            <span
              style={{
                width:        '6px',
                height:       '6px',
                borderRadius: '50%',
                background:   '#63b3ed',
                boxShadow:    '0 0 8px #63b3ed',
                animation:    'pulse 2s ease-in-out infinite',
                flexShrink:   0,
              }}
              aria-hidden="true"
            />
            Powered by Gemini 2.5 Flash
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily:  "'Syne', sans-serif",
              fontSize:    'clamp(40px, 7vw, 80px)',
              fontWeight:  800,
              lineHeight:  1.05,
              letterSpacing: '-0.03em',
              color:       '#fff',
              marginBottom:'24px',
            }}
          >
            Resumes that<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #63b3ed 0%, #90cdf4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip: 'text',
              }}
            >
              get you hired.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            style={{
              fontSize:     'clamp(16px, 2.5vw, 20px)',
              color:        '#9ca3af',
              lineHeight:   1.7,
              maxWidth:     '600px',
              margin:       '0 auto 48px',
            }}
          >
            Upload your existing resume, tailor it to any job description with AI,
            pick a stunning template, and share it — all in under 10 minutes.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display:        'flex',
              gap:            '12px',
              justifyContent: 'center',
              flexWrap:       'wrap',
              marginBottom:   '64px',
            }}
          >
            <Link
              href={`/${locale}/signup`}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '8px',
                padding:       '14px 32px',
                background:    '#63b3ed',
                color:         '#07090f',
                fontFamily:    "'Syne', sans-serif",
                fontWeight:    700,
                fontSize:      '15px',
                letterSpacing: '0.03em',
                borderRadius:  '12px',
                textDecoration:'none',
                boxShadow:     '0 4px 28px rgba(99,179,237,0.3)',
                transition:    'transform 0.15s, box-shadow 0.2s',
                whiteSpace:    'nowrap',
              }}
            >
              Build my resume — it&apos;s free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href={`/${locale}/login`}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '8px',
                padding:       '14px 28px',
                background:    'rgba(255,255,255,0.04)',
                color:         '#e8ecf4',
                fontFamily:    "'DM Sans', sans-serif",
                fontWeight:    500,
                fontSize:      '15px',
                border:        '1px solid rgba(255,255,255,0.1)',
                borderRadius:  '12px',
                textDecoration:'none',
                transition:    'background 0.2s, border-color 0.2s',
                whiteSpace:    'nowrap',
              }}
            >
              Sign in to existing account
            </Link>
          </div>

          {/* Social proof bar */}
          <div
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '24px',
              flexWrap:       'wrap',
            }}
          >
            {[
              { value: '10,000+', label: 'resumes created' },
              { value: '4.9 / 5',  label: 'average rating'  },
              { value: '3×',       label: 'more interviews'  },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily:  "'Syne', sans-serif",
                    fontWeight:  700,
                    fontSize:    '20px',
                    color:       '#fff',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          FEATURES GRID
      ════════════════════════════════════════════════════ */}
      <section
        id="features"
        style={{
          padding:   'clamp(80px, 10vw, 120px) 24px',
          maxWidth:  '1200px',
          margin:    '0 auto',
        }}
      >
        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize:    '11px',
              fontWeight:  600,
              color:       '#63b3ed',
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              marginBottom:'16px',
            }}
          >
            Everything you need
          </p>
          <h2
            style={{
              fontFamily:  "'Syne', sans-serif",
              fontSize:    'clamp(28px, 4vw, 44px)',
              fontWeight:  700,
              color:       '#fff',
              letterSpacing:'-0.025em',
              lineHeight:  1.15,
            }}
          >
            One tool, every part of<br />the resume process
          </h2>
        </div>

        {/* 3-column grid */}
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap:                 '16px',
          }}
        >
          {FEATURES.map((f) => (
            <article
              key={f.label}
              style={{
                padding:         '28px',
                background:      'rgba(17,21,32,0.7)',
                border:          '1px solid rgba(255,255,255,0.06)',
                borderRadius:    '16px',
                transition:      'border-color 0.2s, transform 0.2s',
                position:        'relative',
                overflow:        'hidden',
              }}
            >
              {/* Top shine line */}
              <div
                aria-hidden="true"
                style={{
                  position:  'absolute',
                  top:       0,
                  left:      0,
                  right:     0,
                  height:    '1px',
                  background:`linear-gradient(90deg, transparent, ${f.accent}40, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width:         '48px',
                  height:        '48px',
                  borderRadius:  '12px',
                  background:    `${f.accent}14`,
                  border:        `1px solid ${f.accent}28`,
                  display:       'flex',
                  alignItems:    'center',
                  justifyContent:'center',
                  color:         f.accent,
                  marginBottom:  '20px',
                }}
                aria-hidden="true"
              >
                {f.icon}
              </div>

              <h3
                style={{
                  fontFamily:  "'Syne', sans-serif",
                  fontWeight:  700,
                  fontSize:    '16px',
                  color:       '#fff',
                  marginBottom:'8px',
                }}
              >
                {f.label}
              </h3>
              <p
                style={{
                  fontSize:   '14px',
                  color:      '#9ca3af',
                  lineHeight: 1.65,
                }}
              >
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{
          padding:  'clamp(80px, 10vw, 120px) 24px',
          background:'rgba(13,16,24,0.6)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p
              style={{
                fontSize:    '11px',
                fontWeight:  600,
                color:       '#63b3ed',
                letterSpacing:'0.2em',
                textTransform:'uppercase',
                marginBottom:'16px',
              }}
            >
              Three steps
            </p>
            <h2
              style={{
                fontFamily:  "'Syne', sans-serif",
                fontSize:    'clamp(28px, 4vw, 44px)',
                fontWeight:  700,
                color:       '#fff',
                letterSpacing:'-0.025em',
                lineHeight:  1.15,
              }}
            >
              From zero to hired,<br />in minutes
            </h2>
          </div>

          <ol
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap:                 '2px',
              listStyle:           'none',
              padding:             0,
              margin:              0,
            }}
          >
            {STEPS.map((step, i) => (
              <li
                key={step.num}
                style={{
                  padding:      '40px 36px',
                  position:     'relative',
                  background:   'rgba(17,21,32,0.5)',
                  borderRadius: i === 0 ? '16px 0 0 16px' : i === STEPS.length - 1 ? '0 16px 16px 0' : '0',
                  border:       '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    fontFamily:  "'Syne', sans-serif",
                    fontSize:    '48px',
                    fontWeight:  800,
                    color:       'rgba(99,179,237,0.12)',
                    lineHeight:  1,
                    marginBottom:'20px',
                    letterSpacing:'-0.05em',
                  }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily:  "'Syne', sans-serif",
                    fontWeight:  700,
                    fontSize:    '18px',
                    color:       '#fff',
                    marginBottom:'10px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize:   '14px',
                    color:      '#9ca3af',
                    lineHeight: 1.65,
                  }}
                >
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          TEMPLATES PREVIEW
      ════════════════════════════════════════════════════ */}
      <section
        id="templates"
        style={{
          padding:  'clamp(80px, 10vw, 120px) 24px',
          maxWidth: '1200px',
          margin:   '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontSize:    '11px',
              fontWeight:  600,
              color:       '#63b3ed',
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              marginBottom:'16px',
            }}
          >
            Templates
          </p>
          <h2
            style={{
              fontFamily:  "'Syne', sans-serif",
              fontSize:    'clamp(28px, 4vw, 44px)',
              fontWeight:  700,
              color:       '#fff',
              letterSpacing:'-0.025em',
              lineHeight:  1.15,
            }}
          >
            Four styles.<br />Every industry.
          </h2>
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap:                 '16px',
          }}
        >
          {[
            {
              id:     'Modern',
              desc:   'Clean lines, sidebar layout. Perfect for tech roles.',
              accent: '#63b3ed',
              preview: [
                { w: '60%', h: '12px', c: '#63b3ed22', mt: '0' },
                { w: '40%', h: '8px',  c: '#ffffff0a', mt: '8px' },
                { w: '100%', h: '1px', c: '#63b3ed22', mt: '16px' },
                { w: '80%', h: '8px',  c: '#ffffff0a', mt: '12px' },
                { w: '90%', h: '6px',  c: '#ffffff06', mt: '6px' },
                { w: '75%', h: '6px',  c: '#ffffff06', mt: '6px' },
              ],
            },
            {
              id:     'Professional',
              desc:   'Executive, traditional. Ideal for finance and law.',
              accent: '#c9a84c',
              preview: [
                { w: '50%', h: '14px', c: '#c9a84c22', mt: '0' },
                { w: '35%', h: '8px',  c: '#ffffff0a', mt: '8px' },
                { w: '100%', h: '2px', c: '#c9a84c33', mt: '16px' },
                { w: '85%', h: '8px',  c: '#ffffff0a', mt: '12px' },
                { w: '70%', h: '6px',  c: '#ffffff06', mt: '6px' },
                { w: '80%', h: '6px',  c: '#ffffff06', mt: '6px' },
              ],
            },
            {
              id:     'Creative',
              desc:   'Bold, asymmetric. Stands out in design and marketing.',
              accent: '#b794f4',
              preview: [
                { w: '100%', h: '32px', c: '#b794f422', mt: '0' },
                { w: '60%', h: '8px',  c: '#ffffff0a', mt: '10px' },
                { w: '45%', h: '6px',  c: '#ffffff06', mt: '6px' },
                { w: '100%', h: '1px', c: '#b794f422', mt: '14px' },
                { w: '80%', h: '6px',  c: '#ffffff06', mt: '10px' },
                { w: '65%', h: '6px',  c: '#ffffff06', mt: '6px' },
              ],
            },
            {
              id:     'Simple',
              desc:   'Minimalist, typographic. Works everywhere.',
              accent: '#68d391',
              preview: [
                { w: '45%', h: '10px', c: '#ffffff14', mt: '0' },
                { w: '30%', h: '7px',  c: '#ffffff08', mt: '8px' },
                { w: '100%', h: '1px', c: '#68d39122', mt: '16px' },
                { w: '75%', h: '7px',  c: '#ffffff08', mt: '12px' },
                { w: '85%', h: '6px',  c: '#ffffff05', mt: '6px' },
                { w: '70%', h: '6px',  c: '#ffffff05', mt: '6px' },
              ],
            },
          ].map((tpl) => (
            <div
              key={tpl.id}
              style={{
                borderRadius: '16px',
                overflow:     'hidden',
                border:       '1px solid rgba(255,255,255,0.07)',
                transition:   'border-color 0.2s, transform 0.2s',
                cursor:       'pointer',
              }}
            >
              {/* Mock A4 preview */}
              <div
                aria-hidden="true"
                style={{
                  background:  '#0d1018',
                  padding:     '24px 20px',
                  minHeight:   '200px',
                }}
              >
                {tpl.preview.map((row, i) => (
                  <div
                    key={i}
                    style={{
                      width:        row.w,
                      height:       row.h,
                      background:   row.c,
                      borderRadius: '3px',
                      marginTop:    row.mt,
                    }}
                  />
                ))}
              </div>

              {/* Label */}
              <div
                style={{
                  padding:        '16px 20px',
                  background:     'rgba(17,21,32,0.9)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily:  "'Syne', sans-serif",
                      fontWeight:  700,
                      fontSize:    '14px',
                      color:       '#fff',
                      marginBottom:'3px',
                    }}
                  >
                    {tpl.id}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {tpl.desc}
                  </div>
                </div>
                <div
                  style={{
                    width:        '8px',
                    height:       '8px',
                    borderRadius: '50%',
                    background:   tpl.accent,
                    boxShadow:    `0 0 8px ${tpl.accent}`,
                    flexShrink:   0,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding:     'clamp(80px, 10vw, 120px) 24px',
          background:  'rgba(13,16,24,0.6)',
          borderTop:   '1px solid rgba(255,255,255,0.05)',
          borderBottom:'1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p
              style={{
                fontSize:    '11px',
                fontWeight:  600,
                color:       '#63b3ed',
                letterSpacing:'0.2em',
                textTransform:'uppercase',
                marginBottom:'16px',
              }}
            >
              Real results
            </p>
            <h2
              style={{
                fontFamily:  "'Syne', sans-serif",
                fontSize:    'clamp(28px, 4vw, 44px)',
                fontWeight:  700,
                color:       '#fff',
                letterSpacing:'-0.025em',
              }}
            >
              Trusted by job seekers<br />at top companies
            </h2>
          </div>

          <div
            style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap:                 '16px',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                style={{
                  margin:        0,
                  padding:       '28px',
                  background:    'rgba(17,21,32,0.7)',
                  border:        '1px solid rgba(255,255,255,0.06)',
                  borderRadius:  '16px',
                }}
              >
                {/* Stars */}
                <div
                  style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}
                  aria-label="5 stars"
                >
                  {[0,1,2,3,4].map((i) => (
                    <svg
                      key={i}
                      width="14" height="14" viewBox="0 0 24 24"
                      fill="#f6ad55" aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    fontSize:    '14px',
                    color:       '#d1d5db',
                    lineHeight:  1.7,
                    marginBottom:'20px',
                    fontStyle:   'italic',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width:          '38px',
                      height:         '38px',
                      borderRadius:   '50%',
                      background:     `${t.color}22`,
                      border:         `1px solid ${t.color}44`,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontSize:       '12px',
                      fontWeight:     700,
                      color:          t.color,
                      flexShrink:     0,
                    }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 600,
                        fontSize:   '13px',
                        color:      '#fff',
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '1px' }}>
                      {t.role}
                    </div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding:  'clamp(80px, 10vw, 120px) 24px',
          maxWidth: '900px',
          margin:   '0 auto',
          textAlign:'center',
        }}
      >
        {/* Glow orb */}
        <div
          aria-hidden="true"
          style={{
            width:          '400px',
            height:         '400px',
            borderRadius:   '50%',
            background:     'radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)',
            filter:         'blur(40px)',
            position:       'absolute',
            left:           '50%',
            transform:      'translateX(-50%)',
            pointerEvents:  'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontSize:    '11px',
              fontWeight:  600,
              color:       '#63b3ed',
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              marginBottom:'20px',
            }}
          >
            Start today — it&apos;s free
          </p>

          <h2
            style={{
              fontFamily:  "'Syne', sans-serif",
              fontSize:    'clamp(32px, 5vw, 56px)',
              fontWeight:  800,
              color:       '#fff',
              letterSpacing:'-0.03em',
              lineHeight:  1.1,
              marginBottom:'20px',
            }}
          >
            Your next job starts<br />
            with a better resume.
          </h2>

          <p
            style={{
              fontSize:    '17px',
              color:       '#9ca3af',
              lineHeight:  1.65,
              maxWidth:    '500px',
              margin:      '0 auto 40px',
            }}
          >
            Join thousands of job seekers who landed roles at top companies
            using ResuMaster AI. No credit card required.
          </p>

          <Link
            href={`/${locale}/signup`}
            style={{
              display:       'inline-flex',
              alignItems:    'center',
              gap:           '8px',
              padding:       '16px 40px',
              background:    '#63b3ed',
              color:         '#07090f',
              fontFamily:    "'Syne', sans-serif",
              fontWeight:    700,
              fontSize:      '16px',
              letterSpacing: '0.03em',
              borderRadius:  '14px',
              textDecoration:'none',
              boxShadow:     '0 6px 40px rgba(99,179,237,0.35)',
              transition:    'transform 0.15s, box-shadow 0.2s',
            }}
          >
            Create my free resume
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <p
            style={{
              fontSize:   '13px',
              color:      '#4b5563',
              marginTop:  '16px',
            }}
          >
            Free plan · No credit card · Cancel anytime
          </p>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer
        style={{
          borderTop:  '1px solid rgba(255,255,255,0.06)',
          padding:    '40px 24px',
        }}
      >
        <div
          style={{
            maxWidth:       '1200px',
            margin:         '0 auto',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            flexWrap:       'wrap',
            gap:            '16px',
          }}
        >
          {/* Brand */}
          <Link
            href={`/${locale}`}
            style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none' }}
          >
            <div
              style={{
                width:          '28px',
                height:         '28px',
                borderRadius:   '8px',
                background:     '#63b3ed',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                <path d="M3 4h12M3 7h8M3 10h10M3 13h6" stroke="#07090f" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize:   '15px',
                color:      '#9ca3af',
              }}
            >
              ResuMaster AI
            </span>
          </Link>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {[
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms',   href: '/terms'   },
                { label: 'Sign up', href: `/${locale}/signup` },
                { label: 'Sign in', href: `/${locale}/login`  },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize:      '13px',
                    color:         '#4b5563',
                    textDecoration:'none',
                    transition:    'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Copyright */}
          <p style={{ fontSize: '12px', color: '#374151', margin: 0 }}>
            &copy; {new Date().getFullYear()} ResuMaster AI
          </p>
        </div>
      </footer>


      {/* ════════════════════════════════════════════════════
          GLOBAL STYLES (inline — no external CSS required)
      ════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }

        /* Show nav links on md+ screens */
        @media (min-width: 768px) {
          .nav-link { display: block !important; }
        }

        /* Hover states */
        a:hover { opacity: 0.85; }

        /* Smooth scroll */
        html { scroll-behavior: smooth; }

        /* Remove default margins */
        h1, h2, h3, p, blockquote { margin: 0; }
      `}</style>

    </div>
  )
}