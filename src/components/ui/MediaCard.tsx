import Image from 'next/image';
import Link from 'next/link';

type MediaCardVariant = 'album' | 'artist';

interface MediaCardProps {
  href: string;
  imageUrl: string;
  variant?: MediaCardVariant;
  title: string;
  subtitle?: string;
}

const imageClasses: Record<MediaCardVariant, string> = {
  album: 'aspect-square w-full rounded-md object-cover shadow-lg',
  artist: 'aspect-square w-full rounded-full object-cover shadow-lg',
};

const titleClasses: Record<MediaCardVariant, string> = {
  album: 'mb-1 block truncate text-xs sm:text-sm',
  artist: 'mb-1 block truncate text-center text-xs sm:text-sm',
};

export const MediaCard = ({
  href,
  imageUrl,
  variant = 'album',
  title,
  subtitle,
}: MediaCardProps) => {
  return (
    <li>
      <Link
        href={href}
        className="group block w-full rounded-lg bg-[var(--spotify-darker)] p-3 text-left transition-all hover:bg-[var(--spotify-gray)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 sm:p-4"
      >
        <span className="relative mb-3 block sm:mb-4">
          <Image
            src={imageUrl}
            alt=""
            width={300}
            height={300}
            className={imageClasses[variant]}
          />
        </span>
        <span className={titleClasses[variant]}>{title}</span>
        {subtitle ? (
          <span className="block truncate text-xs">{subtitle}</span>
        ) : null}
      </Link>
    </li>
  );
};
