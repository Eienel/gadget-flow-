export default function PhoneMockup() {
  return (
    <div className="relative phone-glow">
      <div
        className="relative mx-auto"
        style={{
          width: 260,
          height: 540,
          background: '#0a0a0a',
          border: '1px solid #1c1c1c',
          borderRadius: 38,
          padding: 12,
          boxShadow:
            '0 30px 80px -30px rgba(201,168,76,0.35), 0 0 0 1px #1c1c1c inset',
        }}
      >
        {/* Notch */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 18,
            width: 84,
            height: 22,
            background: '#000',
            borderRadius: 14,
            zIndex: 5,
          }}
        />

        {/* Screen */}
        <div
          className="w-full h-full overflow-hidden flex flex-col"
          style={{ background: '#050505', borderRadius: 28 }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 pt-10 pb-3 border-b border-border">
            <span className="display-serif text-offwhite" style={{ fontSize: 14 }}>
              ◈ GadgetFlow
            </span>
            <span className="label-mono text-gold" style={{ fontSize: 7 }}>
              LIVE
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 px-4 py-3 border-b border-border">
            <span className="label-mono text-offwhite" style={{ fontSize: 8 }}>
              ALL
            </span>
            <span className="label-mono text-offwhite/40" style={{ fontSize: 8 }}>
              AVAILABLE
            </span>
            <span className="label-mono text-offwhite/40" style={{ fontSize: 8 }}>
              SOLD
            </span>
          </div>

          {/* Mini cards */}
          <div className="flex-1 overflow-hidden px-3 py-3 grid grid-cols-2 gap-2">
            {[
              { tone: '#1a1410', name: 'iPhone 14 Pro', price: '780,000', status: 'ok' },
              { tone: '#101418', name: 'Galaxy S23', price: '520,000', status: 'sold' },
              { tone: '#141014', name: 'MacBook Air', price: '950,000', status: 'ok' },
              { tone: '#101814', name: 'Pixel 8', price: '610,000', status: 'ok' },
            ].map((p, i) => (
              <div
                key={i}
                className="border border-border overflow-hidden flex flex-col"
                style={{ background: '#0f0f0f', borderRadius: 6 }}
              >
                <div
                  className="w-full"
                  style={{
                    aspectRatio: '3/4',
                    background: `linear-gradient(135deg, ${p.tone}, #050505)`,
                    position: 'relative',
                  }}
                >
                  <span
                    className="absolute top-1 right-1 label-mono"
                    style={{
                      fontSize: 5,
                      color: p.status === 'ok' ? '#4ade80' : '#f87171',
                    }}
                  >
                    ●
                  </span>
                </div>
                <div className="p-2">
                  <div
                    className="display-serif text-offwhite truncate"
                    style={{ fontSize: 9 }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="label-mono text-gold"
                    style={{ fontSize: 8, marginTop: 2 }}
                  >
                    ₦{p.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
