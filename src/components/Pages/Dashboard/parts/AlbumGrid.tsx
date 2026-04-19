import type { Album } from '../MockData';

import { Grid, GridCard } from '@/components/ui';

interface AlbumGridProps {
  albums: Album[];
  headingId: string;
}

export const AlbumGrid = ({ albums, headingId }: AlbumGridProps) => {
  return (
    <section className="mb-8" aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-4 text-xl lg:mb-6 lg:text-3xl">
        お気に入りアルバム
      </h2>
      <Grid>
        {albums.map((album) => (
          <GridCard
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
