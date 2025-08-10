# Album-Oriented-Randomplay - Copilot Instructions

このファイルは、GitHub CopilotがAlbum-Oriented-Randomplayプロジェクトの技術スタックと設定を理解するための指示書です。

## プロジェクト概要

SpotifyのOAuthを使用したアルバム単位でのランダム再生機能を提供するNext.jsアプリケーション。

## 技術スタック

### フロントエンド

- **React**: 19.1.0 - UIライブラリ
- **Next.js**: 15.3.1 - フルスタックReactフレームワーク (App Router使用)
- **TypeScript**: 5.8.3 - 型安全な開発
- **TailwindCSS**: 4.1.4 - ユーティリティファーストCSSフレームワーク

### 認証・API

- **NextAuth.js**: 4.24.11 - Spotify OAuth認証
- **Axios**: 1.9.0 - HTTP通信ライブラリ

### テスト・品質管理

- **Vitest**: 3.1.2 - テストフレームワーク
- **React Testing Library**: 16.3.0 - Reactコンポーネントテスト
- **MSW**: 2.7.5 - APIモック
- **ESLint**: 9.25.1 - コード品質チェック
- **Prettier**: 3.5.3 - コードフォーマッター
- **Stylelint**: 16.19.1 - CSSリンター
- **Husky**: 9.1.7 - Gitフック
- **Commitlint**: 19.8.0 - コミットメッセージ規約

### 開発ツール

- **Storybook**: 8.6.12 - UIコンポーネント開発
- **PostCSS**: 8.5.3 - CSS処理
- **Volta**: Node.js 20.12.1, pnpm 8.15.4 - バージョン管理

## プロジェクト構造

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # ルートレイアウト
│   ├── page.tsx        # ホームページ
│   ├── api/            # APIルート
│   ├── auth/           # 認証関連ページ
│   └── dashboard/      # ダッシュボード
├── components/         # Reactコンポーネント
├── lib/               # ライブラリとユーティリティ
├── mocks/             # MSWモック定義
├── styles/            # CSS/TailwindCSS
├── test/              # テスト設定
└── types/             # TypeScript型定義
```

## 開発時の重要なポイント

### コーディング規約

- **TypeScript**: 厳格な型チェック有効 (`strict: true`, `noImplicitAny: true`)
- **ESLint**: Next.js推奨 + TypeScript + React Hooks + アクセシビリティ
- **コミット**: Conventional Commits規約に従う
- **パスエイリアス**: `@/*` で `./src/*` にマッピング

### 利用可能なスクリプト

- `pnpm dev`: 開発サーバー (Turbo Pack使用)
- `pnpm build`: プロダクションビルド
- `pnpm test`: テスト実行
- `pnpm test:watch`: ウォッチモードテスト
- `pnpm test:coverage`: カバレッジ付きテスト
- `pnpm lint`: ESLint + Stylelint
- `pnpm format`: Prettier実行
- `pnpm storybook`: Storybook起動

### 環境設定

- **Node.js**: 20.12.1以上
- **パッケージマネージャー**: pnpm 8.15.4
- **言語**: 日本語 (メタデータとUI)

## 実装時の注意事項

### React/Next.js

- App Routerを使用（pages/ディレクトリは使用しない）
- React 19の機能を活用可能
- Strict Modeが有効
- ErrorBoundaryでエラーハンドリング

### スタイリング

- TailwindCSS 4.x系の最新記法を使用
- CSS Modulesも併用可能
- PostCSSでSCSS処理

### テスト

- Vitestでユニット・統合テスト
- MSWでAPI通信をモック
- React Testing Libraryでコンポーネントテスト

### API・認証

- NextAuth.jsでSpotify OAuth
- APIルートは`src/app/api/`配下
- Axiosで外部API通信

## 推奨パターン

### コンポーネント作成

```tsx
// TypeScript + TailwindCSS + CSS Modules
interface Props {
  // 適切な型定義
}

export default function Component({}: Props) {
  return <div className="tailwind-classes">{/* JSX */}</div>;
}
```

### API呼び出し

```tsx
// lib/api配下のサービス関数を使用
import { spotifyService } from '@/lib/api/spotifyService';
```

### テスト

```tsx
// Vitest + React Testing Library
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
```

このプロジェクトの技術選択に合わせて、適切なライブラリとパターンを使用してコードを生成してください。
