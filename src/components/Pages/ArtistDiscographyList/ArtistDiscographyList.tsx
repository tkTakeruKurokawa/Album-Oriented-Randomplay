'use client';

import { useEffect } from 'react';

import type { Album } from '@/components/Pages/Dashboard';

import { FavoriteMediaListScreen } from '@/components/model';
import { ArtistNotFound } from '@/components/Pages/ArtistDetail/ArtistNotFound';
import { mockArtists } from '@/components/Pages/Dashboard';
import { PageMain } from '@/components/ui';
import { PAGE_MAIN_GRADIENT_MAIN } from '@/components/ui/PageMainGradients';

type ArtistDiscographyListType = 'albums' | 'singles-eps';

interface ArtistDiscographyListPageProps {
  artistId: string;
  listType: ArtistDiscographyListType;
}

const albumTypeLabels: Record<Album['type'], string> = {
  album: 'アルバム',
  single: 'シングル・EP',
  compilation: 'コンピレーション',
};

const listTitles: Record<ArtistDiscographyListType, string> = {
  albums: 'アルバム・コンピレーション',
  'singles-eps': 'シングル・EP',
};

const getAlbumsByListType = (
  albums: Album[],
  listType: ArtistDiscographyListType
) => {
  if (listType === 'albums') {
    return albums.filter((album) => album.type !== 'single');
  }

  return albums.filter((album) => album.type === 'single');
};

const getAlbumSubtitle = (album: Album): string => {
  const releaseDateLabel = album.releaseDateLabel.trim() || '発売日不明';
  return `${releaseDateLabel} • ${albumTypeLabels[album.type]}`;
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

  const artistName = artist.name.trim() || 'アーティスト名不明';
  const listTitle = listTitles[listType];
  const albums = getAlbumsByListType(artist.albums, listType);
  const items = albums.map((album) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.coverUrl,
    href: `/album/${album.id}`,
    subtitle: getAlbumSubtitle(album),
    isPlayable: album.isPlayable,
    restrictionReason: album.restrictionReason,
  }));

  return (
    <PageMain className={`${PAGE_MAIN_GRADIENT_MAIN} flex-1`}>
      <FavoriteMediaListScreen
        title={`${artistName} の${listTitle}`}
        countLabel={`${String(albums.length)}枚の${listTitle}`}
        variant="album"
        items={items}
        cardAction="play"
        cardActionMobileVisibility="hidden"
      />
    </PageMain>
  );
};
