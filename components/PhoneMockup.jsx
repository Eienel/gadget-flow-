/* ── Tiny product silhouettes used inside the mockup cards ── */

function IPhoneArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ip-body" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3c" />
          <stop offset="100%" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="ip-screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2c" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      <rect x="14" y="8" width="32" height="74" rx="6" fill="url(#ip-body)" />
      <rect x="16" y="10" width="28" height="70" rx="4" fill="url(#ip-screen)" />
      <rect x="26" y="13" width="8" height="2.5" rx="1.25" fill="#000" stroke="#1a1a1c" strokeWidth="0.3" />
      <rect x="20" y="22" width="20" height="22" rx="1.5" fill="#0a84ff" opacity="0.35" />
      <rect x="20" y="47" width="9" height="9" rx="1" fill="#ffffff" opacity="0.18" />
      <rect x="31" y="47" width="9" height="9" rx="1" fill="#ffffff" opacity="0.12" />
      <rect x="20" y="59" width="9" height="9" rx="1" fill="#ffffff" opacity="0.14" />
      <rect x="31" y="59" width="9" height="9" rx="1" fill="#ffffff" opacity="0.10" />
    </svg>
  );
}

function MacBookArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="mb-lid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cfc1a5" />
          <stop offset="100%" stopColor="#a8956c" />
        </linearGradient>
        <linearGradient id="mb-screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#2a2a2c" />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="6" y="28" width="48" height="32" rx="2" fill="url(#mb-lid)" />
      <rect x="9" y="31" width="42" height="26" rx="1" fill="url(#mb-screen)" />
      {/* tiny apple */}
      <circle cx="30" cy="44" r="2.2" fill="#ffffff" opacity="0.55" />
      <rect x="29" y="40" width="2" height="2" rx="0.5" fill="#ffffff" opacity="0.55" />
      {/* base */}
      <rect x="2" y="60" width="56" height="4" rx="1.2" fill="#c4b48e" />
      <rect x="25" y="60.5" width="10" height="1.2" rx="0.6" fill="#8d7c56" />
    </svg>
  );
}

function AirPodsArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ap-bud" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dadada" />
        </linearGradient>
      </defs>
      {/* left bud */}
      <g transform="translate(15 22) rotate(-12 0 0)">
        <ellipse cx="0" cy="0" rx="7" ry="9" fill="url(#ap-bud)" stroke="#b5b5b5" strokeWidth="0.4" />
        <rect x="-3" y="6" width="6" height="22" rx="3" fill="url(#ap-bud)" stroke="#b5b5b5" strokeWidth="0.4" />
        <ellipse cx="0" cy="-1" rx="3" ry="3" fill="#000" opacity="0.55" />
      </g>
      {/* right bud */}
      <g transform="translate(45 22) rotate(12 0 0)">
        <ellipse cx="0" cy="0" rx="7" ry="9" fill="url(#ap-bud)" stroke="#b5b5b5" strokeWidth="0.4" />
        <rect x="-3" y="6" width="6" height="22" rx="3" fill="url(#ap-bud)" stroke="#b5b5b5" strokeWidth="0.4" />
        <ellipse cx="0" cy="-1" rx="3" ry="3" fill="#000" opacity="0.55" />
      </g>
      {/* case below */}
      <rect x="14" y="58" width="32" height="22" rx="6" fill="url(#ap-bud)" stroke="#b5b5b5" strokeWidth="0.4" />
      <line x1="14" y1="64" x2="46" y2="64" stroke="#b5b5b5" strokeWidth="0.3" />
      <circle cx="30" cy="73" r="1.4" fill="#0a84ff" opacity="0.8" />
    </svg>
  );
}

function WatchArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="w-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e8e8ea" />
          <stop offset="100%" stopColor="#b9b9bd" />
        </linearGradient>
        <linearGradient id="w-screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      {/* top strap */}
      <path d="M22 8 L38 8 L36 24 L24 24 Z" fill="#c46e6e" />
      {/* bottom strap */}
      <path d="M24 66 L36 66 L38 84 L22 84 Z" fill="#c46e6e" />
      {/* watch body */}
      <rect x="14" y="22" width="32" height="46" rx="9" fill="url(#w-body)" />
      <rect x="17" y="25" width="26" height="40" rx="6" fill="url(#w-screen)" />
      {/* digital crown */}
      <rect x="46" y="38" width="3" height="6" rx="1" fill="#9a9a9e" />
      {/* face details */}
      <circle cx="30" cy="45" r="6" fill="none" stroke="#30d158" strokeWidth="1.5" opacity="0.9" />
      <text x="30" y="48" fontSize="4.5" textAnchor="middle" fill="#ffffff" fontWeight="700" fontFamily="-apple-system, system-ui, sans-serif">9:41</text>
    </svg>
  );
}

