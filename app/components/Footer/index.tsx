import Image from 'next/image';
import { GITHUB_REPO_URL } from '../../constants';

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 border-t border-white/4 px-6 py-10">
      <div className="flex items-center gap-2.5">
        <Image
          src="/logos/badge-logo.svg"
          alt="Code::Stats Badge"
          width={24}
          height={24}
          className="opacity-60"
        />
        <span className="text-[0.8125rem] text-zinc-600">
          Code::Stats Badge · GPL v3 License
        </span>
      </div>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <Image
          src="/logos/github-mark-white.svg"
          alt=""
          width={15}
          height={15}
          className="opacity-50"
        />
        GitHub
      </a>
    </footer>
  );
}
