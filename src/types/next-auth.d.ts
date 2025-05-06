import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
    user?: User & {
      spotifyId?: string;
      spotifyUrl?: string;
      country?: string;
      product?: 'premium' | 'free' | 'open';
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: 'RefreshAccessTokenError' | string;
    user?: {
      spotifyId?: string;
      spotifyUrl?: string;
      country?: string;
      product?: 'premium' | 'free' | 'open';
    };
  }
}
