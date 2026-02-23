# Album-Oriented-Randomplay - Copilot Instructions

このファイルは、GitHub
CopilotがAlbum-Oriented-Randomplayプロジェクトの技術スタックと設定を理解するための指示書です。

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
- **ESLint**: 9.25.1 - コード品質チェック（キャッシュ対応）
- **Prettier**: 3.5.3 - コードフォーマッター（キャッシュ対応）
- **Stylelint**: 16.19.1 - CSSリンター（キャッシュ対応）
- **Husky**: 9.1.7 - Gitフック管理
- **lint-staged**: 15.5.1 - ステージングファイルのlint実行
- **Commitlint**: 19.8.0 - コミットメッセージ規約

### 開発ツール

- **Storybook**: 8.6.12 - UIコンポーネント開発
- **PostCSS**: 8.5.3 - CSS処理
- **Volta**: Node.js 20.12.1, pnpm 8.15.4 - バージョン管理

## プロジェクト構造

```
src/
├── app/                               # Next.js App Router
│   ├── api/                           # APIルート
│   │   └── auth/[...nextauth]/       # NextAuth.js認証エンドポイント
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx               # サインインページ
│   ├── dashboard/
│   │   └── page.tsx                   # ダッシュボードページ
│   ├── layout.tsx                     # ルートレイアウト
│   └── page.tsx                       # ホームページ
│
├── components/
│   ├── Pages/                         # ページコンポーネント（重要）
│   │   ├── Home/
│   │   │   └── Home.tsx
│   │   ├── SignIn/
│   │   │   ├── SignIn.tsx
│   │   │   └── Logo.tsx
│   │   └── Dashboard/
│   │       ├── Dashboard.tsx
│   │       ├── components/            # ページ固有コンポーネント
│   │       └── providers/             # ページ固有Provider
│   │
│   ├── ui/                            # 共用UIコンポーネント
│   ├── error/
│   │   └── ErrorBoundary.tsx
│   ├── AlbumCard.tsx
│   └── ...
│
├── lib/
│   ├── app-providers/                 # グローバルProvider（重要）
│   │   ├── AuthProvider.tsx           # NextAuth.jsラッパー
│   │   ├── AuthProvider.stories.tsx
│   │   └── index.ts
│   ├── api/
│   │   ├── spotify.ts
│   │   └── SpotifyService.ts
│   └── ...
│
├── mocks/                             # MSWモック定義
│   ├── server.ts
│   ├── browser.ts
│   └── handlers.ts
│
├── test/                              # テスト設定
│   ├── setup.ts
│   └── utils.ts
│
├── types/                             # TypeScript型定義
│   └── spotify/
│
├── styles/                            # CSS/TailwindCSS
│   ├── globals.css
│   └── ...
│
└── ...
```

### 構造設計の重要な原則

1. **コンポーネント配置**

   - `components/Pages/{PageName}/`: ページごとのコンポーネント集約
   - `components/ui/`: 全ページで共用されるUIコンポーネント
   - `app/` 配下のページファイルはシンプル（呼び出しのみ）

2. **Provider配置**

   - `lib/app-providers/`: **アプリケーション全体で使用** するProvider
   - `components/Pages/{Page}/providers/`: **そのページのみで使用** するProvider
   - URLアクセスできないよう `app/` 外に配置

3. **URLルーティング**
   - `app/` 配下のすべてのファイルはルーティング対象
   - 非ルーティングファイルは `lib/`, `components/` に配置

## 開発時の重要なポイント

### コーディング規約

- **TypeScript**: 厳格な型チェック有効 (`strict: true`, `noImplicitAny: true`)
- **ESLint**: Next.js推奨 + TypeScript + React Hooks + アクセシビリティ
- **コミット**: Conventional Commits規約に従う
- **パスエイリアス**: `@/*` で `./src/*` にマッピング
- **Git Hooks**: Huskyとlint-stagedでコミット前に自動チェック
  - pre-commit: TypeScript型チェック、ESLint、Stylelint、Prettier（キャッシュ有効）
  - commit-msg: Conventional Commits形式の検証
  - prepare-commit-msg: ブランチ名からプレフィックス自動追加

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
