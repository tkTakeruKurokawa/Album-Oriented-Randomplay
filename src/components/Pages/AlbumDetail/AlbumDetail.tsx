'use client';

import Link from 'next/link';
import { Fragment, useEffect } from 'react';

import { AlbumNotFound } from './AlbumNotFound';

import type { Album } from '@/components/Pages/Dashboard';

import { mockAlbums } from '@/components/Pages/Dashboard';
import {
  DetailHero,
  FavoriteButton,
  PAGE_MAIN_GRADIENT_ALBUM_DETAIL,
  PageMain,
  PlayButton,
  TrackListItem,
} from '@/components/ui';
import { getPlaybackRestrictionMessage } from '@/lib/spotify/restrictions';

interface AlbumDetailPageProps {
  albumId: string;
}

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '--:--';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins)}:${String(secs).padStart(2, '0')}`;
};

const getAlbumTypeLabel = (type: Album['type']): string => {
  switch (type) {
    case 'single': {
      return 'シングル・EP';
    }
    case 'album': {
      return 'アルバム';
    }
    case 'compilation': {
      return 'コンピレーション';
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

  const albumName = album.name.trim() || 'タイトル不明';
  const releaseDateLabel = album.releaseDateLabel.trim() || '発売日不明';
  const isAlbumUnavailable = album.isPlayable === false;
  const albumUnavailableMessage = isAlbumUnavailable
    ? getPlaybackRestrictionMessage(album.restrictionReason)
    : null;

  return (
    <PageMain className={PAGE_MAIN_GRADIENT_ALBUM_DETAIL}>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
        {/* アルバム情報ヘッダー */}
        <DetailHero imageUrl={album.coverUrl} imageAlt={albumName}>
          <div className="mb-2 text-xs lg:text-sm">
            {getAlbumTypeLabel(album.type)}
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl lg:text-6xl">{albumName}</h1>

          <div className="mb-4 flex items-center gap-2">
            {album.artists.length > 0 ? (
              album.artists.map((artist, index) => {
                const artistName = artist.name.trim() || 'アーティスト名不明';

                return (
                  <Fragment key={artist.id}>
                    {index > 0 ? <span aria-hidden="true">、</span> : null}
                    <Link
                      href={`/artist/${artist.id}`}
                      className="hover:underline"
                    >
                      {artistName}
                    </Link>
                  </Fragment>
                );
              })
            ) : (
              <span>アーティスト名不明</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--spotify-light-gray)]">
            <span>{releaseDateLabel}</span>
            <span aria-hidden="true">•</span>
            <span>{album.tracks.length}曲</span>
            <span aria-hidden="true">•</span>
            <span>{formatTime(album.totalDuration)}</span>
          </div>
        </DetailHero>

        {/* アクションボタン */}
        <div className="mb-8 flex items-center gap-4">
          <PlayButton
            disabled={isAlbumUnavailable}
            ariaLabel={
              albumUnavailableMessage
                ? `${albumName}: ${albumUnavailableMessage}`
                : `${albumName}を再生`
            }
          />

          <FavoriteButton isFavorited />
        </div>

        {albumUnavailableMessage ? (
          <p className="mb-6 text-sm text-[var(--spotify-light-gray)]">
            {albumUnavailableMessage}
          </p>
        ) : null}

        {/* トラックリスト */}
        <div className="max-w-6xl">
          <ol className="list-none space-y-1">
            {album.tracks.map((track) => (
              <li key={track.id}>
                <TrackListItem
                  discNumber={track.discNumber}
                  trackNumber={track.trackNumber}
                  name={track.name}
                  duration={formatTime(track.duration)}
                  explicit={track.explicit}
                  isPlayable={track.isPlayable}
                  restrictionReason={track.restrictionReason}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PageMain>
  );
};
