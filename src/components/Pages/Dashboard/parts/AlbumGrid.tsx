import Link from 'next/link';

import type { Album } from '../MockData';

import { Grid, MediaCard } from '@/components/ui';

interface AlbumGridProps {
  albums: Album[];
  headingId: string;
  listHref?: string;
  totalCount?: number;
}

export const AlbumGrid = ({
  albums,
  headingId,
  listHref,
  totalCount,
}: AlbumGridProps) => {
  const shouldShowAllLink =
    listHref !== undefined &&
    totalCount !== undefined &&
    totalCount > albums.length;

  return (
    <section className="mb-8" aria-labelledby={headingId}>
      <div className="mb-4 flex items-center justify-between lg:mb-6">
        <h2 id={headingId} className="text-xl lg:text-3xl">
          お気に入りアルバム
        </h2>
        {shouldShowAllLink ? (
          <Link
            href={listHref}
            className="text-sm text-[var(--spotify-light-gray)] transition-colors hover:text-white"
          >
            すべて表示
          </Link>
        ) : null}
      </div>
      <Grid>
        {albums.map((album) => (
          <MediaCard
            key={album.id}
            href={`/album/${album.id}`}
            imageUrl={album.coverUrl}
            variant="album"
            title={album.name}
            subtitle={album.artist}
          />
        ))}
      </Grid>
    </section>
  );
};
