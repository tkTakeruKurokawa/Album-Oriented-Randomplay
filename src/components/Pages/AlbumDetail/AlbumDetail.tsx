'use client';

interface AlbumDetailPageProps {
  albumId: string;
}

export function AlbumDetailPage({ albumId }: AlbumDetailPageProps) {
  return <span>{albumId}</span>;
}
