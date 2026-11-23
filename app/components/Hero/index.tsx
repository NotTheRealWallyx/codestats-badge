import Image from 'next/image';
import { GITHUB_REPO_URL } from '../../constants';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20">
      <div className="grid-bg absolute inset-0" />
      <div className="hero-glow absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
        <span className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-blue-500/22 bg-blue-500/10 px-3.5 py-[0.3125rem] text-[0.8125rem] font-medium text-blue-400">
          <span className="text-[0.5rem]">●</span> Open Source · SVG Badge
          Generator
        </span>

        <h1 className="mb-5 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.08] font-extrabold tracking-[-0.025em]">
          Showcase Your
          <br />
          <span className="gradient-text">Coding Journey</span>
        </h1>

        <p className="mx-auto mb-10 max-w-[34rem] text-lg leading-[1.7] text-zinc-500">
          Generate beautiful SVG badges for your{' '}
          <a
            href="https://codestats.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            Code::Stats
          </a>{' '}
          profile. Perfect for GitHub READMEs and portfolios.
        </p>

        <div className="mb-16 flex flex-wrap justify-center gap-3.5">
          <a href="#showcase" className="btn-primary">
            See Badges <span>↓</span>
          </a>
          <a
            href={GITHUB_REPO_URL}
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

        <div className="inline-block rounded-2xl border border-white/9 bg-white/4 px-8 py-6 shadow-[0_0_80px_rgba(99,102,241,0.18),0_24px_64px_rgba(0,0,0,0.5)]">
          <Image
            src="/badges/default-badge.svg"
            alt="Example Code::Stats badge"
            width={480}
            height={140}
            unoptimized
            className="block max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
