import { generateSvgPlaceholder } from '@/lib/placeholder';

export interface Track {
  id: string;
  name: string;
  trackNumber: number;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  coverUrl: string;
  type: 'album' | 'ep' | 'single';
  releaseYear: number;
  label: string;
  tracks: Track[];
  totalDuration: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  albums: Album[];
}

const albumCover = (text: string, bgColor: string): string => {
  return generateSvgPlaceholder({
    width: 300,
    height: 300,
    text,
    bgColor,
    textColor: '#fff',
    fontSize: 18,
  });
};

const artistImage = (text: string, bgColor: string): string => {
  return generateSvgPlaceholder({
    width: 300,
    height: 300,
    text,
    bgColor,
    textColor: '#fff',
    fontSize: 16,
  });
};

const generateMockTracks = (albumId: string, count: number): Track[] => {
  const trackNames = [
    'Opening',
    'Rhythm & Flow',
    'Echoes',
    'Fading Light',
    'Into the Night',
    'Reflections',
    'Horizon',
    'Pulse',
    'Daybreak',
    'Outro',
    'Interlude',
    'Rising',
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `${albumId}-track-${String(i + 1)}`,
    name: trackNames[i % trackNames.length] ?? 'Unknown Track',
    trackNumber: i + 1,
    duration: 180 + Math.floor(i * 23.7),
  }));
};

const calcTotalDuration = (tracks: Track[]): number => {
  return tracks.reduce((sum, t) => sum + t.duration, 0);
};

const album1Tracks = generateMockTracks('album-1', 10);
const album2Tracks = generateMockTracks('album-2', 8);
const album3Tracks = generateMockTracks('album-3', 5);
const album4Tracks = generateMockTracks('album-4', 9);
const album5Tracks = generateMockTracks('album-5', 7);
const album6Tracks = generateMockTracks('album-6', 11);
const album7Tracks = generateMockTracks('album-7', 8);
const album8Tracks = generateMockTracks('album-8', 10);
const album9Tracks = generateMockTracks('album-9', 4);
const album10Tracks = generateMockTracks('album-10', 12);
const album11Tracks = generateMockTracks('album-11', 4);
const album12Tracks = generateMockTracks('album-12', 9);
const album13Tracks = generateMockTracks('album-13', 7);
const album14Tracks = generateMockTracks('album-14', 11);
const album15Tracks = generateMockTracks('album-15', 6);
const album16Tracks = generateMockTracks('album-16', 10);
const album17Tracks = generateMockTracks('album-17', 8);
const album18Tracks = generateMockTracks('album-18', 5);
const album19Tracks = generateMockTracks('album-19', 12);
const album20Tracks = generateMockTracks('album-20', 9);
const album21Tracks = generateMockTracks('album-21', 7);

