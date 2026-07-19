'use client';

import { useEffect } from 'react';

import { FavoriteMediaListScreen } from '@/components/model';
import { mockAlbums } from '@/components/Pages/Dashboard';
import { PAGE_MAIN_GRADIENT_MAIN, PageMain } from '@/components/ui';

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
    <PageMain className={`${PAGE_MAIN_GRADIENT_MAIN} flex-1`}>
      <FavoriteMediaListScreen
        title="お気に入りアルバム"
        countLabel={`${String(mockAlbums.length)}枚のアルバム`}
        variant="album"
        items={albumItems}
        cardAction="play"
      />
    </PageMain>
  );
};
