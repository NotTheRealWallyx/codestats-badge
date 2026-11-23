interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="glass-card p-7">
      <div className="mb-3.5 text-[2rem]">{icon}</div>
      <h3 className="mb-2 text-[0.9375rem] font-bold text-zinc-50">{title}</h3>
      <p className="text-sm leading-[1.6] text-zinc-500">{desc}</p>
    </div>
  );
}
