import { ArtistDetailPage } from '@/components/Pages/ArtistDetail';

interface ArtistDetailRouteProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: ArtistDetailRouteProps) => {
  const { id } = await params;
  return <ArtistDetailPage artistId={id} />;
};

export default Page;
