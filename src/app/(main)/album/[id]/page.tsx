import { AlbumDetailPage } from '@/components/Pages/AlbumDetail';

interface AlbumDetailRouteProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: AlbumDetailRouteProps) => {
  const { id } = await params;
  return <AlbumDetailPage albumId={id} />;
};

export default Page;
