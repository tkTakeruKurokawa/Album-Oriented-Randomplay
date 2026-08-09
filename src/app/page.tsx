import type { Metadata } from 'next';

import { HomePage } from '@/components/Pages/Home';

export const metadata: Metadata = {
  title: 'ホーム | アルバム指向ランダムプレイ',
  description:
    'Spotifyログインで、アルバムやお気に入りアーティストを起点にランダム再生を楽しめます。',
};

const Page = () => {
  return <HomePage />;
};

export default Page;
