import type { Metadata } from 'next';

import { AlbumDetailPage } from '@/components/Pages/AlbumDetail';
import { mockAlbums } from '@/components/Pages/Dashboard';

interface AlbumDetailRouteProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: AlbumDetailRouteProps): Promise<Metadata> => {
  const { id } = await params;
  const album = mockAlbums.find((item) => item.id === id);

  if (!album) {
    return {
      title: 'アルバム詳細 | アルバム指向ランダムプレイ',
      description: 'アルバムの詳細情報を表示します。',
    };
  }

  return {
    title: `${album.name} | アルバム指向ランダムプレイ`,
    description: `${album.artist} の ${album.name} の収録曲を確認できます。`,
  };
};

const Page = async ({ params }: AlbumDetailRouteProps) => {
  const { id } = await params;
  return <AlbumDetailPage albumId={id} />;
};

export default Page;
