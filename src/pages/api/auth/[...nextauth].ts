import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// Spotifyの認可スコープを定義
const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
].join(' ');

// NextAuth設定
export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // 初回ログイン時にアクセストークン等をトークンに保存
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにアクセストークンを追加
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
      };
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
