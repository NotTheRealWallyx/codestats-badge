'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-[1.125rem] text-[0.8125rem] font-medium whitespace-nowrap transition-all duration-200 ${
        copied
          ? 'border-green-400/25 bg-green-500/10 text-green-400'
          : 'border-white/8 bg-white/6 text-zinc-400'
      }`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
