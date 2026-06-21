import Image from 'next/image';
import Link from 'next/link';

import { PlayButton } from './PlayButton';
import { ShuffleButton } from './ShuffleButton';

type MediaCardVariant = 'album' | 'artist';
type MediaCardAction = 'play' | 'shuffle';
type MediaCardActionMobileVisibility = 'always' | 'hidden';

interface MediaCardProps {
  href: string;
  imageUrl: string;
  variant?: MediaCardVariant;
  title: string;
  subtitle?: string;
  action?: MediaCardAction;
  actionMobileVisibility?: MediaCardActionMobileVisibility;
  onActionClick?: () => void;
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
}: MediaCardProps) => {
  const actionButton =
    action === 'play' ? (
      <PlayButton
        size="sm"
        iconSize={18}
        onClick={onActionClick}
        ariaLabel={`${title}を再生`}
      />
    ) : action === 'shuffle' ? (
      <ShuffleButton
        size="sm"
        onClick={onActionClick}
        ariaLabel={`${title}をシャッフル再生`}
      />
    ) : null;

  return (
    <div className="group relative w-full rounded-lg bg-[var(--spotify-darker)] p-3 transition-all hover:bg-[var(--spotify-gray)] active:scale-95 sm:p-4">
      <Link
        href={href}
        aria-label={`${title}${subtitle ? ` ${subtitle}` : ''}を開く`}
        className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />

      <div className="pointer-events-none relative z-10">
        <span className="relative mb-3 block sm:mb-4">
          <Image
            src={imageUrl}
            alt=""
            width={300}
            height={300}
            className={imageClasses[variant]}
          />
          {actionButton ? (
            <span
              className={`pointer-events-auto absolute right-2 bottom-2 z-20 ${actionVisibilityClasses[actionMobileVisibility]}`}
            >
              {actionButton}
            </span>
          ) : null}
        </span>
        <span className={titleClasses[variant]}>{title}</span>
        {subtitle ? (
          <span className={subtitleClasses[variant]}>{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
};
