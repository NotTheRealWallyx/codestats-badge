import Image from 'next/image';
import CodeChip from '../CodeChip';

interface BadgePreviewProps {
  src: string;
  alt: string;
  label?: string;
  param?: string;
  desc?: string;
}

export default function BadgePreview({
  src,
  alt,
  label,
  param,
  desc,
}: BadgePreviewProps) {
  return (
    <div className="glass-card flex flex-col gap-3.5 p-5">
      {(label || param) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {label && (
            <span className="text-sm font-semibold text-zinc-200">{label}</span>
          )}
          {param && <CodeChip size="sm">{param}</CodeChip>}
        </div>
      )}
      <div className="flex items-center justify-center overflow-hidden rounded-lg bg-black/25 px-3 py-4">
        <Image
          src={src}
          alt={alt}
          width={480}
          height={140}
          unoptimized
          className="block h-auto max-w-full"
        />
      </div>
      {desc && (
        <p className="text-[0.8125rem] leading-[1.5] text-zinc-500">{desc}</p>
      )}
    </div>
  );
}