export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    name: 'Midnight Vinyl Sessions',
    artist: 'The Analog Collective',
    artistId: 'artist-1',
    coverUrl: albumCover('Midnight Vinyl', '#6b21a8'),
    type: 'album',
    releaseYear: 2023,
    label: 'Vinyl Records',
    tracks: album1Tracks,
    totalDuration: calcTotalDuration(album1Tracks),
  },
  {
    id: 'album-2',
    name: 'Needle Drop',
    artist: 'The Analog Collective',
    artistId: 'artist-1',
    coverUrl: albumCover('Needle Drop', '#7c3aed'),
    type: 'album',
    releaseYear: 2022,
    label: 'Vinyl Records',
    tracks: album2Tracks,
    totalDuration: calcTotalDuration(album2Tracks),
  },
  {
    id: 'album-3',
    name: 'Vinyl Nights EP',
    artist: 'The Analog Collective',
    artistId: 'artist-1',
    coverUrl: albumCover('Vinyl Nights', '#8b5cf6'),
    type: 'ep',
    releaseYear: 2024,
    label: 'Vinyl Records',
    tracks: album3Tracks,
    totalDuration: calcTotalDuration(album3Tracks),
  },
  {
    id: 'album-4',
    name: 'Jazz Noir',
    artist: 'Midnight Ensemble',
    artistId: 'artist-2',
    coverUrl: albumCover('Jazz Noir', '#1e3a5f'),
    type: 'album',
    releaseYear: 2021,
    label: 'Blue Note',
    tracks: album4Tracks,
    totalDuration: calcTotalDuration(album4Tracks),
  },
  {
    id: 'album-5',
    name: 'After Hours',
    artist: 'Midnight Ensemble',
    artistId: 'artist-2',
    coverUrl: albumCover('After Hours', '#1e40af'),
    type: 'album',
    releaseYear: 2023,
    label: 'Blue Note',
    tracks: album5Tracks,
    totalDuration: calcTotalDuration(album5Tracks),
  },
  {
    id: 'album-6',
    name: 'Electric Thunder',
    artist: 'Voltage Kings',
    artistId: 'artist-3',
    coverUrl: albumCover('Electric Thunder', '#b45309'),
    type: 'album',
    releaseYear: 2024,
    label: 'Thunder Records',
    tracks: album6Tracks,
    totalDuration: calcTotalDuration(album6Tracks),
  },
  {
    id: 'album-7',
    name: 'Digital Waves',
    artist: 'Synthwave Riders',
    artistId: 'artist-4',
    coverUrl: albumCover('Digital Waves', '#0e7490'),
    type: 'album',
    releaseYear: 2022,
    label: 'Synth Labs',
    tracks: album7Tracks,
    totalDuration: calcTotalDuration(album7Tracks),
  },
  {
    id: 'album-8',
    name: 'Neon Nights',
    artist: 'Synthwave Riders',
    artistId: 'artist-4',
    coverUrl: albumCover('Neon Nights', '#be185d'),
    type: 'album',
    releaseYear: 2023,
    label: 'Synth Labs',
    tracks: album8Tracks,
    totalDuration: calcTotalDuration(album8Tracks),
  },
  {
    id: 'album-9',
    name: 'Retro Dreams EP',
    artist: 'Synthwave Riders',
    artistId: 'artist-4',
    coverUrl: albumCover('Retro Dreams', '#9333ea'),
    type: 'ep',
    releaseYear: 2024,
    label: 'Synth Labs',
    tracks: album9Tracks,
    totalDuration: calcTotalDuration(album9Tracks),
  },
  {
    id: 'album-10',
    name: 'Indie Hearts',
    artist: 'The Wanderers',
    artistId: 'artist-5',
    coverUrl: albumCover('Indie Hearts', '#059669'),
    type: 'album',
    releaseYear: 2023,
    label: 'Wanderer Music',
    tracks: album10Tracks,
    totalDuration: calcTotalDuration(album10Tracks),
  },
  {
    id: 'album-11',
    name: 'Symphony No. 9',
    artist: 'Classical Collective',
    artistId: 'artist-6',
    coverUrl: albumCover('Symphony No.9', '#78350f'),
    type: 'album',
    releaseYear: 2020,
    label: 'Classical Archive',
    tracks: album11Tracks,
    totalDuration: calcTotalDuration(album11Tracks),
  },
  {
    id: 'album-12',
    name: 'Desert Wind',
    artist: 'Desert Sound',
    artistId: 'artist-7',
    coverUrl: albumCover('Desert Wind', '#92400e'),
    type: 'album',
    releaseYear: 2023,
    label: 'Sand Dune Records',
    tracks: album12Tracks,
    totalDuration: calcTotalDuration(album12Tracks),
  },
  {
    id: 'album-13',
    name: 'Mirages',
    artist: 'Desert Sound',
    artistId: 'artist-7',
    coverUrl: albumCover('Mirages', '#d97706'),
    type: 'ep',
    releaseYear: 2024,
    label: 'Sand Dune Records',
    tracks: album13Tracks,
    totalDuration: calcTotalDuration(album13Tracks),
  },
  {
    id: 'album-14',
    name: 'Pulse City',
    artist: 'Neon Pulse',
    artistId: 'artist-8',
    coverUrl: albumCover('Pulse City', '#db2777'),
    type: 'album',
    releaseYear: 2022,
    label: 'Neon Beat',
    tracks: album14Tracks,
    totalDuration: calcTotalDuration(album14Tracks),
  },
  {
    id: 'album-15',
    name: 'Static Dreams EP',
    artist: 'Neon Pulse',
    artistId: 'artist-8',
    coverUrl: albumCover('Static Dreams', '#e11d48'),
    type: 'ep',
    releaseYear: 2024,
    label: 'Neon Beat',
    tracks: album15Tracks,
    totalDuration: calcTotalDuration(album15Tracks),
  },
  {
    id: 'album-16',
    name: 'Forest Songs',
    artist: 'The Iron Strings',
    artistId: 'artist-9',
    coverUrl: albumCover('Forest Songs', '#166534'),
    type: 'album',
    releaseYear: 2021,
    label: 'Folk Lane',
    tracks: album16Tracks,
    totalDuration: calcTotalDuration(album16Tracks),
  },
  {
    id: 'album-17',
    name: 'River Tales',
    artist: 'The Iron Strings',
    artistId: 'artist-9',
    coverUrl: albumCover('River Tales', '#15803d'),
    type: 'album',
    releaseYear: 2023,
    label: 'Folk Lane',
    tracks: album17Tracks,
    totalDuration: calcTotalDuration(album17Tracks),
  },
  {
    id: 'album-18',
    name: 'Orbit EP',
    artist: 'Cosmic Drift',
    artistId: 'artist-10',
    coverUrl: albumCover('Orbit', '#1d4ed8'),
    type: 'ep',
    releaseYear: 2023,
    label: 'Stellar Audio',
    tracks: album18Tracks,
    totalDuration: calcTotalDuration(album18Tracks),
  },
  {
    id: 'album-19',
    name: 'Event Horizon',
    artist: 'Cosmic Drift',
    artistId: 'artist-10',
    coverUrl: albumCover('Event Horizon', '#1e40af'),
    type: 'album',
    releaseYear: 2024,
    label: 'Stellar Audio',
    tracks: album19Tracks,
    totalDuration: calcTotalDuration(album19Tracks),
  },
  {
    id: 'album-20',
    name: 'Red Signal',
    artist: 'Crimson Echo',
    artistId: 'artist-11',
    coverUrl: albumCover('Red Signal', '#991b1b'),
    type: 'album',
    releaseYear: 2022,
    label: 'Echo Records',
    tracks: album20Tracks,
    totalDuration: calcTotalDuration(album20Tracks),
  },
  {
    id: 'album-21',
    name: 'Velvet Sky',
    artist: 'Velvet Horizon',
    artistId: 'artist-12',
    coverUrl: albumCover('Velvet Sky', '#5b21b6'),
    type: 'album',
    releaseYear: 2023,
    label: 'Horizon Pop',
    tracks: album21Tracks,
    totalDuration: calcTotalDuration(album21Tracks),
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
  {
    id: 'artist-7',
    name: 'Desert Sound',
    imageUrl: artistImage('Desert', '#92400e'),
    albums: mockAlbums.filter((a) => a.artist === 'Desert Sound'),
  },
  {
    id: 'artist-8',
    name: 'Neon Pulse',
    imageUrl: artistImage('Neon', '#db2777'),
    albums: mockAlbums.filter((a) => a.artist === 'Neon Pulse'),
  },
  {
    id: 'artist-9',
    name: 'The Iron Strings',
    imageUrl: artistImage('Iron', '#166534'),
    albums: mockAlbums.filter((a) => a.artist === 'The Iron Strings'),
  },
  {
    id: 'artist-10',
    name: 'Cosmic Drift',
    imageUrl: artistImage('Cosmic', '#1d4ed8'),
    albums: mockAlbums.filter((a) => a.artist === 'Cosmic Drift'),
  },
  {
    id: 'artist-11',
    name: 'Crimson Echo',
    imageUrl: artistImage('Crimson', '#991b1b'),
    albums: mockAlbums.filter((a) => a.artist === 'Crimson Echo'),
  },
  {
    id: 'artist-12',
    name: 'Velvet Horizon',
    imageUrl: artistImage('Velvet', '#5b21b6'),
    albums: mockAlbums.filter((a) => a.artist === 'Velvet Horizon'),
  },
];
