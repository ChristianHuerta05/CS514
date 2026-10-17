const ink = '#1c1612'

const motifs = {
  1: (
    <>
      <path d="M6 68c18-28 36-40 54-40s36 12 54 40" fill="none" stroke={ink} strokeWidth="1.4" />
      <path d="M16 68c14-20 28-28 44-28s30 8 44 28" fill="none" stroke={ink} strokeWidth="0.9" />
      <path d="M28 68c10-12 20-16 32-16s22 4 32 16" fill="none" stroke={ink} strokeWidth="0.7" />
      <circle cx="86" cy="16" r="3.2" fill={ink} />
    </>
  ),
  2: (
    <>
      <rect x="46" y="22" width="28" height="46" fill="none" stroke={ink} strokeWidth="1.2" />
      <path d="M52 68V40h16v28" fill="none" stroke={ink} strokeWidth="0.8" />
      <circle cx="64" cy="14" r="2" fill={ink} />
      <path d="M18 68h84" stroke={ink} strokeWidth="0.6" />
    </>
  ),
  3: (
    <>
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} x={10 + i * 7} y={30 + (i % 3) * 4} width="3" height={38 - (i % 3) * 4} fill={ink} />
      ))}
      <path d="M8 18h40" stroke={ink} strokeWidth="1.5" />
    </>
  ),
  4: (
    <>
      <rect x="48" y="40" width="24" height="16" fill="none" stroke={ink} strokeWidth="1" />
      <path d="M28 62v-16M44 62v-22M76 62v-22M92 62v-16" stroke={ink} strokeWidth="1.3" />
      <circle cx="28" cy="42" r="2" fill={ink} />
      <circle cx="44" cy="36" r="2" fill={ink} />
      <circle cx="76" cy="36" r="2" fill={ink} />
      <circle cx="92" cy="42" r="2" fill={ink} />
    </>
  ),
  5: (
    <>
      <rect x="28" y="22" width="64" height="40" fill="none" stroke={ink} strokeWidth="1.4" />
      <rect x="40" y="32" width="40" height="20" fill="none" stroke={ink} strokeWidth="0.7" />
      <path d="M60 22v-8M28 42H16M92 42h12" stroke={ink} strokeWidth="0.8" />
    </>
  ),
  6: (
    <>
      <path d="M10 20h100M10 20l14 48M110 20l-14 48" fill="none" stroke={ink} strokeWidth="1" />
      <path d="M30 68h60" stroke={ink} strokeWidth="1.2" />
      <circle cx="40" cy="34" r="1.4" fill={ink} />
      <circle cx="60" cy="28" r="1.4" fill={ink} />
      <circle cx="78" cy="36" r="1.4" fill={ink} />
    </>
  ),
  7: (
    <>
      <path d="M58 16v28" stroke={ink} strokeWidth="1" />
      <circle cx="58" cy="16" r="2.4" fill="none" stroke={ink} strokeWidth="0.8" />
      <path d="M40 62h28l-4-10h-20z" fill={ink} />
      <path d="M18 70h84" stroke={ink} strokeWidth="0.5" />
    </>
  ),
  8: (
    <>
      <rect x="16" y="18" width="88" height="22" fill="none" stroke={ink} strokeWidth="1" />
      <rect x="22" y="46" width="76" height="18" fill={ink} />
      <path d="M16 44h88" stroke={ink} strokeWidth="0.6" />
    </>
  ),
  9: (
    <>
      <circle cx="36" cy="40" r="10" fill="none" stroke={ink} strokeWidth="1.2" />
      <circle cx="58" cy="34" r="12" fill="none" stroke={ink} strokeWidth="1.2" />
      <circle cx="80" cy="42" r="9" fill="none" stroke={ink} strokeWidth="1.2" />
      <path d="M36 50v14M58 46v18M80 51v12" stroke={ink} strokeWidth="0.8" />
    </>
  ),
  10: (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M18 ${28 + i * 7}h84`} stroke={ink} strokeWidth={i === 0 ? 1.4 : 0.6} />
      ))}
      <rect x="52" y="14" width="16" height="8" fill={ink} />
    </>
  ),
  11: (
    <>
      <path d="M14 34h92v30H14z" fill="none" stroke={ink} strokeWidth="1" />
      <path d="M14 34l46-16 46 16" fill="none" stroke={ink} strokeWidth="1.1" />
      <path d="M30 64v-14h14v14" fill="none" stroke={ink} strokeWidth="0.7" />
    </>
  ),
  12: (
    <>
      <rect x="18" y="36" width="48" height="26" fill={ink} />
      <path d="M70 62V24h28" fill="none" stroke={ink} strokeWidth="1.2" />
      <path d="M74 30h20M74 38h16" stroke={ink} strokeWidth="0.6" />
    </>
  ),
}

export default function PressArt({ id, alt = '' }) {
  const n = ((Number(id) - 1) % 12) + 1 || 1
  return (
    <svg className="photo press" viewBox="0 0 120 80" role="img" aria-label={alt}>
      <defs>
        <pattern id={`dots-${n}`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="0.7" cy="0.7" r="0.55" fill={ink} opacity="0.28" />
        </pattern>
      </defs>
      <rect width="120" height="80" fill="#cfc6b4" />
      <rect width="120" height="80" fill={`url(#dots-${n})`} />
      {motifs[n]}
    </svg>
  )
}
