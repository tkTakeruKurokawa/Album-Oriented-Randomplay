import Image from 'next/image';

import type { Artist } from '../MockData';

interface ArtistGridProps {
  artists: Artist[];
  headingId: string;
  onNavigateToArtist?: (artistId: string) => void;
}

export const ArtistGrid = ({
  artists,
  headingId,
  onNavigateToArtist,
}: ArtistGridProps) => {
  return (
    <section className="pb-4" aria-labelledby={headingId}>
      <h2 id={headingId} className="mb-4 text-xl lg:mb-6 lg:text-3xl">
        お気に入りアーティスト
      </h2>
      <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
        {artists.map((artist) => (
          <li key={artist.id}>
            <button
              type="button"
              onClick={() => {
                onNavigateToArtist?.(artist.id);
              }}
              className="group w-full cursor-pointer rounded-lg bg-[var(--spotify-darker)] p-3 text-left transition-all hover:bg-[var(--spotify-gray)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 sm:p-4"
            >
              <span className="relative mb-3 block sm:mb-4">
                <Image
                  src={artist.imageUrl}
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-full object-cover shadow-lg"
                  alt=""
                />
              </span>
              <span className="mb-1 block truncate text-center text-xs sm:text-sm">
                {artist.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
