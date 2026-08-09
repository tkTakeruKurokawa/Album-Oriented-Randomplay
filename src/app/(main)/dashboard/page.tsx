import type { Metadata } from 'next';

import { DashboardPage } from '@/components/Pages/Dashboard';

export const metadata: Metadata = {
  title: 'ダッシュボード | アルバム指向ランダムプレイ',
  description:
    'お気に入りアルバムやアーティストから、アルバム単位のランダム再生を開始できます。',
};

const Page = () => {
  return <DashboardPage />;
};

export default Page;
