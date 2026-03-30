import { AlbumDetailPage } from '@/components/Pages/AlbumDetail/AlbumDetail';

interface AlbumDetailRouteProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: AlbumDetailRouteProps) {
  const { id } = await params;
  return <AlbumDetailPage albumId={id} />;
}
