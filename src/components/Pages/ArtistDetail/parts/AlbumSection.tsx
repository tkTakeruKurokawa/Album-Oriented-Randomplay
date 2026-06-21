import Link from 'next/link';

import type { Album } from '@/components/Pages/Dashboard';
import type { LucideIcon } from 'lucide-react';

import { Grid, MediaCard } from '@/components/ui';

interface AlbumSectionProps {
  icon: LucideIcon;
  title: string;
  albums: Album[];
  headingId: string;
  getSubtitle: (album: Album) => string;
  listHref?: string;
}

export const AlbumSection = ({
  icon: Icon,
  title,
  albums,
  headingId,
  getSubtitle,
  listHref,
}: AlbumSectionProps) => {
  return (
    <section className="mb-12" aria-labelledby={headingId}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Icon size={24} className="shrink-0 text-[var(--spotify-green)]" />
          <h2 id={headingId} className="text-xl lg:text-3xl">
            {title}
          </h2>
        </div>

        {listHref ? (
          <Link
            href={listHref}
            className="shrink-0 text-sm font-bold text-[var(--spotify-light-gray)] transition-colors hover:text-white"
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
            subtitle={getSubtitle(album)}
            action="play"
            actionMobileVisibility="hidden"
          />
        ))}
      </Grid>
    </section>
  );
};
