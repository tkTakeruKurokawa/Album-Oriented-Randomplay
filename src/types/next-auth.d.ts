import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
    user?: User & {
      spotifyId?: string;
      spotifyUrl?: string;
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
    error?: 'RefreshAccessTokenError';
    user?: {
      spotifyId?: string;
      spotifyUrl?: string;
    };
  }
}
