import { Brain, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '60px 24px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain size={20} color="#ff00cc" />
          <span
            className="font-mono"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: '#fff',
            }}
          >
            ENGLISH MINDSET LAB
          </span>
        </div>

        <p
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          Built with{' '}
          <Heart size={12} color="#ff00cc" style={{ fill: '#ff00cc' }} /> for
          language learners
        </p>

        <p
          className="font-mono"
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          8-WEEK NEURAL IMPLANT PROTOCOL v1.0
        </p>
      </div>
    </footer>
  );
}
