'use client';

import { Album as AlbumIcon, Disc } from 'lucide-react';
import { useEffect, useId } from 'react';

import { ArtistNotFound } from './ArtistNotFound';
import { AlbumSection } from './parts';

import type { Album } from '@/components/Pages/Dashboard';

import { mockArtists } from '@/components/Pages/Dashboard';
import { DetailHero, FavoriteButton, PlayButton } from '@/components/ui';

interface ArtistDetailPageProps {
  artistId: string;
}

const getSinglesEPSubtitle = (album: Album): string => {
  const typeLabel = album.type === 'single' ? 'シングル' : 'EP';
  return `${String(album.releaseYear)} • ${typeLabel}`;
};

const getAlbumSubtitle = (album: Album): string => {
  return `${String(album.releaseYear)} • ${String(album.tracks.length)}曲`;
};

export const ArtistDetailPage = ({ artistId }: ArtistDetailPageProps) => {
  const singlesHeadingId = useId();
  const albumsHeadingId = useId();
  const artist = mockArtists.find((a) => a.id === artistId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artistId]);

  if (!artist) {
    return <ArtistNotFound />;
  }

  const singlesAndEPs = artist.albums.filter(
    (album) => album.type === 'single' || album.type === 'ep'
  );
  const albums = artist.albums.filter((album) => album.type === 'album');
  // ランダム再生対象（アルバム + EP、シングルは除外）
  const playableAlbums = artist.albums.filter(
    (album) => album.type === 'album' || album.type === 'ep'
  );

  return (
    <div className="min-h-screen overflow-auto bg-gradient-to-b from-[#4a3d5c] via-[#1a1a2e] to-[var(--spotify-dark)]">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* アーティスト情報ヘッダー */}
        <DetailHero
          imageUrl={artist.imageUrl}
          imageAlt={artist.name}
          variant="artist"
        >
          <div className="mb-2 text-xs lg:text-sm">アーティスト</div>
          <h1 className="mb-6 text-3xl sm:text-4xl lg:text-7xl">
            {artist.name}
          </h1>

          <div className="text-sm text-[var(--spotify-light-gray)]">
            <span>{playableAlbums.length}枚のアルバム・EP</span>
          </div>
        </DetailHero>

        {/* アクションボタン */}
        <div className="mb-12 flex items-center gap-4">
          <PlayButton />

          <FavoriteButton isFavorited />
        </div>

        {/* シングル・EP一覧 */}
        {singlesAndEPs.length > 0 && (
          <AlbumSection
            icon={Disc}
            title="シングル・EP"
            albums={singlesAndEPs}
            headingId={singlesHeadingId}
            getSubtitle={getSinglesEPSubtitle}
          />
        )}

        {/* アルバム一覧 */}
        {albums.length > 0 && (
          <AlbumSection
            icon={AlbumIcon}
            title="アルバム"
            albums={albums}
            headingId={albumsHeadingId}
            getSubtitle={getAlbumSubtitle}
          />
        )}

        {/* アルバムがない場合 */}
        {artist.albums.length === 0 && (
          <div className="py-12 text-center text-[var(--spotify-light-gray)]">
            このアーティストのアルバムはまだありません
          </div>
        )}
      </div>
    </div>
  );
};
