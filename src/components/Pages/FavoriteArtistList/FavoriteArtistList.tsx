'use client';

import { useEffect } from 'react';

import { FavoriteMediaListScreen } from '@/components/model';
import { mockArtists } from '@/components/Pages/Dashboard';
import { PAGE_MAIN_GRADIENT_MAIN, PageMain } from '@/components/ui';

export const FavoriteArtistListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const artistItems = mockArtists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    imageUrl: artist.imageUrl,
    href: `/artist/${artist.id}`,
    subtitle: 'アーティスト',
  }));

  return (
    <PageMain className={`${PAGE_MAIN_GRADIENT_MAIN} flex-1`}>
      <FavoriteMediaListScreen
        title="お気に入りアーティスト"
        countLabel={`${String(mockArtists.length)}人のアーティスト`}
        variant="artist"
        items={artistItems}
        cardAction="shuffle"
      />
    </PageMain>
  );
};
