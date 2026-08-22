import { CircleSlash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PlayButton } from './PlayButton';
import { ShuffleButton } from './ShuffleButton';

import { FALLBACK_MEDIA_IMAGE_URL } from '@/lib/placeholder';
import { getPlaybackRestrictionMessage } from '@/lib/spotify/restrictions';

type MediaCardVariant = 'album' | 'artist';
type MediaCardAction = 'play' | 'shuffle';
type MediaCardActionMobileVisibility = 'always' | 'hidden';

interface MediaCardProps {
  href: string;
  imageUrl?: string | null;
  variant?: MediaCardVariant;
  title: string;
  subtitle?: string;
  action?: MediaCardAction;
  actionMobileVisibility?: MediaCardActionMobileVisibility;
  onActionClick?: () => void;
  isPlayable?: boolean;
  restrictionReason?: string;
}

const imageClasses: Record<MediaCardVariant, string> = {
  album: 'aspect-square w-full rounded-md object-cover shadow-lg',
  artist: 'aspect-square w-full rounded-full object-cover shadow-lg',
};

const titleClasses: Record<MediaCardVariant, string> = {
  album: 'mb-1 block truncate text-xs sm:text-sm',
  artist: 'mb-1 block truncate text-center text-xs sm:text-sm',
};

const subtitleClasses: Record<MediaCardVariant, string> = {
  album: 'block truncate text-xs',
  artist: 'block truncate text-center text-xs',
};

const actionVisibilityClasses: Record<MediaCardActionMobileVisibility, string> =
  {
    always:
      'md:translate-y-2 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100',
    hidden:
      'hidden md:block md:translate-y-2 md:opacity-0 md:transition-all md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100',
  };

export const MediaCard = ({
  href,
  imageUrl,
  variant = 'album',
  title,
  subtitle,
  action,
  actionMobileVisibility = 'always',
  onActionClick,
  isPlayable,
  restrictionReason,
}: MediaCardProps) => {
  const trimmedTitle = title.trim();
  const trimmedSubtitle = subtitle?.trim();
  const trimmedImageUrl = imageUrl?.trim();
  const displayTitle =
    trimmedTitle.length > 0
      ? trimmedTitle
      : variant === 'artist'
        ? 'アーティスト名不明'
        : 'タイトル不明';
  const displaySubtitle =
    trimmedSubtitle && trimmedSubtitle.length > 0 ? trimmedSubtitle : undefined;
  const displayImageUrl =
    trimmedImageUrl && trimmedImageUrl.length > 0
      ? trimmedImageUrl
      : FALLBACK_MEDIA_IMAGE_URL;
  const isUnavailable = isPlayable === false;
  const unavailableMessage = isUnavailable
    ? getPlaybackRestrictionMessage(restrictionReason)
    : null;
  const actionButton =
    action === 'play' ? (
      <PlayButton
        size="sm"
        iconSize={18}
        onClick={onActionClick}
        ariaLabel={`${displayTitle}を再生`}
        disabled={isUnavailable}
      />
    ) : action === 'shuffle' ? (
      <ShuffleButton
        size="sm"
        onClick={onActionClick}
        ariaLabel={`${displayTitle}をシャッフル再生`}
        disabled={isUnavailable}
      />
    ) : null;

  return (
    <div className="group relative w-full rounded-lg bg-[var(--spotify-darker)] p-3 transition-all hover:bg-[var(--spotify-gray)] active:scale-95 sm:p-4">
      <Link
        href={href}
        aria-label={`${displayTitle}${displaySubtitle ? ` ${displaySubtitle}` : ''}を開く`}
        className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />

      <div className="pointer-events-none relative z-10">
        <span className="relative mb-3 block sm:mb-4">
          <Image
            src={displayImageUrl}
            alt=""
            width={300}
            height={300}
            className={imageClasses[variant]}
          />
          {unavailableMessage ? (
            <span
              className="pointer-events-auto absolute top-2 left-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white"
              aria-label={unavailableMessage}
              title={unavailableMessage}
            >
              <CircleSlash2 size={18} aria-hidden="true" />
            </span>
          ) : null}
          {actionButton ? (
            <span
              className={`pointer-events-auto absolute right-2 bottom-2 z-20 ${actionVisibilityClasses[actionMobileVisibility]}`}
            >
              {actionButton}
            </span>
          ) : null}
        </span>
        <span className={titleClasses[variant]}>{displayTitle}</span>
        {displaySubtitle ? (
          <span className={subtitleClasses[variant]}>{displaySubtitle}</span>
        ) : null}
      </div>
    </div>
  );
};
