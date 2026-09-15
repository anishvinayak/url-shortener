import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900">
      <div className="mb-4 inline-flex rounded-2xl bg-blue-500/10 p-3 text-blue-400 group-hover:bg-blue-500/20">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-zinc-400">
        {description}
      </p>
    </div>
  );
}