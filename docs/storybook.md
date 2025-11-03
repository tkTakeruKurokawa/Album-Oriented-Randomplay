# Storybook Development Guide

このプロジェクトのStorybookは、UIコンポーネントの開発、テスト、ドキュメント化のために設定されています。

## 設定概要

### フレームワーク

- **@storybook/react-vite**: ViteベースのReact Storybook
- **バージョン**: 8.6.14
- **ビルドツール**: Vite（高速なHMR）

### アドオン構成

#### Essential アドオン（`@storybook/addon-essentials`）

- **Controls**: プロパティを動的に変更
- **Actions**: イベントハンドラーのログ出力
- **Docs**: 自動生成ドキュメント
- **Viewport**: レスポンシブビューの切り替え
- **Backgrounds**: 背景色の変更
- **Measure**: 要素サイズの測定
- **Outline**: 要素の境界線表示

#### 追加アドオン

- **@storybook/addon-a11y**: アクセシビリティテスト
- **@storybook/addon-links**: ストーリー間のナビゲーション
- **@storybook/addon-interactions**: ユーザーインタラクションのテスト

### TailwindCSS 統合

- グローバルスタイル（`src/styles/globals.css`）が読み込まれます
- Spotifyテーマカラーがカスタムユーティリティクラスとして定義されています：
  - `bg-spotify-green`
  - `bg-spotify-black`
  - `bg-spotify-dark-gray`
  - `text-spotify-green`
  - etc.

### TypeScript 設定

- **React Docgen TypeScript**: コンポーネントのプロパティから自動的にControls生成
- **Type Check**: 無効化（パフォーマンス向上のため）
- **Path Alias**: `@/*` が `src/*` にマッピング

## 使用方法

### 開発環境でStorybookを起動

```bash
pnpm storybook
```

### プロダクションビルド

```bash
pnpm build-storybook
```

ビルドされたファイルは `storybook-static/` ディレクトリに出力されます。

## ストーリーの作成

### 基本的なストーリーファイルの構造

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import YourComponent from './YourComponent';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'コンポーネントの説明',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // プロパティの設定
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // デフォルトプロパティ
  },
};
```

### ストーリーのベストプラクティス

1. **タイトル構造**: `Category/ComponentName` の形式を使用
2. **Tags**: `['autodocs']` を追加して自動ドキュメント生成を有効化
3. **Args Types**: TypeScriptの型から自動生成されるが、必要に応じてカスタマイズ
4. **Parameters**: レイアウト、ドキュメント説明などを設定
5. **複数バリエーション**: 異なる状態やプロパティでのストーリーを作成

### 利用可能なレイアウト

- `centered`: 中央配置（デフォルト）
- `padded`: パディング付き
- `fullscreen`: 全画面

### レスポンシブテスト

Viewportアドオンで以下のビューポートが設定されています：

- **Mobile**: 375x667px
- **Tablet**: 768x1024px
- **Desktop**: 1920x1080px

### アクセシビリティテスト

A11yアドオンで以下をテスト：

- カラーコントラスト
- フォーカス表示
- ARIA属性
- セマンティックHTML

## 既存のストーリー

### Components/AlbumCard

- **Default**: 基本的な表示
- **WithoutImage**: 画像なしの状態
- **WithoutYear**: 年なしの状態
- **LongTitle**: 長いタイトルのテスト
- **ShortTitle**: 短いタイトルのテスト
- **MinimalProps**: 最小プロパティ
- **SpotifyExample**: 実際のSpotify風データ
- **JapaneseTitle**: 日本語タイトルのテスト
- **MultipleCards**: 複数カード表示

### Providers/NextAuthProvider

- **Default**: 基本的な認証プロバイダー
- **WithMultipleChildren**: 複数の子要素
- **WithErrorComponent**: エラー状態

### Components/ErrorBoundary

- **WithNormalComponent**: 正常コンポーネント
- **WithDefaultErrorUI**: デフォルトエラーUI
- **WithCustomFallbackUI**: カスタムフォールバックUI
- **WithFunctionFallback**: 関数型フォールバック
- **WithMultipleComponents**: 複数コンポーネント
- **SpotifyErrorScenario**: Spotify風エラーUI

## カスタマイゼーション

### テーマの変更

`src/styles/globals.css` でSpotifyカラーパレットを変更できます：

```css
:root {
  --spotify-green: #1db954;
  --spotify-black: #121212;
  /* その他のカスタムカラー */
}
```

### 新しいアドオンの追加

1. アドオンをインストール
2. `.storybook/main.ts` の `addons` 配列に追加
3. 必要に応じて `.storybook/preview.ts` で設定

### ビューポートの追加

`.storybook/preview.ts` の `viewport.viewports` に新しい設定を追加：

```typescript
customViewport: {
  name: 'Custom',
  styles: {
    width: '1366px',
    height: '768px',
  },
},
```

## トラブルシューティング

### よくある問題

1. **モジュール解決エラー**: パスエイリアスが正しく設定されているか確認
2. **TailwindCSSが適用されない**: `globals.css` が正しく読み込まれているか確認
3. **TypeScriptエラー**: 型定義ファイルの更新や再インストールを試行

### デバッグ

```bash
# より詳細なログでStorybookを起動
pnpm storybook --debug-webpack

# 依存関係の確認
pnpm list @storybook
```

## 参考リンク

- [Storybook公式ドキュメント](https://storybook.js.org/docs)
- [React with Vite設定](https://storybook.js.org/docs/react/get-started/install)
- [アドオンカタログ](https://storybook.js.org/addons)
- [TailwindCSS統合](https://storybook.js.org/recipes/tailwindcss)
