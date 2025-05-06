import axios from 'axios';
import { getSession } from 'next-auth/react';

// Spotify APIのベースURL
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

// Axiosインスタンスの作成
const spotifyApi = axios.create({
  baseURL: SPOTIFY_API_BASE_URL,
  timeout: 10000, // 10秒でタイムアウト
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
spotifyApi.interceptors.request.use(
  async config => {
    const session = await getSession();

    // セッションからアクセストークンを取得
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
spotifyApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 401エラーの場合、トークンが無効または期限切れ
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ここでトークンのリフレッシュロジックを実装することも可能
      // 現在のプロジェクトではNextAuth内でリフレッシュを行っているため、
      // セッションを再取得する方法で対応
      const newSession = await getSession();

      if (newSession?.accessToken) {
        originalRequest.headers.Authorization = `Bearer ${newSession.accessToken}`;
        return spotifyApi(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default spotifyApi;
