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
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center gap-4 rounded-md p-3 text-left transition-colors hover:bg-[var(--spotify-gray)]"
      onClick={onClick}
      aria-label={`${name}を再生`}
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
    </button>
  );
};
