import { getPlaybackRestrictionMessage } from '@/lib/spotify/restrictions';

interface TrackListItemProps {
  discNumber?: number;
  trackNumber: number;
  name: string;
  duration: string;
  explicit?: boolean;
  isPlayable?: boolean;
  restrictionReason?: string;
  onClick?: () => void;
}

export const TrackListItem = ({
  discNumber = 1,
  trackNumber,
  name,
  duration,
  explicit = false,
  isPlayable,
  restrictionReason,
  onClick,
}: TrackListItemProps) => {
  const isUnavailable = isPlayable === false;
  const displayName = name.trim() || '曲名不明';
  const trackNumberLabel =
    discNumber > 1
      ? `${String(discNumber)}-${String(trackNumber)}`
      : trackNumber;
  const unavailableMessage = isUnavailable
    ? getPlaybackRestrictionMessage(restrictionReason)
    : null;

  return (
    <button
      type="button"
      className="group flex w-full cursor-pointer items-center gap-4 rounded-md p-3 text-left transition-colors hover:bg-[var(--spotify-gray)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      onClick={onClick}
      disabled={isUnavailable}
      title={unavailableMessage ?? undefined}
    >
      <div className="w-8 text-center text-[var(--spotify-light-gray)] group-hover:text-white">
        <span className="text-sm">{trackNumberLabel}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate">{displayName}</span>
          {explicit ? (
            <span
              className="shrink-0 text-xs font-bold text-[var(--spotify-light-gray)]"
              aria-label="露骨な表現を含む"
              title="露骨な表現を含む"
            >
              E
            </span>
          ) : null}
        </div>
        {unavailableMessage ? (
          <div className="truncate text-xs text-[var(--spotify-light-gray)]">
            {unavailableMessage}
          </div>
        ) : null}
      </div>

      <span className="w-12 text-right text-sm text-[var(--spotify-light-gray)]">
        {duration}
      </span>
    </button>
  );
};
