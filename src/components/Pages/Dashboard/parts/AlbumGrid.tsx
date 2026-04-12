import Image from 'next/image';
import Link from 'next/link';

import type { Album } from '../MockData';

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
      <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
        {albums.map((album) => (
          <li key={album.id}>
            <Link
              href={`/album/${album.id}`}
              className="group block w-full rounded-lg bg-[var(--spotify-darker)] p-3 text-left transition-all hover:bg-[var(--spotify-gray)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 sm:p-4"
            >
              <span className="relative mb-3 block sm:mb-4">
                <Image
                  src={album.coverUrl}
                  alt=""
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-md object-cover shadow-lg"
                />
              </span>
              <span className="mb-1 block truncate text-xs sm:text-sm">
                {album.name}
              </span>
              <span className="block truncate text-xs">{album.artist}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
