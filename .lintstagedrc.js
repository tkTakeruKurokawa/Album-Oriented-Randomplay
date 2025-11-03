/**
 * lint-staged設定ファイル
 *
 * ステージングされたファイルに対してのみlintとformatを実行し、
 * キャッシュを活用して高速化を実現します。
 */

export default {
  // TypeScript/JavaScript ファイル
  '*.{js,jsx,ts,tsx}': [
    // ESLint: キャッシュを活用して高速化
    'eslint --fix --cache',
    // Prettier: キャッシュを活用
    'prettier --write --cache',
  ],

  // CSS/SCSS ファイル
  '*.{css,scss}': [
    // Stylelint: キャッシュを活用して高速化
    'stylelint --fix --cache',
    // Prettier: キャッシュを活用
    'prettier --write --cache',
  ],

  // その他のファイル（JSON、Markdown、YAML）
  '*.{json,md,yml,yaml}': [
    // Prettier: キャッシュを活用
    'prettier --write --cache',
  ],
};
