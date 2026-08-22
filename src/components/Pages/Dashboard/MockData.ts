import { generateSvgPlaceholder } from '@/lib/placeholder';

export interface Track {
  id: string;
  name: string;
  discNumber: number;
  trackNumber: number;
  duration: number;
  explicit: boolean;
  isPlayable?: boolean;
  restrictionReason?: string;
}

export interface AlbumArtist {
  id: string;
  name: string;
}

export interface Album {
  id: string;
  name: string;
  artists: AlbumArtist[];
  coverUrl: string | null;
  type: 'album' | 'single' | 'compilation';
  releaseDateLabel: string;
  tracks: Track[];
  totalDuration: number;
  isPlayable?: boolean;
  restrictionReason?: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string | null;
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
    discNumber: 1,
    trackNumber: i + 1,
    duration: 180 + Math.floor(i * 23.7),
    explicit: false,
    isPlayable: true,
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
    artists: [{ id: 'artist-1', name: 'The Analog Collective' }],
    coverUrl: albumCover('Midnight Vinyl', '#6b21a8'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album1Tracks,
    totalDuration: calcTotalDuration(album1Tracks),
  },
  {
    id: 'album-2',
    name: 'Needle Drop',
    artists: [{ id: 'artist-1', name: 'The Analog Collective' }],
    coverUrl: albumCover('Needle Drop', '#7c3aed'),
    type: 'album',
    releaseDateLabel: '2022',
    tracks: album2Tracks,
    totalDuration: calcTotalDuration(album2Tracks),
  },
  {
    id: 'album-3',
    name: 'Vinyl Nights EP',
    artists: [{ id: 'artist-1', name: 'The Analog Collective' }],
    coverUrl: albumCover('Vinyl Nights', '#8b5cf6'),
    type: 'single',
    releaseDateLabel: '2024',
    tracks: album3Tracks,
    totalDuration: calcTotalDuration(album3Tracks),
  },
  {
    id: 'album-4',
    name: 'Jazz Noir',
    artists: [{ id: 'artist-2', name: 'Midnight Ensemble' }],
    coverUrl: albumCover('Jazz Noir', '#1e3a5f'),
    type: 'album',
    releaseDateLabel: '2021',
    tracks: album4Tracks,
    totalDuration: calcTotalDuration(album4Tracks),
  },
  {
    id: 'album-5',
    name: 'After Hours',
    artists: [{ id: 'artist-2', name: 'Midnight Ensemble' }],
    coverUrl: albumCover('After Hours', '#1e40af'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album5Tracks,
    totalDuration: calcTotalDuration(album5Tracks),
  },
  {
    id: 'album-6',
    name: 'Electric Thunder',
    artists: [{ id: 'artist-3', name: 'Voltage Kings' }],
    coverUrl: albumCover('Electric Thunder', '#b45309'),
    type: 'album',
    releaseDateLabel: '2024',
    tracks: album6Tracks,
    totalDuration: calcTotalDuration(album6Tracks),
  },
  {
    id: 'album-7',
    name: 'Digital Waves',
    artists: [{ id: 'artist-4', name: 'Synthwave Riders' }],
    coverUrl: albumCover('Digital Waves', '#0e7490'),
    type: 'album',
    releaseDateLabel: '2022',
    tracks: album7Tracks,
    totalDuration: calcTotalDuration(album7Tracks),
  },
  {
    id: 'album-8',
    name: 'Neon Nights',
    artists: [{ id: 'artist-4', name: 'Synthwave Riders' }],
    coverUrl: albumCover('Neon Nights', '#be185d'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album8Tracks,
    totalDuration: calcTotalDuration(album8Tracks),
  },
  {
    id: 'album-9',
    name: 'Retro Dreams EP',
    artists: [{ id: 'artist-4', name: 'Synthwave Riders' }],
    coverUrl: albumCover('Retro Dreams', '#9333ea'),
    type: 'single',
    releaseDateLabel: '2024',
    tracks: album9Tracks,
    totalDuration: calcTotalDuration(album9Tracks),
  },
  {
    id: 'album-10',
    name: 'Indie Hearts',
    artists: [{ id: 'artist-5', name: 'The Wanderers' }],
    coverUrl: albumCover('Indie Hearts', '#059669'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album10Tracks,
    totalDuration: calcTotalDuration(album10Tracks),
  },
  {
    id: 'album-11',
    name: 'Symphony No. 9',
    artists: [{ id: 'artist-6', name: 'Classical Collective' }],
    coverUrl: albumCover('Symphony No.9', '#78350f'),
    type: 'album',
    releaseDateLabel: '2020',
    tracks: album11Tracks,
    totalDuration: calcTotalDuration(album11Tracks),
  },
  {
    id: 'album-12',
    name: 'Desert Wind',
    artists: [{ id: 'artist-7', name: 'Desert Sound' }],
    coverUrl: albumCover('Desert Wind', '#92400e'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album12Tracks,
    totalDuration: calcTotalDuration(album12Tracks),
  },
  {
    id: 'album-13',
    name: 'Mirages',
    artists: [{ id: 'artist-7', name: 'Desert Sound' }],
    coverUrl: albumCover('Mirages', '#d97706'),
    type: 'single',
    releaseDateLabel: '2024',
    tracks: album13Tracks,
    totalDuration: calcTotalDuration(album13Tracks),
  },
  {
    id: 'album-14',
    name: 'Pulse City',
    artists: [{ id: 'artist-8', name: 'Neon Pulse' }],
    coverUrl: albumCover('Pulse City', '#db2777'),
    type: 'album',
    releaseDateLabel: '2022',
    tracks: album14Tracks,
    totalDuration: calcTotalDuration(album14Tracks),
  },
  {
    id: 'album-15',
    name: 'Static Dreams EP',
    artists: [{ id: 'artist-8', name: 'Neon Pulse' }],
    coverUrl: albumCover('Static Dreams', '#e11d48'),
    type: 'single',
    releaseDateLabel: '2024',
    tracks: album15Tracks,
    totalDuration: calcTotalDuration(album15Tracks),
  },
  {
    id: 'album-16',
    name: 'Forest Songs',
    artists: [{ id: 'artist-9', name: 'The Iron Strings' }],
    coverUrl: albumCover('Forest Songs', '#166534'),
    type: 'album',
    releaseDateLabel: '2021',
    tracks: album16Tracks,
    totalDuration: calcTotalDuration(album16Tracks),
  },
  {
    id: 'album-17',
    name: 'River Tales',
    artists: [{ id: 'artist-9', name: 'The Iron Strings' }],
    coverUrl: albumCover('River Tales', '#15803d'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album17Tracks,
    totalDuration: calcTotalDuration(album17Tracks),
  },
  {
    id: 'album-18',
    name: 'Orbit EP',
    artists: [{ id: 'artist-10', name: 'Cosmic Drift' }],
    coverUrl: albumCover('Orbit', '#1d4ed8'),
    type: 'single',
    releaseDateLabel: '2023',
    tracks: album18Tracks,
    totalDuration: calcTotalDuration(album18Tracks),
  },
  {
    id: 'album-19',
    name: 'Event Horizon',
    artists: [{ id: 'artist-10', name: 'Cosmic Drift' }],
    coverUrl: albumCover('Event Horizon', '#1e40af'),
    type: 'album',
    releaseDateLabel: '2024',
    tracks: album19Tracks,
    totalDuration: calcTotalDuration(album19Tracks),
  },
  {
    id: 'album-20',
    name: 'Red Signal',
    artists: [{ id: 'artist-11', name: 'Crimson Echo' }],
    coverUrl: albumCover('Red Signal', '#991b1b'),
    type: 'album',
    releaseDateLabel: '2022',
    tracks: album20Tracks,
    totalDuration: calcTotalDuration(album20Tracks),
  },
  {
    id: 'album-21',
    name: 'Velvet Sky',
    artists: [{ id: 'artist-12', name: 'Velvet Horizon' }],
    coverUrl: albumCover('Velvet Sky', '#5b21b6'),
    type: 'album',
    releaseDateLabel: '2023',
    tracks: album21Tracks,
    totalDuration: calcTotalDuration(album21Tracks),
  },
];

const hasArtist = (album: Album, artistName: string): boolean => {
  return album.artists.some((artist) => artist.name === artistName);
};

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'The Analog Collective',
    imageUrl: artistImage('Analog', '#6b21a8'),
    albums: mockAlbums.filter((album) =>
      hasArtist(album, 'The Analog Collective')
    ),
  },
  {
    id: 'artist-2',
    name: 'Midnight Ensemble',
    imageUrl: artistImage('Midnight', '#1e3a5f'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Midnight Ensemble')),
  },
  {
    id: 'artist-3',
    name: 'Voltage Kings',
    imageUrl: artistImage('Voltage', '#b45309'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Voltage Kings')),
  },
  {
    id: 'artist-4',
    name: 'Synthwave Riders',
    imageUrl: artistImage('Synthwave', '#0e7490'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Synthwave Riders')),
  },
  {
    id: 'artist-5',
    name: 'The Wanderers',
    imageUrl: artistImage('Wanderers', '#059669'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'The Wanderers')),
  },
  {
    id: 'artist-6',
    name: 'Classical Collective',
    imageUrl: artistImage('Classical', '#78350f'),
    albums: mockAlbums.filter((album) =>
      hasArtist(album, 'Classical Collective')
    ),
  },
  {
    id: 'artist-7',
    name: 'Desert Sound',
    imageUrl: artistImage('Desert', '#92400e'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Desert Sound')),
  },
  {
    id: 'artist-8',
    name: 'Neon Pulse',
    imageUrl: artistImage('Neon', '#db2777'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Neon Pulse')),
  },
  {
    id: 'artist-9',
    name: 'The Iron Strings',
    imageUrl: artistImage('Iron', '#166534'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'The Iron Strings')),
  },
  {
    id: 'artist-10',
    name: 'Cosmic Drift',
    imageUrl: artistImage('Cosmic', '#1d4ed8'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Cosmic Drift')),
  },
  {
    id: 'artist-11',
    name: 'Crimson Echo',
    imageUrl: artistImage('Crimson', '#991b1b'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Crimson Echo')),
  },
  {
    id: 'artist-12',
    name: 'Velvet Horizon',
    imageUrl: artistImage('Velvet', '#5b21b6'),
    albums: mockAlbums.filter((album) => hasArtist(album, 'Velvet Horizon')),
  },
];
