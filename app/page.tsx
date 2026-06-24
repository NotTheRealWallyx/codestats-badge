import Image from 'next/image';
import BadgePreview from './components/BadgePreview';
import CopyButton from './components/CopyButton';

const xpBadges = [
  {
    src: '/badges/default-badge.svg',
    alt: 'Default dark badge',
    label: 'Default (Dark)',
    param: '?user=Wallyx',
    desc: 'Display your profile with the default dark theme.',
  },
  {
    src: '/badges/light-badge.svg',
    alt: 'Light theme badge',
    label: 'Light Theme',
    param: '?theme=light',
    desc: 'Switch to a light background for light-mode READMEs.',
  },
  {
    src: '/badges/no-progress-bar-badge.svg',
    alt: 'No progress bar badge',
    label: 'Hide Progress Bar',
    param: '?showProgressBar=false',
    desc: 'Remove the XP progress bars for a cleaner look.',
  },
  {
    src: '/badges/xp-badge.svg',
    alt: 'Language XP badge',
    label: 'Show XP Values',
    param: '?showLangXP=true',
    desc: 'Display raw XP numbers instead of level per language.',
  },
  {
    src: '/badges/limit-badge.svg',
    alt: 'Limit languages badge',
    label: 'Limit Languages',
    param: '?limit=3',
    desc: 'Control how many top languages to show (default 6, max 20).',
  },
  {
    src: '/badges/compact-badge.svg',
    alt: 'Compact badge',
    label: 'Compact Mode',
    param: '?compact=true',
    desc: 'Minimal single-line badge showing only total XP.',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'Always Live',
    desc: 'SVG is generated on every request, pulling the latest data directly from Code::Stats.',
  },
  {
    icon: '🎨',
    title: 'Fully Customizable',
    desc: 'Themes, language limits, progress bars, compact mode — all controlled via query params.',
  },
  {
    icon: '🔗',
    title: 'One-Line Embed',
    desc: 'A single Markdown image tag is all it takes to add a live badge to any README.',
  },
];

