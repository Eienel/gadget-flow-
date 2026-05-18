export default function PhoneMockup() {
  const items = [
    { tone: 'linear-gradient(135deg,#1a1a1c,#2c2c2e)', name: 'iPhone 15 Pro', price: '1,250,000', status: 'ok' },
    { tone: 'linear-gradient(135deg,#e4d9c7,#c9b896)', name: 'MacBook Air M3', price: '1,890,000', status: 'ok' },
    { tone: 'linear-gradient(135deg,#a8c5e8,#6e9bd1)', name: 'AirPods Pro 2', price: '320,000', status: 'sold' },
    { tone: 'linear-gradient(135deg,#f0a8a8,#d76b6b)', name: 'Apple Watch S9', price: '580,000', status: 'ok' },
  ];

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

            {/* status bar area */}
            <div className="pt-14 px-5 pb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">9:41</span>
              <span className="text-[10px] font-medium text-muted2">●●● LIVE</span>
            </div>

            {/* header */}
            <div className="px-5 pb-3 flex items-center justify-between border-b border-line2">
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                GadgetFlow
              </span>
              <div className="w-7 h-7 rounded-full bg-canvas3 flex items-center justify-center text-[10px]">
                ◍
              </div>
            </div>

            {/* hero title inside phone */}
            <div className="px-5 pt-3 pb-2">
              <p className="text-[10px] font-medium text-accent">LIVE STOCK</p>
              <h3 className="text-[18px] font-bold tracking-tight text-ink leading-tight mt-0.5">
                Today&apos;s drop.
              </h3>
            </div>

            {/* tabs */}
            <div className="px-5 flex gap-1.5 pb-3">
              {['All', 'Live', 'Sold'].map((t, i) => (
                <span
                  key={t}
                  className={`text-[9px] font-medium px-2 py-1 rounded-full ${
                    i === 0
                      ? 'bg-ink text-white'
                      : 'bg-canvas3 text-muted'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* mini cards */}
            <div className="flex-1 overflow-hidden px-4 pb-4 grid grid-cols-2 gap-2.5">
              {items.map((p, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden flex flex-col"
                  style={{
                    background: '#fbfbfd',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: 14,
                  }}
                >
                  <div
                    className="w-full relative"
                    style={{
                      aspectRatio: '4/5',
                      background: p.tone,
                    }}
                  >
                    <span
                      className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 px-1.5 py-0.5"
                      style={{
                        fontSize: 6,
                        fontWeight: 600,
                        background:
                          p.status === 'ok' ? 'rgba(48,209,88,0.95)' : 'rgba(255,69,58,0.95)',
                        color: '#fff',
                        borderRadius: 999,
                      }}
                    >
                      ● {p.status === 'ok' ? 'LIVE' : 'SOLD'}
                    </span>
                  </div>
                  <div className="px-2 py-1.5">
                    <div className="text-[8.5px] font-semibold text-ink leading-tight truncate">
                      {p.name}
                    </div>
                    <div className="text-[9px] font-bold text-ink mt-0.5">
                      ₦{p.price}
                    </div>
                  </div>
                </div>
              ))}
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
