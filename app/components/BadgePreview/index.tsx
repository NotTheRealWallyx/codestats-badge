import Image from 'next/image';
import './styles.css';

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
    <div className="badge-card glass-card">
      {(label || param) && (
        <div className="badge-card-header">
          {label && <span className="badge-card-label">{label}</span>}
          {param && <code className="badge-card-param">{param}</code>}
        </div>
      )}
      <div className="badge-card-image">
        <Image
          src={src}
          alt={alt}
          width={480}
          height={140}
          unoptimized
          style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
        />
      </div>
      {desc && <p className="badge-card-desc">{desc}</p>}
    </div>
  );
}
