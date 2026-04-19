import type { Artist } from '../MockData';

import { Grid, MediaCard } from '@/components/ui';

interface ArtistGridProps {
  artists: Artist[];
  headingId: string;
}

export const ArtistGrid = ({ artists, headingId }: ArtistGridProps) => {
  return (
    <section className="pb-4" aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-4 text-xl lg:mb-6 lg:text-3xl">
        お気に入りアーティスト
      </h2>
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
