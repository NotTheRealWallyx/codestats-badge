import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  highlight: string;
  children: ReactNode;
  size?: 'md' | 'lg';
  className?: string;
}

export default function SectionHeader({
  title,
  highlight,
  children,
  size = 'lg',
  className = '',
}: SectionHeaderProps) {
  const titleSize =
    size === 'md'
      ? 'text-[clamp(1.75rem,4vw,2.25rem)]'
      : 'text-[clamp(1.75rem,4vw,2.5rem)]';

  return (
    <div className={`text-center ${className}`}>
      <h2 className={`mb-2.5 font-bold tracking-[-0.02em] ${titleSize}`}>
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      <p className="leading-[1.7] text-zinc-500">{children}</p>
    </div>
  );
}
