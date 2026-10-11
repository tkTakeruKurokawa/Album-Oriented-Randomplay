import type {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyImage,
  SpotifyPaging,
} from './albums';

export interface SpotifyArtistObject extends SpotifyArtist {
  images: SpotifyImage[];
  type: 'artist';
  uri: string;
}

export interface SpotifyCursor {
  after?: string;
  before?: string;
}

export interface SpotifyCursorPaging<Item> {
  href: string;
  items: Item[];
  limit: number;
  next: string | null;
  cursors: SpotifyCursor;
  total: number;
}

export interface SpotifyFollowedArtistsResponse {
  artists: SpotifyCursorPaging<SpotifyArtistObject>;
}

export type SpotifyArtistAlbumsResponse = SpotifyPaging<SpotifyAlbum>;
