import NextAuthProvider from './SessionProvider';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Providers/NextAuthProvider',
  component: NextAuthProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'NextAuth.jsのSessionProviderをラップするコンポーネント。認証状態を子コンポーネントに提供します。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NextAuthProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的なストーリー
export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg border border-gray-300 p-4">
        <h3 className="mb-2 text-lg font-semibold">認証されたコンテンツ</h3>
        <p className="text-gray-600">
          このコンテンツはNextAuthProviderでラップされており、認証状態にアクセスできます。
        </p>
      </div>
    ),
  },
};

// 複数の子要素を含むストーリー
export const WithMultipleChildren: Story = {
  args: {
    children: (
      <>
        <div className="mb-4 rounded-lg border border-blue-300 p-4">
          <h3 className="mb-2 text-lg font-semibold text-blue-700">
            ユーザー情報
          </h3>
          <p className="text-blue-600">
            ユーザーのプロフィール情報がここに表示されます。
          </p>
        </div>
        <div className="rounded-lg border border-green-300 p-4">
          <h3 className="mb-2 text-lg font-semibold text-green-700">
            プレイリスト
          </h3>
          <p className="text-green-600">
            Spotifyのプレイリスト一覧がここに表示されます。
          </p>
        </div>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

// エラー境界のテスト用ストーリー
export const WithErrorComponent: Story = {
  args: {
    children: (
      <div className="rounded-lg border border-red-300 p-4">
        <h3 className="mb-2 text-lg font-semibold text-red-700">エラー状態</h3>
        <p className="text-red-600">認証エラーが発生した場合の表示例です。</p>
        <button
          type="button"
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => {
            console.log('再認証を試行');
          }}
        >
          再認証
        </button>
      </div>
    ),
  },
};
