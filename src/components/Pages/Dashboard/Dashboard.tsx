'use client';

import { Album, Heart, User, Shuffle } from 'lucide-react';
import Image from 'next/image';
import { useId } from 'react';

import { mockAlbums, mockArtists } from './MockData';

import type { Album as AlbumType } from './MockData';

import { Logo } from '@/components/Pages/SignIn/Logo';

interface DashboardPageProps {
  onStartPlayback?: (albums: AlbumType[], mode: 'albums' | 'artists') => void;
  onNavigateToAlbum?: (albumId: string) => void;
  onNavigateToArtist?: (artistId: string) => void;
}

export function DashboardPage({
  onStartPlayback,
  onNavigateToAlbum,
  onNavigateToArtist,
}: DashboardPageProps) {
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
      {/* モバイルヘッダー */}
      <header className="sticky top-0 z-10 bg-black p-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#282828] p-1.5">
            <Logo />
          </div>
          <span className="tracking-tight">Album Random Play</span>
        </div>
      </header>

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
          {/* お気に入りアルバムカード */}
          <button
            type="button"
            className="group cursor-pointer rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-6 text-left transition-all hover:from-purple-900/50 hover:to-blue-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] lg:rounded-2xl lg:p-8"
            onClick={handlePlayAlbums}
          >
            <span className="mb-4 flex items-start justify-between lg:mb-6">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 lg:h-16 lg:w-16 lg:rounded-2xl"
                aria-hidden="true"
              >
                <Heart size={24} className="lg:hidden" />
                <Heart size={32} className="hidden lg:block" />
              </span>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spotify-green)] opacity-100 shadow-lg transition-all active:scale-95 lg:opacity-0 lg:group-hover:opacity-100"
                aria-hidden="true"
              >
                <Shuffle size={24} className="text-black" />
              </span>
            </span>

            <h2 className="mb-2 block text-xl lg:mb-3 lg:text-3xl">
              お気に入りアルバム
            </h2>
            <span className="mb-4 block text-sm lg:mb-6 lg:text-base">
              保存したアルバムをランダムに再生します
            </span>

            <span
              className="flex items-center gap-2 text-xs opacity-70 lg:text-sm"
              aria-hidden="true"
            >
              <Album size={16} className="lg:hidden" />
              <Album size={18} className="hidden lg:block" />
              <span>{albumsAndEPsCount}枚のアルバム</span>
            </span>
          </button>

          {/* お気に入りアーティストカード */}
          <button
            type="button"
            className="group cursor-pointer rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 text-left transition-all hover:from-green-900/50 hover:to-emerald-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] lg:rounded-2xl lg:p-8"
            onClick={handlePlayArtists}
          >
            <span className="mb-4 flex items-start justify-between lg:mb-6">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 lg:h-16 lg:w-16 lg:rounded-2xl"
                aria-hidden="true"
              >
                <User size={24} className="lg:hidden" />
                <User size={32} className="hidden lg:block" />
              </span>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--spotify-green)] opacity-100 shadow-lg transition-all active:scale-95 lg:opacity-0 lg:group-hover:opacity-100"
                aria-hidden="true"
              >
                <Shuffle size={24} className="text-black" />
              </span>
            </span>

            <h2 className="mb-2 block text-xl lg:mb-3 lg:text-3xl">
              お気に入りアーティスト
            </h2>
            <span className="mb-4 block text-sm lg:mb-6 lg:text-base">
              フォローしているアーティストのアルバムをランダムに再生します
            </span>

            <span
              className="flex items-center gap-2 text-xs opacity-70 lg:text-sm"
              aria-hidden="true"
            >
              <User size={16} className="lg:hidden" />
              <User size={18} className="hidden lg:block" />
              <span>{mockArtists.length}人のアーティスト</span>
            </span>
          </button>
        </div>

        {/* お気に入りアルバムプレビュー */}
        <section className="mb-8" aria-labelledby={favoriteAlbumsId}>
          <h2
            id={favoriteAlbumsId}
            className="mb-4 text-xl lg:mb-6 lg:text-3xl"
          >
            お気に入りアルバム
          </h2>
          <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {mockAlbums.map((album) => (
              <li key={album.id}>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateToAlbum?.(album.id);
                  }}
                  className="group w-full cursor-pointer rounded-lg bg-[var(--spotify-darker)] p-3 text-left transition-all hover:bg-[var(--spotify-gray)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 sm:p-4"
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
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* お気に入りアーティストプレビュー */}
        <section className="pb-4" aria-labelledby={favoriteArtistsId}>
          <h2
            id={favoriteArtistsId}
            className="mb-4 text-xl lg:mb-6 lg:text-3xl"
          >
            お気に入りアーティスト
          </h2>
          <ul className="grid list-none grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {mockArtists.map((artist) => (
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
      </div>
    </main>
  );
}
