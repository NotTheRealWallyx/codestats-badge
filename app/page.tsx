import Image from 'next/image';
import BadgePreview from './components/BadgePreview';
import CodeChip from './components/CodeChip';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import SectionHeader from './components/SectionHeader';
import SnippetBlock from './components/SnippetBlock';

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
  {
    src: '/badges/borderless-badge.svg',
    alt: 'Borderless badge',
    label: 'Borderless Mode',
    param: '?borderless=true',
    desc: 'Remove the badge outline for a cleaner, borderless look.',
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

const snippets = [
  {
    title: 'XP Badge',
    snippet:
      '![Code::Stats](https://codestats-badge.vercel.app/api/code-stats?user=YOUR_USERNAME)',
  },
  {
    title: 'Activity Badge',
    snippet:
      '![Activity](https://codestats-badge.vercel.app/api/code-stats/activity?user=YOUR_USERNAME)',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />

      <Hero />

      {/* ── Features ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[1.125rem]">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* ── Badge Showcase ── */}
      <section id="showcase" className="mx-auto max-w-6xl px-6 pt-12 pb-16">
        <SectionHeader title="XP Badge" highlight="Variants" className="mb-12">
          Customize with query parameters appended to the API URL
        </SectionHeader>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[1.125rem]">
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
      <section className="mx-auto max-w-6xl px-6 pt-4 pb-20">
        <SectionHeader title="Activity" highlight="Badge" className="mb-10">
          Visualize your daily coding contributions as activity squares
        </SectionHeader>
        <div className="flex justify-center">
          <div className="glass-card inline-flex w-full max-w-[640px] flex-col items-center gap-[1.125rem] p-8">
            <Image
              src="/badges/activity.svg"
              alt="Activity badge"
              width={540}
              height={120}
              unoptimized
              className="block max-w-full"
            />
            <div className="flex items-center gap-2 text-[0.8125rem] text-zinc-500">
              <span>Endpoint:</span>
              <CodeChip>/api/code-stats/activity?user=Wallyx</CodeChip>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section className="border-y border-white/6 bg-white/2">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <SectionHeader
            title="Add to your README in"
            highlight="seconds"
            size="md"
            className="mb-10"
          >
            Replace{' '}
            <code className="font-mono text-sm text-blue-400">
              YOUR_USERNAME
            </code>{' '}
            with your Code::Stats username
          </SectionHeader>

          <div className="flex flex-col gap-5 text-left">
            {snippets.map((snippet) => (
              <SnippetBlock key={snippet.title} {...snippet} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
