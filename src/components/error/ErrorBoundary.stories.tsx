import { ComponentType } from 'react';

import ErrorBoundary from './ErrorBoundary';

import type { Meta, StoryObj } from '@storybook/react';

// エラーを意図的に発生させるコンポーネント
const ThrowError: ComponentType = () => {
  throw new Error('これは意図的なテストエラーです');
};

const meta = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'React アプリケーションでエラーをキャッチし、フォールバックUIを表示するエラーバウンダリーコンポーネント。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'エラーバウンダリーでラップする子コンポーネント',
    },
    fallback: {
      control: false,
      description: 'エラー発生時に表示するフォールバックUI',
    },
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// 正常に動作するコンポーネントのストーリー
export const WithNormalComponent: Story = {
  args: {
    children: (
      <div className="rounded border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 text-lg font-semibold text-blue-800">
          正常なコンポーネント
        </h3>
        <p className="text-blue-700">
          このコンポーネントは正常に動作し、エラーは発生しません。
        </p>
      </div>
    ),
  },
};

// デフォルトのエラーUIを表示するストーリー
export const WithDefaultErrorUI: Story = {
  args: {
    children: <ThrowError />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'エラーが発生した場合のデフォルトのフォールバックUIを表示します。',
      },
    },
  },
};

// カスタムフォールバックUIを使用するストーリー
export const WithCustomFallbackUI: Story = {
  args: {
    children: <ThrowError />,
    fallback: (
      <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-yellow-800">
          ⚠️ カスタムエラー
        </h2>
        <p className="mb-4 text-yellow-700">
          カスタムのエラーメッセージです。システム管理者にお問い合わせください。
        </p>
        <button
          type="button"
          className="rounded bg-yellow-200 px-6 py-2 text-yellow-800 transition-colors hover:bg-yellow-300"
          onClick={() => {
            globalThis.location.reload();
          }}
        >
          ページを再読み込み
        </button>
      </div>
    ),
  },
};

// 関数型フォールバックUIを使用するストーリー
export const WithFunctionFallback: Story = {
  args: {
    children: <ThrowError />,
    fallback: (error: Error, reset: () => void) => (
      <div className="rounded-lg border-2 border-red-300 bg-red-50 p-6">
        <h2 className="mb-2 text-xl font-bold text-red-800">エラー詳細</h2>
        <div className="mb-4">
          <p className="mb-1 font-semibold text-red-700">エラーメッセージ:</p>
          <code className="block rounded bg-red-100 p-2 text-sm text-red-800">
            {error.message}
          </code>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
            onClick={reset}
          >
            再試行
          </button>
          <button
            type="button"
            className="rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
            onClick={() => {
              console.error('Error reported:', error);
              alert('エラーが報告されました');
            }}
          >
            エラーを報告
          </button>
        </div>
      </div>
    ),
  },
};

// 複数のコンポーネントを含むストーリー
export const WithMultipleComponents: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <div className="rounded border border-green-200 bg-green-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-green-800">
            コンポーネント 1
          </h3>
          <p className="text-green-700">
            このコンポーネントは正常に動作します。
          </p>
        </div>
        <div className="rounded border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            コンポーネント 2
          </h3>
          <p className="text-blue-700">これも正常に動作します。</p>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

// Spotifyアプリケーション用のエラーシナリオ
export const SpotifyErrorScenario: Story = {
  args: {
    children: <ThrowError />,
    fallback: (_error: Error, reset: () => void) => (
      <div className="bg-spotify-black max-w-md rounded-lg p-6 text-white">
        <div className="mb-4 flex items-center">
          <div className="bg-spotify-green mr-3 flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-spotify-black font-bold">!</span>
          </div>
          <h2 className="text-xl font-bold">Spotify接続エラー</h2>
        </div>
        <p className="mb-4 text-gray-300">
          Spotifyサービスに接続できませんでした。インターネット接続を確認してください。
        </p>
        <div className="space-y-2">
          <button
            type="button"
            className="bg-spotify-green text-spotify-black w-full rounded px-4 py-2 font-semibold transition-colors hover:bg-green-400"
            onClick={reset}
          >
            再接続を試行
          </button>
          <button
            type="button"
            className="w-full rounded border border-gray-600 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
            onClick={() => {
              console.log('オフラインモードに切り替え');
            }}
          >
            オフラインモードで続行
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
