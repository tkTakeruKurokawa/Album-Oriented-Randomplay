import { ArtistDiscographyListPage } from '@/components/Pages/ArtistDiscographyList';

interface ArtistSinglesAndEPsRouteProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: ArtistSinglesAndEPsRouteProps) => {
  const { id } = await params;
  return <ArtistDiscographyListPage artistId={id} listType="singles-eps" />;
};

export default Page;
