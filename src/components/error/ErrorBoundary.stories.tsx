import { ComponentType } from 'react'

import ErrorBoundary from './ErrorBoundary'

import type { Meta, StoryObj } from '@storybook/react'

// エラーを意図的に発生させるコンポーネント
const ThrowError: ComponentType = () => {
  throw new Error('これは意図的なテストエラーです')
}

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
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

// 正常に動作するコンポーネントのストーリー
export const WithNormalComponent: Story = {
  args: {
    children: (
      <div className='p-4 bg-blue-50 border border-blue-200 rounded'>
        <h3 className='text-lg font-semibold text-blue-800 mb-2'>正常なコンポーネント</h3>
        <p className='text-blue-700'>このコンポーネントは正常に動作し、エラーは発生しません。</p>
      </div>
    ),
  },
}

// デフォルトのエラーUIを表示するストーリー
export const WithDefaultErrorUI: Story = {
  args: {
    children: <ThrowError />,
  },
  parameters: {
    docs: {
      description: {
        story: 'エラーが発生した場合のデフォルトのフォールバックUIを表示します。',
      },
    },
  },
}

// カスタムフォールバックUIを使用するストーリー
export const WithCustomFallbackUI: Story = {
  args: {
    children: <ThrowError />,
    fallback: (
      <div className='p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-center'>
        <h2 className='text-xl font-bold text-yellow-800 mb-2'>⚠️ カスタムエラー</h2>
        <p className='text-yellow-700 mb-4'>
          カスタムのエラーメッセージです。システム管理者にお問い合わせください。
        </p>
        <button
          type='button'
          className='px-6 py-2 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 transition-colors'
          onClick={() => {
            globalThis.location.reload()
          }}
        >
          ページを再読み込み
        </button>
      </div>
    ),
  },
}

// 関数型フォールバックUIを使用するストーリー
export const WithFunctionFallback: Story = {
  args: {
    children: <ThrowError />,
    fallback: (error: Error, reset: () => void) => (
      <div className='p-6 bg-red-50 border-2 border-red-300 rounded-lg'>
        <h2 className='text-xl font-bold text-red-800 mb-2'>エラー詳細</h2>
        <div className='mb-4'>
          <p className='text-red-700 font-semibold mb-1'>エラーメッセージ:</p>
          <code className='text-sm bg-red-100 p-2 rounded block text-red-800'>{error.message}</code>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
            onClick={reset}
          >
            再試行
          </button>
          <button
            type='button'
            className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
            onClick={() => {
              console.error('Error reported:', error)
              alert('エラーが報告されました')
            }}
          >
            エラーを報告
          </button>
        </div>
      </div>
    ),
  },
}

// 複数のコンポーネントを含むストーリー
export const WithMultipleComponents: Story = {
  args: {
    children: (
      <div className='space-y-4'>
        <div className='p-4 bg-green-50 border border-green-200 rounded'>
          <h3 className='text-lg font-semibold text-green-800 mb-2'>コンポーネント 1</h3>
          <p className='text-green-700'>このコンポーネントは正常に動作します。</p>
        </div>
        <div className='p-4 bg-blue-50 border border-blue-200 rounded'>
          <h3 className='text-lg font-semibold text-blue-800 mb-2'>コンポーネント 2</h3>
          <p className='text-blue-700'>これも正常に動作します。</p>
        </div>
      </div>
    ),
  },
  parameters: {
    layout: 'padded',
  },
}

// Spotifyアプリケーション用のエラーシナリオ
export const SpotifyErrorScenario: Story = {
  args: {
    children: <ThrowError />,
    fallback: (_error: Error, reset: () => void) => (
      <div className='p-6 bg-spotify-black text-white rounded-lg max-w-md'>
        <div className='flex items-center mb-4'>
          <div className='w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center mr-3'>
            <span className='text-spotify-black font-bold'>!</span>
          </div>
          <h2 className='text-xl font-bold'>Spotify接続エラー</h2>
        </div>
        <p className='text-gray-300 mb-4'>
          Spotifyサービスに接続できませんでした。インターネット接続を確認してください。
        </p>
        <div className='space-y-2'>
          <button
            type='button'
            className='w-full px-4 py-2 bg-spotify-green text-spotify-black rounded font-semibold hover:bg-green-400 transition-colors'
            onClick={reset}
          >
            再接続を試行
          </button>
          <button
            type='button'
            className='w-full px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors'
            onClick={() => {
              console.log('オフラインモードに切り替え')
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
}
