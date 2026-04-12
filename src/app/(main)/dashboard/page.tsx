'use client';

import { useRouter } from 'next/navigation';

import { DashboardPage } from '@/components/Pages/Dashboard';

const Page = () => {
  const router = useRouter();

  return (
    <DashboardPage
      onNavigateToAlbum={(albumId) => {
        router.push(`/album/${albumId}`);
      }}
    />
  );
};

export default Page;
