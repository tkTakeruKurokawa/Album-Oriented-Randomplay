````markdown
# Album-Oriented-Randomplay

[![CI](https://github.com/tkTakeruKurokawa/Album-Oriented-Randomplay/actions/workflows/ci.yml/badge.svg)](https://github.com/tkTakeruKurokawa/Album-Oriented-Randomplay/actions/workflows/ci.yml)

アルバム単位でSpotifyの楽曲をランダム再生できるWebアプリケーションです。Spotifyに保存したアルバムをランダムに選択して再生することができます。

## 機能

- Spotify認証によるユーザーログイン
- ユーザーの保存済みアルバム一覧の表示
- ランダムなアルバム選択と再生
- アルバム単位での再生機能

## 技術スタック

- **フロントエンド**: React, Next.js, TailwindCSS
- **認証**: NextAuth.js with Spotify OAuth
- **API通信**: Axios
- **テスト**: Vitest, React Testing Library
- **モック**: MSW (Mock Service Worker)
- **UI開発**: Storybook
- **コード品質**: ESLint, Prettier, TypeScript
- **CI/CD**: GitHub Actions

## 開発環境のセットアップ

### 前提条件

- Node.js v20.x以上
- pnpm v8.15.4以上
- Spotify開発者アカウント

### インストール手順

1. リポジトリをクローン:

   ```
   git clone https://github.com/yourusername/Album-Oriented-Randomplay.git
   cd Album-Oriented-Randomplay
   ```

2. 依存関係のインストール:

   ```
   pnpm install
   ```

3. 環境変数の設定: `.env.example`ファイルを`.env.local`にコピーして必要な値を設定してください:

   ```
   cp .env.example .env.local
   ```

   Spotify開発者ダッシュボードでアプリを作成し、Client IDとClient Secretを取得して設定してください。

4. 開発サーバーの起動:

   ```
   pnpm dev
   ```

   アプリケーションは http://localhost:3000 で実行されます。

## 利用可能なスクリプト

- `pnpm dev`: 開発サーバーを起動
- `pnpm build`: プロダクションビルドを作成
- `pnpm start`: プロダクションビルドを実行
- `pnpm lint`: ESLintでコードをチェック
- `pnpm lint:style`: Stylelintでスタイルをチェック
- `pnpm lint:all`: ESLintとStylelintの両方を実行
- `pnpm format`: Prettierでコードをフォーマット
- `pnpm format:check`: コードフォーマットのチェック（CI用）
- `pnpm test`: Vitestでテストを実行
- `pnpm test:ci`: CI環境でテストを実行（watchモードなし）
- `pnpm test:watch`: ウォッチモードでテストを実行
- `pnpm test:coverage`: テストカバレッジを表示
- `pnpm test:ui`: Vitest UIでテストを実行
- `pnpm storybook`: Storybookを起動
- `pnpm build-storybook`: Storybookをビルド

## テスト

このプロジェクトではVitestとReact Testing Libraryを使用してテストを実装しています。

### テスト設定の特徴

- **Test Runner**: Vitest（Jest互換の高速テストランナー）
- **Test Environment**: jsdom（ブラウザ環境のシミュレート）
- **Mocking**: MSW（Mock Service Worker）でAPI呼び出しをモック
- **Coverage**: v8プロバイダーでコードカバレッジを測定
- **Next.js対応**: Next.jsアプリケーション特有の機能に対応

### テストの実行

```bash
# 全テストを実行
pnpm test

# ウォッチモードでテスト実行
pnpm test:watch

# カバレッジレポート付きでテスト実行
pnpm test:coverage

# UIでテスト実行（ブラウザで結果を確認）
pnpm test:ui
```

### テストカバレッジ

カバレッジレポートはv8プロバイダーで測定され、以下の形式でレポートが生成されます：

- テキスト形式（コンソール出力）
- JSON形式
- HTML形式（ブラウザで表示可能）
- LCOV形式（CI/CD統合用）

### テストファイルの配置

- コンポーネントのテスト: `src/components/**/*.test.tsx`
- ユーティリティ関数のテスト: `src/lib/**/*.test.ts`
- APIのテスト: `src/lib/api/**/*.test.ts`

### モック設定

- **Spotify API**: MSWでモック化
- **NextAuth.js**: セッション情報のモック
- **Next.js Image**: 最適化されたImage componentsのモック
- **Browser APIs**: IntersectionObserver、ResizeObserver等のモック

## Storybook

UIコンポーネントの開発・テスト・ドキュメント化にStorybookを使用しています。

### Storybookの特徴

- **Framework**: React with Vite
- **アドオン**:
  - Essentials（Controls, Actions, Docs等）
  - Accessibility（a11yテスト）
  - Links（ストーリー間のナビゲーション）
  - Interactions（ユーザーインタラクションのテスト）
- **テーマ**: Spotifyカラーパレットに基づくカスタムテーマ
- **レスポンシブ**: Mobile/Tablet/Desktopビューポート
- **ドキュメント**: 自動生成されるコンポーネントドキュメント

### Storybookの起動

```bash
# Storybookを開発モードで起動
pnpm storybook

# Storybookをビルド（静的ファイル生成）
pnpm build-storybook
```

Storybookは http://localhost:6006 で実行されます。

### ストーリーの構成

- **Components**: 基本的なUIコンポーネント
- **Providers**: 認証プロバイダー等のラッパーコンポーネント

### コンポーネント開発ガイドライン

1. **新しいコンポーネント作成時**: 対応する`.stories.tsx`ファイルも作成
2. **Props**: TypeScriptの型定義を活用してControlsを自動生成
3. **アクセシビリティ**: A11yアドオンでアクセシビリティをテスト
4. **レスポンシブ**: 複数のビューポートでの表示を確認
5. **テーマ**: ライト/ダークテーマでの表示を確認

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### コントリビューション時のテスト要件

- 新機能には対応するテストを追加してください
- 既存のテストが全て通ることを確認してください
- テストカバレッジレポートを確認し、十分なカバレッジを保つよう努めてください

## コミットメッセージの規約

このプロジェクトでは[Conventional Commits](https://www.conventionalcommits.org/)の規約に従っています。

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

主な種類:

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの意味に影響しない変更（スペース、フォーマットなど）
- `refactor`: バグ修正や機能追加ではないコード変更
- `test`: テストの追加や修正
- `chore`: ビルドプロセスやツールの変更

## Git Hooks (Husky)

このプロジェクトでは、コード品質を保証するためにHuskyとlint-stagedを使用しています。以下のGitフックが自動的に実行されます：

- **pre-commit**:
  - lint-stagedでステージングされたファイルのみチェック（高速化）
  - ESLint、Stylelint、Prettierをキャッシュ機能付きで実行
  - TypeScript型チェック（増分ビルド対応）
- **commit-msg**: コミットメッセージのConventional Commits形式チェック
- **prepare-commit-msg**: ブランチ名に基づく自動プレフィックス追加（例:
  `feat/`ブランチで`feat: `を自動追加）

### パフォーマンス

初回実行後はキャッシュにより大幅に高速化されます（通常1秒未満）。

詳細は [docs/husky.md](./docs/husky.md) を参照してください。

### フックのスキップ（緊急時のみ）

```bash
git commit --no-verify -m "message"
# または
HUSKY=0 git commit -m "message"
```

## ライセンス

MIT

## 作者

Your Name - [@yourhandle](https://twitter.com/yourhandle)
````
