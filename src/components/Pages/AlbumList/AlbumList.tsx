import { mockAlbums } from '@/components/Pages/Dashboard';
import { FavoriteMediaListScreen } from '@/components/ui';

export const AlbumListPage = () => {
  const albumItems = mockAlbums.map((album) => ({
    id: album.id,
    name: album.name,
    imageUrl: album.coverUrl,
    href: `/album/${album.id}`,
    subtitle: album.artist,
  }));

  return (
    <FavoriteMediaListScreen
      title="お気に入りアルバム"
      countLabel={`${String(mockAlbums.length)}枚のアルバム`}
      variant="album"
      items={albumItems}
    />
  );
};
