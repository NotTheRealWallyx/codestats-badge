import Image from 'next/image';
import './styles.css';

interface Options {
  text: string;
  code: string;
}

interface BadgePreviewProps {
  src: string;
  alt: string;
  description?: string;
  options?: Options;
}

export default function BadgePreview({
  src,
  alt,
  description,
  options,
}: BadgePreviewProps) {
  return (
    <div className="badge-preview">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={180}
        className="badge-preview-image"
        unoptimized
      />
      {options && (
        <span className="badge-preview-options">
          {options.text}: <code>{options.code}</code>
        </span>
      )}
      {description && (
        <p className="badge-preview-description">{description}</p>
      )}
    </div>
  );
}
