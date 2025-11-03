/**
 * テスト用のユーティリティ関数とヘルパー
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { expect, vi } from 'vitest';

// Next.js useRouterのモック
export const mockUseRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
}));

// Next.js useSessionのモック
export const mockUseSession = vi.fn(() => ({
  data: {
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: 'test@example.com',
      image: 'https://example.com/user-avatar.jpg',
    },
    accessToken: 'mocked-access-token',
    expires: new Date(Date.now() + 3_600_000).toISOString(),
  },
  status: 'authenticated',
}));

// カスタムレンダー関数
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

export const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  return render(ui, {
    ...options,
  });
};

// テスト用のモックセッション
export const mockSession = {
  user: {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/user-avatar.jpg',
  },
  accessToken: 'mocked-access-token',
  expires: new Date(Date.now() + 3_600_000).toISOString(),
};

// モックアルバムデータ
export const mockAlbumData = {
  id: 'test-album-id',
  name: 'Test Album',
  artists: [{ id: 'test-artist-id', name: 'Test Artist' }],
  images: [
    {
      url: 'https://example.com/album-cover.jpg',
      height: 640,
      width: 640,
    },
  ],
  release_date: '2023-01-01',
  total_tracks: 10,
  album_type: 'album' as const,
  external_urls: {
    spotify: 'https://open.spotify.com/album/test-album-id',
  },
};

// MSWレスポンス待機用ヘルパー
export const waitForMswResponse = () =>
  new Promise((resolve) => setTimeout(resolve, 100));

// LocalStorageのモック
export const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// SessionStorageのモック
export const mockSessionStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// モック用のアサーションヘルパー
export const expectToBeVisible = (element: HTMLElement) => {
  expect(element).toBeVisible();
  expect(element).toBeInTheDocument();
};

export const expectToHaveText = (element: HTMLElement, text: string) => {
  expect(element).toHaveTextContent(text);
  expect(element).toBeInTheDocument();
};

// デバッグ用のヘルパー
export const logElementForDebugging = (element: HTMLElement) => {
  console.log('Element HTML:', element.outerHTML);
  console.log('Element text content:', element.textContent);
  console.log('Element attributes:', element.attributes);
};
