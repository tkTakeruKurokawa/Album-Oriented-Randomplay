import type { Album } from '@/components/Pages/Dashboard';
import type { LucideIcon } from 'lucide-react';

import { Grid, MediaCard } from '@/components/ui';

interface AlbumSectionProps {
  icon: LucideIcon;
  title: string;
  albums: Album[];
  headingId: string;
  getSubtitle: (album: Album) => string;
}

export const AlbumSection = ({
  icon: Icon,
  title,
  albums,
  headingId,
  getSubtitle,
}: AlbumSectionProps) => {
  return (
    <section className="mb-12" aria-labelledby={headingId}>
      <div className="mb-6 flex items-center gap-3">
        <Icon size={24} className="text-[var(--spotify-green)]" />
        <h2 id={headingId} className="text-xl lg:text-3xl">
          {title}
        </h2>
      </div>

      <Grid>
        {albums.map((album) => (
          <MediaCard
            key={album.id}
            href={`/album/${album.id}`}
            imageUrl={album.coverUrl}
            variant="album"
            title={album.name}
            subtitle={getSubtitle(album)}
          />
        ))}
      </Grid>
    </section>
  );
};
