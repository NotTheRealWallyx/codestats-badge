import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-24 px-8 bg-black rounded-xl shadow-xl">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <h1 className="mt-8 text-4xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Code::Stats Badge Showcase
        </h1>
        <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 text-center max-w-xl">
          Display your Code::Stats progress with a beautiful SVG badge. Below is
          a live example for user{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Wallyx
          </span>
          .
        </p>
        <div className="mt-10 flex flex-col items-center gap-8 w-full">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            Badge Personalization Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Default badge */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/default-badge.svg"
                alt="Default badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Default: <code>?user=Wallyx</code>
              </span>
            </div>
            {/* Light theme */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/light-badge.svg"
                alt="Light theme badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Theme: <code>&theme=light</code>
              </span>
            </div>
            {/* Hide progress bar */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/no-progress-bar-badge.svg"
                alt="No progress bar badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Hide Progress Bar: <code>&showProgressBar=false</code>
              </span>
            </div>
            {/* ShowLangXP */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/xp-badge.svg"
                alt="ShowLangXP badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Show Language XP: <code>&showLangXP=true</code>
              </span>
            </div>
            {/* Limit languages */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/limit-badge.svg"
                alt="Limit languages badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Limit Languages: <code>&limit=3</code>
              </span>
            </div>
            {/* Compact mode */}
            <div className="flex flex-col items-center">
              <Image
                src="/badges/compact-badge.svg"
                alt="Compact badge"
                width={600}
                height={180}
                className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md"
                unoptimized
              />
              <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Compact Mode: <code>&compact=true</code>
              </span>
            </div>
          </div>
          <div className="mt-8 w-full max-w-2xl flex flex-row justify-center gap-12 items-center">
            {/* Code::Stats logo and link */}
            <a
              href="https://codestats.net/users/Wallyx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <Image
                src="/logos/codeStats-white.svg"
                alt="Code::Stats logo"
                width={64}
                height={64}
                className="mb-2 transition-transform group-hover:scale-110"
                style={{ borderRadius: "12px" }}
              />
            </a>
            {/* GitHub logo and link */}
            <a
              href="https://github.com/NotTheRealWallyx/codestats-badge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <Image
                src="/logos/github-mark-white.svg"
                alt="GitHub logo"
                width={64}
                height={64}
                className="mb-2 transition-transform group-hover:scale-110"
                style={{ borderRadius: "12px" }}
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
