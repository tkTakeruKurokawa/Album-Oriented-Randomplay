'use client';

import { useEffect } from 'react';

import { FavoriteMediaListScreen } from '@/components/model';
import { mockAlbums } from '@/components/Pages/Dashboard';

export const FavoriteAlbumListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const albumItems = mockAlbums.map((album) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.coverUrl,
    href: `/album/${album.id}`,
    subtitle: album.artist,
  }));

  return (
    <main className="bg-gradient-main min-h-screen flex-1 overflow-auto">
      <FavoriteMediaListScreen
        title="お気に入りアルバム"
        countLabel={`${String(mockAlbums.length)}枚のアルバム`}
        variant="album"
        items={albumItems}
        cardAction="play"
      />
    </main>
  );
};
