import type { Metadata } from 'next';

import { ArtistDetailPage } from '@/components/Pages/ArtistDetail';
import { mockArtists } from '@/components/Pages/Dashboard';

interface ArtistDetailRouteProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: ArtistDetailRouteProps): Promise<Metadata> => {
  const { id } = await params;
  const artist = mockArtists.find((item) => item.id === id);

  if (!artist) {
    return {
      title: 'アーティスト詳細 | アルバム指向ランダムプレイ',
      description: 'アーティストの詳細情報を表示します。',
    };
  }

  return {
    title: `${artist.name} | アルバム指向ランダムプレイ`,
    description: `${artist.name} のディスコグラフィや関連情報を確認できます。`,
  };
};

const Page = async ({ params }: ArtistDetailRouteProps) => {
  const { id } = await params;
  return <ArtistDetailPage artistId={id} />;
};

export default Page;
