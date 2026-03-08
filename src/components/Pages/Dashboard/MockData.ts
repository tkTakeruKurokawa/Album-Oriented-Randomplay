import { generateSvgPlaceholder } from '@/lib/placeholder';

export interface Album {
  id: string;
  name: string;
  artist: string;
  coverUrl: string;
  type: 'album' | 'ep' | 'single';
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  albums: Album[];
}

function albumCover(text: string, bgColor: string): string {
  return generateSvgPlaceholder({
    width: 300,
    height: 300,
    text,
    bgColor,
    textColor: '#fff',
    fontSize: 18,
  });
}

function artistImage(text: string, bgColor: string): string {
  return generateSvgPlaceholder({
    width: 300,
    height: 300,
    text,
    bgColor,
    textColor: '#fff',
    fontSize: 16,
  });
}

export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    name: 'Midnight Vinyl Sessions',
    artist: 'The Analog Collective',
    coverUrl: albumCover('Midnight Vinyl', '#6b21a8'),
    type: 'album',
  },
  {
    id: 'album-2',
    name: 'Needle Drop',
    artist: 'The Analog Collective',
    coverUrl: albumCover('Needle Drop', '#7c3aed'),
    type: 'album',
  },
  {
    id: 'album-3',
    name: 'Vinyl Nights EP',
    artist: 'The Analog Collective',
    coverUrl: albumCover('Vinyl Nights', '#8b5cf6'),
    type: 'ep',
  },
  {
    id: 'album-4',
    name: 'Jazz Noir',
    artist: 'Midnight Ensemble',
    coverUrl: albumCover('Jazz Noir', '#1e3a5f'),
    type: 'album',
  },
  {
    id: 'album-5',
    name: 'After Hours',
    artist: 'Midnight Ensemble',
    coverUrl: albumCover('After Hours', '#1e40af'),
    type: 'album',
  },
  {
    id: 'album-6',
    name: 'Electric Thunder',
    artist: 'Voltage Kings',
    coverUrl: albumCover('Electric Thunder', '#b45309'),
    type: 'album',
  },
  {
    id: 'album-7',
    name: 'Digital Waves',
    artist: 'Synthwave Riders',
    coverUrl: albumCover('Digital Waves', '#0e7490'),
    type: 'album',
  },
  {
    id: 'album-8',
    name: 'Neon Nights',
    artist: 'Synthwave Riders',
    coverUrl: albumCover('Neon Nights', '#be185d'),
    type: 'album',
  },
  {
    id: 'album-9',
    name: 'Retro Dreams EP',
    artist: 'Synthwave Riders',
    coverUrl: albumCover('Retro Dreams', '#9333ea'),
    type: 'ep',
  },
  {
    id: 'album-10',
    name: 'Indie Hearts',
    artist: 'The Wanderers',
    coverUrl: albumCover('Indie Hearts', '#059669'),
    type: 'album',
  },
  {
    id: 'album-11',
    name: 'Symphony No. 9',
    artist: 'Classical Collective',
    coverUrl: albumCover('Symphony No.9', '#78350f'),
    type: 'album',
  },
];

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'The Analog Collective',
    imageUrl: artistImage('Analog', '#6b21a8'),
    albums: mockAlbums.filter((a) => a.artist === 'The Analog Collective'),
  },
  {
    id: 'artist-2',
    name: 'Midnight Ensemble',
    imageUrl: artistImage('Midnight', '#1e3a5f'),
    albums: mockAlbums.filter((a) => a.artist === 'Midnight Ensemble'),
  },
  {
    id: 'artist-3',
    name: 'Voltage Kings',
    imageUrl: artistImage('Voltage', '#b45309'),
    albums: mockAlbums.filter((a) => a.artist === 'Voltage Kings'),
  },
  {
    id: 'artist-4',
    name: 'Synthwave Riders',
    imageUrl: artistImage('Synthwave', '#0e7490'),
    albums: mockAlbums.filter((a) => a.artist === 'Synthwave Riders'),
  },
  {
    id: 'artist-5',
    name: 'The Wanderers',
    imageUrl: artistImage('Wanderers', '#059669'),
    albums: mockAlbums.filter((a) => a.artist === 'The Wanderers'),
  },
  {
    id: 'artist-6',
    name: 'Classical Collective',
    imageUrl: artistImage('Classical', '#78350f'),
    albums: mockAlbums.filter((a) => a.artist === 'Classical Collective'),
  },
];
