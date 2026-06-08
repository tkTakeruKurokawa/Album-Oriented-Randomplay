'use client';

import { useEffect } from 'react';

import { FavoriteMediaListScreen } from '@/components/model';
import { mockArtists } from '@/components/Pages/Dashboard';

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
    <main className="bg-gradient-main min-h-screen flex-1 overflow-auto">
      <FavoriteMediaListScreen
        title="お気に入りアーティスト"
        countLabel={`${String(mockArtists.length)}人のアーティスト`}
        variant="artist"
        items={artistItems}
      />
    </main>
  );
};
