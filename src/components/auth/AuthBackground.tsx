// Path: src/components/auth/AuthBackground.tsx
// Animated background for the left brand panel on auth pages.
// Pure CSS animations — no JS overhead.

export function AuthBackground() {
  return (
    <>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,179,237,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 80%, rgba(99,179,237,0.05) 0%, transparent 60%), #07090f',
        }}
      />

      {/* Animated orbs */}
      <div
        className="animate-orb-1 absolute top-[15%] left-[20%] h-72 w-72 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(99,179,237,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="animate-orb-2 absolute right-[10%] bottom-[20%] h-64 w-64 rounded-full opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(99,179,237,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 h-full w-px opacity-10"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(99,179,237,0.8) 40%, transparent)',
        }}
      />
    </>
  )
}
