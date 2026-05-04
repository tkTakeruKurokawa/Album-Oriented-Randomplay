'use client';

import { useEffect } from 'react';

import { mockArtists } from '@/components/Pages/Dashboard';
import { FavoriteMediaListScreen } from '@/components/ui';

export const ArtistListPage = () => {
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
    <FavoriteMediaListScreen
      title="お気に入りアーティスト"
      countLabel={`${String(mockArtists.length)}人のアーティスト`}
      variant="artist"
      items={artistItems}
    />
  );
};
