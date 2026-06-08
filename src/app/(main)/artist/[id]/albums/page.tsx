import { ArtistDiscographyListPage } from '@/components/Pages/ArtistDiscographyList';

interface ArtistAlbumsRouteProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: ArtistAlbumsRouteProps) => {
  const { id } = await params;
  return <ArtistDiscographyListPage artistId={id} listType="albums" />;
};

export default Page;
