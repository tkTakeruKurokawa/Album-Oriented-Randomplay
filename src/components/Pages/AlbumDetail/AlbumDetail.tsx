'use client';

import { Play, Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { AlbumNotFound } from './AlbumNotFound';

import type { Album } from '@/components/Pages/Dashboard';

import { mockAlbums } from '@/components/Pages/Dashboard';

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
  }
};

export const AlbumDetailPage = ({ albumId }: AlbumDetailPageProps) => {
  const router = useRouter();
  const album = mockAlbums.find((a) => a.id === albumId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [albumId]);

  if (!album) {
    return <AlbumNotFound />;
  }

  return (
    <div className="min-h-screen overflow-auto bg-gradient-to-b from-[#3d2a5c] via-[#1a1a2e] to-[var(--spotify-dark)]">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* アルバム情報ヘッダー */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* アルバムカバー */}
          <div className="mx-auto w-full max-w-[280px] shrink-0 lg:mx-0 lg:h-64 lg:w-64">
            <Image
              src={album.coverUrl}
              alt={album.name}
              width={300}
              height={300}
              className="h-full w-full rounded-lg object-cover shadow-2xl"
            />
          </div>

          {/* アルバム詳細 */}
          <div className="flex flex-1 flex-col justify-end">
            <div className="mb-2 text-xs lg:text-sm">
              {getAlbumTypeLabel(album.type)}
            </div>
            <h1 className="mb-4 text-3xl sm:text-4xl lg:text-6xl">
              {album.name}
            </h1>

            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  router.push(`/artist/${String(album.artistId)}`);
                }}
                className="hover:underline"
              >
                {album.artist}
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-[var(--spotify-light-gray)]">
              <span>{album.releaseYear}</span>
              <span>•</span>
              <span>{album.tracks.length}曲</span>
              <span>•</span>
              <span>{formatTime(album.totalDuration)}</span>
              <span>•</span>
              <span>{album.label}</span>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="mb-8 flex items-center gap-4">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--spotify-green)] shadow-lg transition-transform hover:scale-105"
          >
            <Play size={24} className="ml-1 text-black" fill="black" />
          </button>

          <button
            type="button"
            className="transition-transform hover:scale-110"
          >
            <Heart
              size={32}
              className="text-[var(--spotify-green)]"
              fill="currentColor"
            />
          </button>
        </div>

        {/* トラックリスト */}
        <div className="max-w-6xl">
          <div className="space-y-1">
            {album.tracks.map((track) => (
              <div
                key={track.id}
                className="group flex cursor-pointer items-center gap-4 rounded-md p-3 transition-colors hover:bg-[var(--spotify-gray)]"
              >
                <div className="w-8 text-center text-[var(--spotify-light-gray)] group-hover:text-white">
                  <span className="text-sm">{track.trackNumber}</span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate">{track.name}</div>
                </div>

                <span className="w-12 text-right text-sm text-[var(--spotify-light-gray)]">
                  {formatTime(track.duration)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
