import Link from 'next/link';

import type { Artist } from '../MockData';

import { Grid, MediaCard } from '@/components/ui';

interface ArtistGridProps {
  artists: Artist[];
  headingId: string;
  listHref?: string;
  totalCount?: number;
}

export const ArtistGrid = ({
  artists,
  headingId,
  listHref,
  totalCount,
}: ArtistGridProps) => {
  const shouldShowAllLink =
    listHref !== undefined &&
    totalCount !== undefined &&
    totalCount > artists.length;

  return (
    <section className="pb-4" aria-labelledby={headingId}>
      <div className="mb-4 flex items-center justify-between lg:mb-6">
        <h2 id={headingId} className="text-xl lg:text-3xl">
          お気に入りアーティスト
        </h2>
        {shouldShowAllLink ? (
          <Link
            href={listHref}
            className="text-sm font-bold text-[var(--spotify-light-gray)] transition-colors hover:text-white"
          >
            すべて表示
          </Link>
        ) : null}
      </div>
      <Grid>
        {artists.map((artist) => (
          <MediaCard
            key={artist.id}
            href={`/artist/${artist.id}`}
            imageUrl={artist.imageUrl}
            variant="artist"
            title={artist.name}
          />
        ))}
      </Grid>
    </section>
  );
};
