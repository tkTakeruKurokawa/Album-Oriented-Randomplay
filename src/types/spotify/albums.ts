/**
 * Spotify APIのアルバム関連のタイプ定義
 */

// アーティスト情報
export interface SpotifyArtist {
  id: string;
  name: string;
  uri?: string;
  href?: string;
  external_urls?: {
    spotify: string;
  };
}

// トラック情報
export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  duration_ms: number;
  track_number: number;
  artists: SpotifyArtist[];
  album?: SpotifyAlbum;
  preview_url: string | null;
}

// アルバム画像情報
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

// アルバム情報
export interface SpotifyAlbum {
  id: string;
  name: string;
  uri: string;
  album_type: 'album' | 'single' | 'compilation';
  release_date: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  tracks?: {
    items: SpotifyTrack[];
    total: number;
  };
  total_tracks: number;
}

// 保存済みアルバムアイテム
export interface SpotifySavedAlbum {
  added_at: string;
  album: SpotifyAlbum;
}

// 保存済みアルバム一覧のレスポンス
export interface SpotifyAlbumsResponse {
  items: SpotifySavedAlbum[];
  next: string | null;
  previous: string | null;
  total: number;
  limit: number;
  offset: number;
}
