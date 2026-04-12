import { Shuffle } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

interface PlaybackCardProps {
  icon: LucideIcon;
  iconBgClassName: string;
  gradientClassName: string;
  title: string;
  description: string;
  statsIcon: LucideIcon;
  statsLabel: string;
  onClick: () => void;
}

export const PlaybackCard = ({
  icon: Icon,
  iconBgClassName,
  gradientClassName,
  title,
  description,
  statsIcon: StatsIcon,
  statsLabel,
  onClick,
}: PlaybackCardProps) => {
  return (
    <button
      type="button"
      className={`group cursor-pointer rounded-xl bg-gradient-to-br p-6 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] lg:rounded-2xl lg:p-8 ${gradientClassName}`}
      onClick={onClick}
    >
      <span className="mb-4 flex items-start justify-between lg:mb-6">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-xl lg:h-16 lg:w-16 lg:rounded-2xl ${iconBgClassName}`}
          aria-hidden="true"
        >
          <Icon size={24} className="lg:hidden" />
          <Icon size={32} className="hidden lg:block" />
        </span>
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spotify-green)] opacity-100 shadow-lg transition-all active:scale-95 lg:opacity-0 lg:group-hover:opacity-100"
          aria-hidden="true"
        >
          <Shuffle size={24} className="text-black" />
        </span>
      </span>

      <h2 className="mb-2 block text-xl lg:mb-3 lg:text-3xl">{title}</h2>
      <span className="mb-4 block text-sm lg:mb-6 lg:text-base">
        {description}
      </span>

      <span
        className="flex items-center gap-2 text-xs opacity-70 lg:text-sm"
        aria-hidden="true"
      >
        <StatsIcon size={16} className="lg:hidden" />
        <StatsIcon size={18} className="hidden lg:block" />
        <span>{statsLabel}</span>
      </span>
    </button>
  );
};
