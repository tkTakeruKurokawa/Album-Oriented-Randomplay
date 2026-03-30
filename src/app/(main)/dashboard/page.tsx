'use client';

import { useRouter } from 'next/navigation';

import { DashboardPage } from '@/components/Pages/Dashboard/Dashboard';

export default function Page() {
  const router = useRouter();

  return (
    <DashboardPage
      onNavigateToAlbum={(albumId) => {
        router.push(`/album/${albumId}`);
      }}
    />
  );
}
