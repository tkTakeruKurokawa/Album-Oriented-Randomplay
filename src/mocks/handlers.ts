import { http, HttpResponse } from 'msw';

import type { SpotifyAlbum } from '@/types/spotify/albums';

// モックデータ
const mockAlbums: SpotifyAlbum[] = [
  {
    id: 'album-1',
    name: 'Test Album One',
    artists: [{ id: 'artist-1', name: 'Test Artist One' }],
    images: [
      {
        url: 'https://example.com/album1-large.jpg',
        height: 640,
        width: 640,
      },
      {
        url: 'https://example.com/album1-medium.jpg',
        height: 300,
        width: 300,
      },
      {
        url: 'https://example.com/album1-small.jpg',
        height: 64,
        width: 64,
      },
    ],
    release_date: '2023-01-01',
    total_tracks: 12,
    album_type: 'album',
    external_urls: {
      spotify: 'https://open.spotify.com/album/album-1',
    },
  },
  {
    id: 'album-2',
    name: 'Test Album Two',
    artists: [{ id: 'artist-2', name: 'Test Artist Two' }],
    images: [
      {
        url: 'https://example.com/album2-large.jpg',
        height: 640,
        width: 640,
      },
    ],
    release_date: '2024-06-15',
    total_tracks: 8,
    album_type: 'album',
    external_urls: {
      spotify: 'https://open.spotify.com/album/album-2',
    },
  },
];

// モックハンドラーを作成
export const handlers = [
  // Spotifyの認証モック
  http.post('https://accounts.spotify.com/api/token', () => {
    return HttpResponse.json({
      access_token: 'mocked-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'mocked-refresh-token',
      scope: 'user-library-read user-read-private user-read-email',
    });
  }),

  // ユーザー情報のモック
  http.get('https://api.spotify.com/v1/me', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      display_name: 'Test User',
      email: 'test@example.com',
      country: 'JP',
      product: 'premium',
      followers: {
        total: 42,
      },
      images: [
        {
          url: 'https://example.com/user-avatar.jpg',
          height: 300,
          width: 300,
        },
      ],
    });
  }),

  // ユーザーのアルバム一覧のモック
  http.get('https://api.spotify.com/v1/me/albums', ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 20;
    const offset = Number(url.searchParams.get('offset')) || 0;

    const items = mockAlbums.slice(offset, offset + limit).map((album) => ({
      added_at: '2023-01-01T00:00:00Z',
      album,
    }));

    const nextOffset = offset + limit;
    const prevOffset = Math.max(0, offset - limit);

    return HttpResponse.json({
      items,
      total: mockAlbums.length,
      limit,
      offset,
      next:
        nextOffset < mockAlbums.length
          ? `https://api.spotify.com/v1/me/albums?offset=${nextOffset.toString()}&limit=${limit.toString()}`
          : null,
      previous:
        offset > 0
          ? `https://api.spotify.com/v1/me/albums?offset=${prevOffset.toString()}&limit=${limit.toString()}`
          : null,
    });
  }),

  // 特定のアルバム情報のモック
  http.get('https://api.spotify.com/v1/albums/:id', ({ params }) => {
    const { id } = params;
    const album = mockAlbums.find((a) => a.id === id);

    if (!album) {
      return HttpResponse.json(
        { error: { status: 404, message: 'Album not found' } },
        { status: 404 }
      );
    }

    return HttpResponse.json(album);
  }),

  // プレイリスト作成のモック
  http.post('https://api.spotify.com/v1/users/:userId/playlists', () => {
    return HttpResponse.json({
      id: 'mock-playlist-id',
      name: 'Album Random Play',
      description: 'Created by Album-Oriented-Randomplay',
      public: false,
      collaborative: false,
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/mock-playlist-id',
      },
    });
  }),

  // プレイリストにトラック追加のモック
  http.post('https://api.spotify.com/v1/playlists/:playlistId/tracks', () => {
    return HttpResponse.json({
      snapshot_id: 'mock-snapshot-id',
    });
  }),

  // NextAuth.js API routesのモック
  http.get('/api/auth/session', () => {
    return HttpResponse.json({
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        image: 'https://example.com/user-avatar.jpg',
      },
      accessToken: 'mocked-access-token',
      expires: new Date(Date.now() + 3_600_000).toISOString(),
    });
  }),

  // CSRFトークンのモック
  http.get('/api/auth/csrf', () => {
    return HttpResponse.json({
      csrfToken: 'mock-csrf-token',
    });
  }),

  // プロバイダー情報のモック
  http.get('/api/auth/providers', () => {
    return HttpResponse.json({
      spotify: {
        id: 'spotify',
        name: 'Spotify',
        type: 'oauth',
        signinUrl: '/api/auth/signin/spotify',
        callbackUrl: '/api/auth/callback/spotify',
      },
    });
  }),
];
