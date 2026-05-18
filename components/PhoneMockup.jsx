/* ── Tiny product silhouettes used inside the mockup cards ── */

function IPhoneArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ip-frame" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#1c1c1e" />
          <stop offset="35%" stopColor="#5e5e60" />
          <stop offset="50%" stopColor="#787878" />
          <stop offset="65%" stopColor="#5e5e60" />
          <stop offset="100%" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="ip-wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b3b78" />
          <stop offset="35%" stopColor="#6a2a8f" />
          <stop offset="70%" stopColor="#c54275" />
          <stop offset="100%" stopColor="#e8854c" />
        </linearGradient>
        <radialGradient id="ip-shine" cx="0.5" cy="0.15" r="0.6">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* titanium body */}
      <rect x="19" y="4" width="22" height="82" rx="5.5" fill="url(#ip-frame)" />
      {/* inner bezel */}
      <rect x="19.9" y="4.9" width="20.2" height="80.2" rx="4.6" fill="#000" />
      {/* display + wallpaper */}
      <rect x="20.9" y="6.5" width="18.2" height="77" rx="3.6" fill="url(#ip-wall)" />
      {/* glass reflection sheen */}
      <rect x="20.9" y="6.5" width="18.2" height="77" rx="3.6" fill="url(#ip-shine)" />
      {/* dynamic island */}
      <rect x="26.4" y="8.4" width="7.2" height="2.4" rx="1.2" fill="#000" />
      {/* status bar dots — tiny suggestion of icons */}
      <circle cx="23.5" cy="9.6" r="0.4" fill="#ffffff" opacity="0.85" />
      <circle cx="36.5" cy="9.6" r="0.4" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}

function MacBookArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="mb-lid" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d7c8a8" />
          <stop offset="100%" stopColor="#a89163" />
        </linearGradient>
        <linearGradient id="mb-screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b3b78" />
          <stop offset="100%" stopColor="#1c1c1e" />
        </linearGradient>
        <linearGradient id="mb-base" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c6b388" />
          <stop offset="100%" stopColor="#8b7548" />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="5" y="26" width="50" height="34" rx="2" fill="url(#mb-lid)" />
      {/* screen */}
      <rect x="7.5" y="28.5" width="45" height="29" rx="1.2" fill="url(#mb-screen)" />
      {/* camera dot */}
      <circle cx="30" cy="29.6" r="0.45" fill="#000" stroke="#3a3a3c" strokeWidth="0.2" />
      {/* apple logo glow on lid */}
      <g transform="translate(30 43)" opacity="0.7">
        <path
          d="M0,-2.6 C-0.5,-2.6 -1.2,-2.2 -1.6,-1.4 C-2.4,-1.2 -3,-0.5 -3,0.4 C-3,1.5 -2.1,2.5 -1.2,2.5 C-0.8,2.5 -0.4,2.3 0,2.3 C0.4,2.3 0.8,2.5 1.2,2.5 C2.1,2.5 3,1.5 3,0.4 C3,-0.5 2.4,-1.2 1.6,-1.4 C1.2,-2.2 0.5,-2.6 0,-2.6 Z"
          fill="#ffffff"
          opacity="0.65"
        />
        <path d="M0.3,-3 C0.7,-3.4 1.3,-3.4 1.4,-3.0 C1.0,-2.6 0.5,-2.5 0.3,-3 Z" fill="#ffffff" opacity="0.65" />
      </g>
      {/* base */}
      <rect x="2" y="60" width="56" height="4.5" rx="1.5" fill="url(#mb-base)" />
      {/* trackpad hint */}
      <rect x="24" y="60.6" width="12" height="1.6" rx="0.6" fill="#7a663c" />
      {/* shadow */}
      <ellipse cx="30" cy="67" rx="22" ry="1.3" fill="#000" opacity="0.18" />
    </svg>
  );
}

function AirPodsArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ap-bud" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>
        <linearGradient id="ap-case" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cdcdd1" />
        </linearGradient>
      </defs>
      {/* left bud — AirPods Pro 2: shorter stem, rounded head */}
      <g transform="translate(18 22) rotate(-15 0 0)">
        {/* head */}
        <ellipse cx="0" cy="0" rx="6.5" ry="7" fill="url(#ap-bud)" stroke="#b0b0b4" strokeWidth="0.4" />
        {/* silicone tip */}
        <ellipse cx="-4" cy="-2.2" rx="2.5" ry="2" fill="#1c1c1e" opacity="0.85" />
        {/* short stem */}
        <rect x="-1.5" y="5" width="3" height="16" rx="1.5" fill="url(#ap-bud)" stroke="#b0b0b4" strokeWidth="0.4" />
        {/* stem sensor strip */}
        <rect x="-1" y="18" width="2" height="2" rx="0.3" fill="#9a9a9e" />
      </g>
      {/* right bud */}
      <g transform="translate(42 22) rotate(15 0 0)">
        <ellipse cx="0" cy="0" rx="6.5" ry="7" fill="url(#ap-bud)" stroke="#b0b0b4" strokeWidth="0.4" />
        <ellipse cx="4" cy="-2.2" rx="2.5" ry="2" fill="#1c1c1e" opacity="0.85" />
        <rect x="-1.5" y="5" width="3" height="16" rx="1.5" fill="url(#ap-bud)" stroke="#b0b0b4" strokeWidth="0.4" />
        <rect x="-1" y="18" width="2" height="2" rx="0.3" fill="#9a9a9e" />
      </g>
      {/* charging case */}
      <rect x="13" y="58" width="34" height="24" rx="7" fill="url(#ap-case)" stroke="#b0b0b4" strokeWidth="0.4" />
      {/* hinge line */}
      <line x1="13" y1="64.5" x2="47" y2="64.5" stroke="#b0b0b4" strokeWidth="0.3" />
      {/* status LED */}
      <circle cx="30" cy="74.5" r="1.2" fill="#30d158" />
      <circle cx="30" cy="74.5" r="1.8" fill="#30d158" opacity="0.25" />
      {/* case shadow */}
      <ellipse cx="30" cy="85" rx="18" ry="1.2" fill="#000" opacity="0.18" />
    </svg>
  );
}

