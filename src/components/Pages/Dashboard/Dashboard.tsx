'use client';

import { Album, Heart, User } from 'lucide-react';
import { useId } from 'react';

import { mockAlbums, mockArtists } from './MockData';
import { AlbumGrid, ArtistGrid, PlaybackCard } from './parts';

import type { Album as AlbumType } from './MockData';

interface DashboardPageProps {
  onStartPlayback?: (albums: AlbumType[], mode: 'albums' | 'artists') => void;
  onNavigateToAlbum?: (albumId: string) => void;
  onNavigateToArtist?: (artistId: string) => void;
}

export const DashboardPage = ({
  onStartPlayback,
  onNavigateToAlbum,
  onNavigateToArtist,
}: DashboardPageProps) => {
  const favoriteAlbumsId = useId();
  const favoriteArtistsId = useId();

  const handlePlayAlbums = () => {
    // アルバムとEPのみを対象にする（シングルを除外）
    const albumsAndEPs = mockAlbums.filter(
      (album) => album.type === 'album' || album.type === 'ep'
    );
    onStartPlayback?.(albumsAndEPs, 'albums');
  };

  const handlePlayArtists = () => {
    // お気に入りアーティストのアルバムとEPのみを集める（シングルを除外）
    const allArtistAlbums = mockArtists.flatMap((artist) =>
      artist.albums.filter(
        (album) => album.type === 'album' || album.type === 'ep'
      )
    );
    onStartPlayback?.(allArtistAlbums, 'artists');
  };

  // アルバム・EPの総数を計算
  const albumsAndEPsCount = mockAlbums.filter(
    (album) => album.type === 'album' || album.type === 'ep'
  ).length;

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-b from-[#1a1a1a] to-[var(--spotify-dark)]">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8 lg:mb-12">
          <h1 className="mb-2 text-3xl lg:mb-3 lg:text-5xl">
            アルバムランダム再生
          </h1>
          <p className="text-sm text-[var(--spotify-light-gray)] lg:text-base">
            アルバム単位で音楽をランダムに楽しもう
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:gap-6 lg:mb-12">
          <PlaybackCard
            icon={Heart}
            iconBgClassName="bg-purple-600"
            gradientClassName="from-purple-900/40 to-blue-900/40 hover:from-purple-900/50 hover:to-blue-900/50"
            title="お気に入りアルバム"
            description="保存したアルバムをランダムに再生します"
            statsIcon={Album}
            statsLabel={`${String(albumsAndEPsCount)}枚のアルバム`}
            onClick={handlePlayAlbums}
          />
          <PlaybackCard
            icon={User}
            iconBgClassName="bg-green-600"
            gradientClassName="from-green-900/40 to-emerald-900/40 hover:from-green-900/50 hover:to-emerald-900/50"
            title="お気に入りアーティスト"
            description="フォローしているアーティストのアルバムをランダムに再生します"
            statsIcon={User}
            statsLabel={`${String(mockArtists.length)}人のアーティスト`}
            onClick={handlePlayArtists}
          />
        </div>

        <AlbumGrid
          albums={mockAlbums}
          headingId={favoriteAlbumsId}
          onNavigateToAlbum={onNavigateToAlbum}
        />
        <ArtistGrid
          artists={mockArtists}
          headingId={favoriteArtistsId}
          onNavigateToArtist={onNavigateToArtist}
        />
      </div>
    </main>
  );
};
