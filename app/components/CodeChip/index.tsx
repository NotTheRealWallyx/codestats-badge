import type { ReactNode } from 'react';

interface CodeChipProps {
  children: ReactNode;
}

export default function CodeChip({ children }: CodeChipProps) {
  return (
    <code className="rounded-md border border-blue-500/18 bg-blue-500/10 px-2 py-[0.15rem] font-mono text-xs text-blue-400">
      {children}
    </code>
  );
}
