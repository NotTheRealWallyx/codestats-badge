import Image from 'next/image';
import BadgePreview from './components/BadgePreview';
import SubTitle from './components/SubTitle';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-24 px-8 bg-black rounded-xl shadow-xl">
        <h1 className="mt-8 text-4xl font-bold text-blue-700 dark:text-blue-300 text-center">
          Code::Stats Badge Showcase
        </h1>
        <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 text-center max-w-xl">
          Display your Code::Stats progress with a beautiful SVG badge. Below is
          a live example for user{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Wallyx
          </span>
        </p>
        <div className="mt-10 flex flex-col items-center gap-8 w-full">
          <SubTitle text="Badge Personalization Options" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <BadgePreview
              src="/badges/default-badge.svg"
              alt="Default badge"
              options={{
                text: 'User',
                code: '?user=Wallyx',
              }}
            />

            <BadgePreview
              src="/badges/light-badge.svg"
              alt="Light theme badge"
              options={{
                text: 'Theme',
                code: '?theme=light',
              }}
            />

            <BadgePreview
              src="/badges/no-progress-bar-badge.svg"
              alt="No progress bar badge"
              options={{
                text: 'Hide Progress Bar',
                code: '?showProgressBar=false',
              }}
            />

            <BadgePreview
              src="/badges/xp-badge.svg"
              alt="Language XP badge"
              options={{
                text: 'Show Language XP',
                code: '?showLangXP=true',
              }}
            />

            <BadgePreview
              src="/badges/limit-badge.svg"
              alt="Limit languages badge"
              options={{
                text: 'Limit Languages',
                code: '?limit=3',
              }}
            />

            <BadgePreview
              src="/badges/compact-badge.svg"
              alt="Compact badge"
              options={{
                text: 'Compact Mode',
                code: '?compact=true',
              }}
            />
          </div>

          <div className="w-full mt-8 flex flex-col items-center">
            <SubTitle text="Activity Example" />
            <BadgePreview
              src="/badges/activity.svg"
              alt="Activity badge"
              description="Shows daily XP contributions as activity squares."
            />
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
                style={{ borderRadius: '12px' }}
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
                style={{ borderRadius: '12px' }}
              />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
