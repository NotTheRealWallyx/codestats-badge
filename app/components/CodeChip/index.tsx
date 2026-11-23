import type { ReactNode } from 'react';

interface CodeChipProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

export default function CodeChip({ children, size = 'md' }: CodeChipProps) {
  const textSize = size === 'sm' ? 'text-[0.6875rem]' : 'text-xs';

  return (
    <code
      className={`rounded-md border border-blue-500/18 bg-blue-500/10 px-2 py-[0.15rem] font-mono text-blue-400 ${textSize}`}
    >
      {children}
    </code>
  );
}
