'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { AlbumNotFound } from './AlbumNotFound';

import type { Album } from '@/components/Pages/Dashboard';

import { mockAlbums } from '@/components/Pages/Dashboard';
import {
  DetailHero,
  FavoriteButton,
  PlayButton,
  TrackListItem,
} from '@/components/ui';

interface AlbumDetailPageProps {
  albumId: string;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins)}:${String(secs).padStart(2, '0')}`;
};

const getAlbumTypeLabel = (type: Album['type']): string => {
  switch (type) {
    case 'single': {
      return 'シングル';
    }
    case 'ep': {
      return 'EP';
    }
    case 'album': {
      return 'アルバム';
    }
    default: {
      return 'アルバム';
    }
  }
};

export const AlbumDetailPage = ({ albumId }: AlbumDetailPageProps) => {
  const album = mockAlbums.find((a) => a.id === albumId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [albumId]);

  if (!album) {
    return <AlbumNotFound />;
  }

  return (
    <main className="page-with-fixed-header bg-gradient-album-detail overflow-auto">
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        {/* アルバム情報ヘッダー */}
        <DetailHero imageUrl={album.coverUrl} imageAlt={album.name}>
          <div className="mb-2 text-xs lg:text-sm">
            {getAlbumTypeLabel(album.type)}
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-6xl">
            {album.name}
          </h1>

          <div className="mb-4 flex items-center gap-2">
            <Link
              href={`/artist/${album.artistId}`}
              className="hover:underline"
            >
              {album.artist}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--spotify-light-gray)]">
            <span>{album.releaseYear}</span>
            <span aria-hidden="true">•</span>
            <span>{album.tracks.length}曲</span>
            <span aria-hidden="true">•</span>
            <span>{formatTime(album.totalDuration)}</span>
            <span aria-hidden="true">•</span>
            <span>{album.label}</span>
          </div>
        </DetailHero>

        {/* アクションボタン */}
        <div className="mb-8 flex items-center gap-4">
          <PlayButton />

          <FavoriteButton isFavorited />
        </div>

        {/* トラックリスト */}
        <div className="max-w-6xl">
          <ol className="list-none space-y-1">
            {album.tracks.map((track) => (
              <li key={track.id}>
                <TrackListItem
                  trackNumber={track.trackNumber}
                  name={track.name}
                  duration={formatTime(track.duration)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
};