const ITEMS = [
  {
    bg: 'linear-gradient(135deg,#3a3a3c,#1c1c1e)',
    name: 'iPhone 15 Pro',
    price: '1.25M',
    status: 'ok',
    art: IPhoneArt,
  },
  {
    bg: 'linear-gradient(135deg,#e4d9c7,#c9b896)',
    name: 'MacBook Air',
    price: '1.89M',
    status: 'ok',
    art: MacBookArt,
  },
  {
    bg: 'linear-gradient(135deg,#bcd2ed,#88aed6)',
    name: 'AirPods Pro 2',
    price: '320K',
    status: 'sold',
    art: AirPodsArt,
  },
  {
    bg: 'linear-gradient(135deg,#f3b1b1,#d77878)',
    name: 'Apple Watch S9',
    price: '580K',
    status: 'ok',
    art: WatchArt,
  },
];

export default function PhoneMockup() {
  return (
    <div className="relative" style={{ width: 300, height: 612 }}>
      {/* glow */}
      <div
        className="absolute"
        style={{
          inset: '-40px',
          background:
            'radial-gradient(ellipse at center, rgba(0,113,227,0.25), rgba(189,102,255,0.18) 40%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: -1,
        }}
      />

      {/* outer phone body */}
      <div
        className="relative h-full w-full"
        style={{
          background: 'linear-gradient(145deg, #2a2a2c 0%, #1c1c1e 50%, #2a2a2c 100%)',
          borderRadius: 52,
          padding: 10,
          boxShadow:
            '0 50px 100px -20px rgba(0,0,0,0.35), 0 30px 60px -30px rgba(0,113,227,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* bezel */}
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            background: '#000',
            borderRadius: 44,
            padding: 3,
          }}
        >
          {/* screen */}
          <div
            className="relative h-full w-full overflow-hidden flex flex-col"
            style={{
              background: '#ffffff',
              borderRadius: 41,
            }}
          >
            {/* dynamic island */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: 12,
                width: 100,
                height: 30,
                background: '#000',
                borderRadius: 20,
                zIndex: 20,
              }}
            />

            {/* status bar */}
            <div className="pt-14 px-5 pb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">9:41</span>
              <span className="text-[10px] font-medium text-muted2">●●● LIVE</span>
            </div>

            {/* header */}
            <div className="px-5 pb-2.5 flex items-center justify-between border-b border-line2">
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                GadgetFlow
              </span>
              <div className="w-7 h-7 rounded-full bg-canvas3 flex items-center justify-center text-[10px]">
                ◍
              </div>
            </div>

            {/* hero title inside phone */}
            <div className="px-5 pt-2.5 pb-1.5">
              <p className="text-[9px] font-semibold text-accent tracking-wide">
                LIVE STOCK
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-ink leading-none mt-0.5">
                Today&apos;s drop.
              </h3>
            </div>

            {/* tabs */}
            <div className="px-5 flex gap-1.5 pb-2.5">
              {['All', 'Live', 'Sold'].map((t, i) => (
                <span
                  key={t}
                  className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${
                    i === 0 ? 'bg-ink text-white' : 'bg-canvas3 text-muted'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* mini cards */}
            <div className="flex-1 px-3.5 pb-3 grid grid-cols-2 gap-2 overflow-hidden">
              {ITEMS.map((p, i) => {
                const Art = p.art;
                return (
                  <div
                    key={i}
                    className="relative overflow-hidden flex flex-col"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: 12,
                      boxShadow: '0 2px 8px -2px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* image with product art */}
                    <div
                      className="relative w-full"
                      style={{
                        aspectRatio: '1 / 1',
                        background: p.bg,
                      }}
                    >
                      <div className="absolute inset-0 p-1.5">
                        <Art />
                      </div>
                      <span
                        className="absolute top-1 right-1 inline-flex items-center gap-0.5"
                        style={{
                          fontSize: 6,
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          background:
                            p.status === 'ok'
                              ? 'rgba(48,209,88,0.95)'
                              : 'rgba(255,69,58,0.95)',
                          color: '#fff',
                          padding: '2px 5px',
                          borderRadius: 999,
                        }}
                      >
                        ● {p.status === 'ok' ? 'LIVE' : 'SOLD'}
                      </span>
                    </div>
                    {/* text block — clearly visible */}
                    <div className="px-1.5 py-1.5 bg-white">
                      <div
                        className="font-semibold text-ink leading-tight truncate"
                        style={{ fontSize: 8.5, letterSpacing: '-0.01em' }}
                      >
                        {p.name}
                      </div>
                      <div
                        className="font-bold text-ink mt-0.5"
                        style={{ fontSize: 10, letterSpacing: '-0.02em' }}
                      >
                        ₦{p.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* home indicator */}
            <div className="pb-2 flex justify-center">
              <div
                style={{
                  width: 100,
                  height: 4,
                  background: '#1d1d1f',
                  borderRadius: 999,
                  opacity: 0.85,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
