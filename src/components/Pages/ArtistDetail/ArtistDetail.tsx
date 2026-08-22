'use client';

import { Album as AlbumIcon, Disc } from 'lucide-react';
import { useEffect, useId } from 'react';

import { ArtistNotFound } from './ArtistNotFound';
import { AlbumSection } from './parts';

import type { Album } from '@/components/Pages/Dashboard';

import { mockArtists } from '@/components/Pages/Dashboard';
import {
  DetailHero,
  PAGE_MAIN_GRADIENT_ALBUM_DETAIL,
  PageMain,
  ShuffleButton,
} from '@/components/ui';

interface ArtistDetailPageProps {
  artistId: string;
}

const getSinglesEPSubtitle = (album: Album): string => {
  const releaseDateLabel = album.releaseDateLabel.trim() || '発売日不明';
  return `${releaseDateLabel} • シングル・EP`;
};

const getAlbumSubtitle = (album: Album): string => {
  const releaseDateLabel = album.releaseDateLabel.trim() || '発売日不明';
  const typeLabel =
    album.type === 'compilation' ? 'コンピレーション' : 'アルバム';
  return `${releaseDateLabel} • ${typeLabel} • ${String(album.tracks.length)}曲`;
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

  const artistName = artist.name.trim() || 'アーティスト名不明';
  const singlesAndEPs = artist.albums.filter(
    (album) => album.type === 'single'
  );
  const albums = artist.albums.filter((album) => album.type !== 'single');
  const playableAlbums = artist.albums.filter(
    (album) => album.type !== 'single' && album.isPlayable !== false
  );

  return (
    <PageMain className={PAGE_MAIN_GRADIENT_ALBUM_DETAIL}>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        {/* アーティスト情報ヘッダー */}
        <DetailHero
          imageUrl={artist.imageUrl}
          imageAlt={artistName}
          variant="artist"
        >
          <div className="mb-2 text-xs lg:text-sm">アーティスト</div>
          <h1 className="mb-6 text-3xl sm:text-4xl lg:text-7xl">
            {artistName}
          </h1>

          <div className="text-sm text-[var(--spotify-light-gray)]">
            <span>{playableAlbums.length}枚のアルバム・コンピレーション</span>
          </div>
        </DetailHero>

        {/* アクションボタン */}
        <div className="mb-12 flex items-center gap-4">
          <ShuffleButton
            size="lg"
            ariaLabel={`${artistName}をシャッフル再生`}
            disabled={playableAlbums.length === 0}
          />
        </div>

        {/* シングル・EP一覧 */}
        {singlesAndEPs.length > 0 && (
          <AlbumSection
            icon={Disc}
            title="シングル・EP"
            albums={singlesAndEPs}
            headingId={singlesHeadingId}
            getSubtitle={getSinglesEPSubtitle}
            listHref={`/artist/${artist.id}/singles-eps`}
          />
        )}

        {/* アルバム一覧 */}
        {albums.length > 0 && (
          <AlbumSection
            icon={AlbumIcon}
            title="アルバム・コンピレーション"
            albums={albums}
            headingId={albumsHeadingId}
            getSubtitle={getAlbumSubtitle}
            listHref={`/artist/${artist.id}/albums`}
          />
        )}

        {/* アルバムがない場合 */}
        {artist.albums.length === 0 && (
          <div className="py-12 text-center text-[var(--spotify-light-gray)]">
            このアーティストのアルバムはまだありません
          </div>
        )}
      </div>
    </PageMain>
  );
};
