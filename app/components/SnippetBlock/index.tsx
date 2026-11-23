import CopyButton from '../CopyButton';

interface SnippetBlockProps {
  title: string;
  snippet: string;
}

export default function SnippetBlock({ title, snippet }: SnippetBlockProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-[0.06em] text-zinc-500 uppercase">
        {title}
      </p>
      <div className="flex items-stretch gap-2">
        <div className="code-block">{snippet}</div>
        <CopyButton text={snippet} />
      </div>
    </div>
  );
}
