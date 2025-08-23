import NextAuth, { AuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

// Spotify Token Response型定義
interface SpotifyTokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
}

// Spotifyの認可スコープを定義
const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
].join(' ')

// NextAuth設定
const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
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
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      }

      // アクセストークンの有効期限チェックと更新ロジック
      const expiresAt = token.expiresAt ?? 0
      if (Date.now() < expiresAt * 1000) {
        return token
      } else {
        try {
          const clientId = process.env.SPOTIFY_CLIENT_ID ?? ''
          const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? ''
          // トークンリフレッシュの実装（Spotifyの場合）
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken ?? '',
            }),
          })

          const refreshedTokens = (await response.json()) as SpotifyTokenResponse

          return {
            ...token,
            accessToken: refreshedTokens.access_token,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken ?? '',
            expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
          }
        } catch (error) {
          console.error('RefreshAccessTokenError', error)
          return { ...token, error: 'RefreshAccessTokenError' as const }
        }
      }
    },
    session({ session, token }) {
      // セッションにアクセストークンとエラー情報を追加
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
        error: token.error,
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日間
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}

// ハンドラ関数
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const GET = handler
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const POST = handler