export default function Home() {
  const xpSnippet =
    '![Code::Stats](https://codestats-badge.vercel.app/api/code-stats?user=YOUR_USERNAME)';
  const activitySnippet =
    '![Activity](https://codestats-badge.vercel.app/api/code-stats/activity?user=YOUR_USERNAME)';

  return (
    <div
      style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa' }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '0.875rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
          >
            <Image
              src="/logos/badge-logo.svg"
              alt="Code::Stats Badge"
              width={30}
              height={30}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#fafafa',
              }}
            >
              Code::Stats Badge
            </span>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
          >
            <a
              href="https://github.com/NotTheRealWallyx/codestats-badge"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: '0.4375rem 1rem', fontSize: '0.875rem' }}
            >
              <Image
                src="/logos/github-mark-white.svg"
                alt=""
                width={16}
                height={16}
              />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: '5rem',
        }}
      >
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <div className="hero-glow" style={{ position: 'absolute', inset: 0 }} />
        <div
          style={{
            position: 'relative',
            maxWidth: '56rem',
            margin: '0 auto',
            padding: '5rem 1.5rem 3rem',
            textAlign: 'center',
          }}
        >
          {/* Pill tag */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.3125rem 0.875rem',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.22)',
              color: '#60a5fa',
              marginBottom: '2rem',
            }}
          >
            <span style={{ fontSize: '0.5rem' }}>●</span> Open Source · SVG
            Badge Generator
          </span>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            }}
          >
            Showcase Your
            <br />
            <span className="gradient-text">Coding Journey</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: '1.125rem',
              color: '#71717a',
              maxWidth: '34rem',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Generate beautiful SVG badges for your{' '}
            <a
              href="https://codestats.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#60a5fa', textDecoration: 'none' }}
            >
              Code::Stats
            </a>{' '}
            profile. Perfect for GitHub READMEs and portfolios.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              gap: '0.875rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '4rem',
            }}
          >
            <a href="#showcase" className="btn-primary">
              See Badges <span>↓</span>
            </a>
            <a
              href="https://github.com/NotTheRealWallyx/codestats-badge"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Image
                src="/logos/github-mark-white.svg"
                alt=""
                width={17}
                height={17}
              />
              View on GitHub
            </a>
          </div>

          {/* Hero badge */}
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1rem',
              padding: '1.5rem 2rem',
              boxShadow:
                '0 0 80px rgba(99,102,241,0.18), 0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
            <Image
              src="/badges/default-badge.svg"
              alt="Example Code::Stats badge"
              width={480}
              height={140}
              unoptimized
              style={{ display: 'block', maxWidth: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '4rem 1.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.125rem',
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card"
              style={{ padding: '1.75rem' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.875rem' }}>
                {f.icon}
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  marginBottom: '0.5rem',
                  color: '#fafafa',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#71717a',
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Badge Showcase ── */}
      <section
        id="showcase"
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '3rem 1.5rem 4rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.625rem',
            }}
          >
            XP Badge <span className="gradient-text">Variants</span>
          </h2>
          <p style={{ color: '#71717a', fontSize: '1rem' }}>
            Customize with query parameters appended to the API URL
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.125rem',
          }}
        >
          {xpBadges.map((badge) => (
            <BadgePreview
              key={badge.param}
              src={badge.src}
              alt={badge.alt}
              label={badge.label}
              param={badge.param}
              desc={badge.desc}
            />
          ))}
        </div>
      </section>

      {/* ── Activity Badge ── */}
      <section
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '1rem 1.5rem 5rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.625rem',
            }}
          >
            Activity <span className="gradient-text">Badge</span>
          </h2>
          <p style={{ color: '#71717a', fontSize: '1rem' }}>
            Visualize your daily coding contributions as activity squares
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            className="glass-card"
            style={{
              padding: '2rem',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.125rem',
              width: '100%',
              maxWidth: '640px',
            }}
          >
            <Image
              src="/badges/activity.svg"
              alt="Activity badge"
              width={540}
              height={120}
              unoptimized
              style={{ display: 'block', maxWidth: '100%' }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8125rem',
                color: '#71717a',
              }}
            >
              <span>Endpoint:</span>
              <code
                style={{
                  color: '#60a5fa',
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.18)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '0.375rem',
                  fontFamily: 'var(--font-geist-mono, monospace)',
                  fontSize: '0.75rem',
                }}
              >
                /api/code-stats/activity?user=Wallyx
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section
        style={{
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '48rem',
            margin: '0 auto',
            padding: '5rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: '0.625rem',
            }}
          >
            Add to your README in <span className="gradient-text">seconds</span>
          </h2>
          <p
            style={{
              color: '#71717a',
              marginBottom: '2.5rem',
              lineHeight: 1.7,
            }}
          >
            Replace{' '}
            <code
              style={{
                color: '#60a5fa',
                fontFamily: 'var(--font-geist-mono, monospace)',
                fontSize: '0.875rem',
              }}
            >
              YOUR_USERNAME
            </code>{' '}
            with your Code::Stats username
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              textAlign: 'left',
            }}
          >
            {[
              { title: 'XP Badge', snippet: xpSnippet },
              { title: 'Activity Badge', snippet: activitySnippet },
            ].map(({ title, snippet }) => (
              <div key={title}>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: '#71717a',
                    marginBottom: '0.5rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {title}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: '0.5rem',
                  }}
                >
                  <div className="code-block">{snippet}</div>
                  <CopyButton text={snippet} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <Image
            src="/logos/badge-logo.svg"
            alt="Code::Stats Badge"
            width={24}
            height={24}
            style={{ opacity: 0.6 }}
          />
          <span style={{ fontSize: '0.8125rem', color: '#52525b' }}>
            Code::Stats Badge · GPL v3 License
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="https://github.com/NotTheRealWallyx/codestats-badge"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Image
              src="/logos/github-mark-white.svg"
              alt=""
              width={15}
              height={15}
              style={{ opacity: 0.5 }}
            />
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
