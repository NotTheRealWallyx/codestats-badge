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
      style={{
        flexShrink: 0,
        padding: '0 1.125rem',
        borderRadius: '0.75rem',
        border: `1px solid ${copied ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.08)'}`,
        background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.06)',
        color: copied ? '#4ade80' : '#a1a1aa',
        fontSize: '0.8125rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        minHeight: '2.75rem',
      }}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
