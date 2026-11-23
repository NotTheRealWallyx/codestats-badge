import Image from 'next/image';
import { GITHUB_REPO_URL } from '../../constants';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/6 bg-zinc-950/85 backdrop-blur-[14px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logos/badge-logo.svg"
            alt="Code::Stats Badge"
            width={30}
            height={30}
          />
          <span className="text-[0.9375rem] font-bold text-zinc-50">
            Code::Stats Badge
          </span>
        </div>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost px-4 py-[0.4375rem] text-sm"
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
    </nav>
  );
}
