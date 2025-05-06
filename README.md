# Album-Oriented-Randomplay

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

3. 環境変数の設定:
   `.env.example`ファイルを`.env.local`にコピーして必要な値を設定してください:
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
- `pnpm format`: Prettierでコードをフォーマット
- `pnpm test`: Vitestでテストを実行
- `pnpm test:watch`: ウォッチモードでテストを実行
- `pnpm test:coverage`: テストカバレッジを表示
- `pnpm storybook`: Storybookを起動
- `pnpm build-storybook`: Storybookをビルド

## コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

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

## ライセンス

MIT

## 作者

Your Name - [@yourhandle](https://twitter.com/yourhandle)