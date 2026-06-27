'use client';

import { useEffect } from 'react';

import type { Album } from '@/components/Pages/Dashboard';

import { FavoriteMediaListScreen } from '@/components/model';
import { ArtistNotFound } from '@/components/Pages/ArtistDetail/ArtistNotFound';
import { mockArtists } from '@/components/Pages/Dashboard';

type ArtistDiscographyListType = 'albums' | 'singles-eps';

interface ArtistDiscographyListPageProps {
  artistId: string;
  listType: ArtistDiscographyListType;
}

const albumTypeLabels: Record<Album['type'], string> = {
  album: 'アルバム',
  ep: 'EP',
  single: 'シングル',
};

const listTitles: Record<ArtistDiscographyListType, string> = {
  albums: 'アルバム',
  'singles-eps': 'シングル・EP',
};

const getAlbumsByListType = (
  albums: Album[],
  listType: ArtistDiscographyListType
) => {
  if (listType === 'albums') {
    return albums.filter((album) => album.type === 'album');
  }

  return albums.filter(
    (album) => album.type === 'single' || album.type === 'ep'
  );
};

const getAlbumSubtitle = (album: Album): string => {
  return `${String(album.releaseYear)} • ${albumTypeLabels[album.type]}`;
};

export const ArtistDiscographyListPage = ({
  artistId,
  listType,
}: ArtistDiscographyListPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artistId, listType]);

  const artist = mockArtists.find((a) => a.id === artistId);

  if (!artist) {
    return <ArtistNotFound />;
  }

  const listTitle = listTitles[listType];
  const albums = getAlbumsByListType(artist.albums, listType);
  const items = albums.map((album) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.coverUrl,
    href: `/album/${album.id}`,
    subtitle: getAlbumSubtitle(album),
  }));

  return (
    <main className="page-with-fixed-header bg-gradient-main flex-1 overflow-auto">
      <FavoriteMediaListScreen
        title={`${artist.name} の${listTitle}`}
        countLabel={`${String(albums.length)}枚の${listTitle}`}
        variant="album"
        items={items}
        cardAction="play"
        cardActionMobileVisibility="hidden"
      />
    </main>
  );
};