function WatchArt() {
  return (
    <svg viewBox="0 0 60 90" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="w-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f0f0f2" />
          <stop offset="100%" stopColor="#b0b0b4" />
        </linearGradient>
        <linearGradient id="w-screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a1a1c" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <linearGradient id="w-strap" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c46e6e" />
          <stop offset="100%" stopColor="#9c4d4d" />
        </linearGradient>
      </defs>
      {/* top strap */}
      <path d="M22 6 L38 6 L36 24 L24 24 Z" fill="url(#w-strap)" />
      {/* strap holes */}
      <circle cx="28" cy="12" r="0.6" fill="#7a3a3a" />
      <circle cx="32" cy="12" r="0.6" fill="#7a3a3a" />
      {/* bottom strap */}
      <path d="M24 66 L36 66 L38 84 L22 84 Z" fill="url(#w-strap)" />
      <circle cx="28" cy="78" r="0.6" fill="#7a3a3a" />
      <circle cx="32" cy="78" r="0.6" fill="#7a3a3a" />
      {/* watch body */}
      <rect x="13" y="22" width="34" height="46" rx="10" fill="url(#w-body)" />
      {/* screen */}
      <rect x="16.5" y="25.5" width="27" height="39" rx="7" fill="url(#w-screen)" />
      {/* digital crown */}
      <rect x="46" y="38" width="3" height="6.5" rx="1" fill="#9a9a9e" />
      <rect x="46.2" y="39" width="2.6" height="0.6" fill="#7e7e82" />
      <rect x="46.2" y="40.5" width="2.6" height="0.6" fill="#7e7e82" />
      <rect x="46.2" y="42" width="2.6" height="0.6" fill="#7e7e82" />
      {/* side button */}
      <rect x="46" y="48" width="3" height="3" rx="0.5" fill="#9a9a9e" />
      {/* activity rings on face */}
      <circle cx="30" cy="45" r="7" fill="none" stroke="#ff453a" strokeWidth="1.2" opacity="0.95" />
      <circle cx="30" cy="45" r="5" fill="none" stroke="#30d158" strokeWidth="1.2" opacity="0.95" />
      <circle cx="30" cy="45" r="3" fill="none" stroke="#0a84ff" strokeWidth="1.2" opacity="0.95" />
      {/* time text */}
      <text x="30" y="36" fontSize="3.5" textAnchor="middle" fill="#ffffff" fontWeight="700" fontFamily="-apple-system, system-ui, sans-serif" letterSpacing="-0.1">9:41</text>
    </svg>
  );
}

const ITEMS = [
  {
    bg: 'linear-gradient(135deg,#3a3a3c,#1c1c1e)',
    name: 'iPhone 15 Pro',
    price: '1.15M',
    status: 'ok',
    art: IPhoneArt,
  },
  {
    bg: 'linear-gradient(135deg,#e4d9c7,#c9b896)',
    name: 'MacBook Air M3',
    price: '1.65M',
    status: 'ok',
    art: MacBookArt,
  },
  {
    bg: 'linear-gradient(135deg,#bcd2ed,#88aed6)',
    name: 'AirPods Pro 2',
    price: '275K',
    status: 'sold',
    art: AirPodsArt,
  },
  {
    bg: 'linear-gradient(135deg,#f3b1b1,#d77878)',
    name: 'Apple Watch S9',
    price: '495K',
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
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            background: '#000',
            borderRadius: 44,
            padding: 3,
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden flex flex-col"
            style={{
              background: '#ffffff',
              borderRadius: 41,
            }}
          >
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

            <div className="pt-14 px-5 pb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">9:41</span>
              <span className="text-[10px] font-medium text-muted2">●●● LIVE</span>
            </div>

            <div className="px-5 pb-2.5 flex items-center justify-between border-b border-line2">
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                GadgetFlow
              </span>
              <div className="w-7 h-7 rounded-full bg-canvas3 flex items-center justify-center text-[10px]">
                ◍
              </div>
            </div>

            <div className="px-5 pt-2.5 pb-1.5">
              <p className="text-[9px] font-semibold text-accent tracking-wide">
                LIVE STOCK
              </p>
              <h3 className="text-[17px] font-bold tracking-tight text-ink leading-none mt-0.5">
                Today&apos;s drop.
              </h3>
            </div>

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
