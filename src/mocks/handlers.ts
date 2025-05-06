import { http, HttpResponse } from 'msw';

// モックハンドラーを作成
export const handlers = [
  // Spotifyの認証モック
  http.post('https://accounts.spotify.com/api/token', () => {
    return HttpResponse.json({
      access_token: 'mocked-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: 'mocked-refresh-token',
    });
  }),

  // サンプルAPI呼び出しのモック
  http.get('https://api.spotify.com/v1/me', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      display_name: 'Test User',
      email: 'test@example.com',
    });
  }),

  // アルバム一覧のモック
  http.get('https://api.spotify.com/v1/me/albums', () => {
    return HttpResponse.json({
      items: [
        {
          album: {
            id: 'album-1',
            name: 'Album One',
            artists: [{ name: 'Artist One' }],
            images: [{ url: 'https://example.com/album1.jpg' }],
          },
        },
        {
          album: {
            id: 'album-2',
            name: 'Album Two',
            artists: [{ name: 'Artist Two' }],
            images: [{ url: 'https://example.com/album2.jpg' }],
          },
        },
      ],
    });
  }),
];
