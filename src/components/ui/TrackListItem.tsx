interface TrackListItemProps {
  trackNumber: number;
  name: string;
  duration: string;
  onClick?: () => void;
}

export const TrackListItem = ({
  trackNumber,
  name,
  duration,
  onClick,
}: TrackListItemProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="group flex cursor-pointer items-center gap-4 rounded-md p-3 transition-colors hover:bg-[var(--spotify-gray)]"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="w-8 text-center text-[var(--spotify-light-gray)] group-hover:text-white">
        <span className="text-sm">{trackNumber}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate">{name}</div>
      </div>

      <span className="w-12 text-right text-sm text-[var(--spotify-light-gray)]">
        {duration}
      </span>
    </div>
  );
};
