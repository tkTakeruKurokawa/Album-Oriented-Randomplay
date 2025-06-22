import globals from 'globals'; // グローバル変数の定義に便利
import js from '@eslint/js';
import tseslint from 'typescript-eslint'; // typescript-eslint の推奨インポート方法
import prettierConfig from 'eslint-config-prettier'; // Prettier連携 (フォーマットルール無効化)
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react'; // React本体のルール
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import vitestPlugin from 'eslint-plugin-vitest';
import unicornPlugin from 'eslint-plugin-unicorn'; // 汎用的なコード改善ルール
import nextPlugin from '@next/eslint-plugin-next';

import { resolve } from 'node:path'; // 'node:' prefix を推奨
import { fileURLToPath } from 'node:url'; // 'node:' prefix を推奨

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = __dirname; // tsconfig.json のパス解決の基点

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'public/', // 静的ファイル
      'dist/', // 一般的なビルド成果物ディレクトリ
    ],
  },

  // 1. ESLint のコア推奨ルール
  js.configs.recommended,

  // 2. TypeScript 関連設定 (型チェックありルールを強化)
  ...tseslint.configs.strictTypeChecked, // 型情報が必須の厳格なルールセット
  ...tseslint.configs.stylisticTypeChecked, // 型情報が必須のスタイル関連ルールセット

  {
    // TypeScript ファイルに対する追加設定や上書き
    files: ['**/*.{ts,tsx}'],
    // languageOptions は上記 ...tseslint.configs に含まれるが、
    // プロジェクト固有の tsconfig パスを明示するために再定義/補足
    languageOptions: {
      parserOptions: {
        project: [
          resolve(projectRoot, './tsconfig.json'), // メインのtsconfig
          resolve(projectRoot, './tsconfig.node.json'), // Node.js環境用のtsconfig (あれば)
        ],
        tsconfigRootDir: projectRoot,
      },
    },
    rules: {
      // 既存のTypeScriptルールカスタマイズの調整と追加
      'no-unused-vars': 'off', // ESLint標準ルールをオフにし、TS用ルールを使用
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true, ignoreRestArgs: true }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // info も許容

      // 型情報が必須な重要ルール (strictTypeChecked に多くが含まれるが、意識するために明示/調整も可)
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn', // false positive の可能性もあるため最初は warn
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn', // anyからの代入。errorだと厳しい場合あり
      '@typescript-eslint/no-unsafe-call': 'warn', // any型の関数の呼び出し
      '@typescript-eslint/no-unsafe-member-access': 'warn', // any型のプロパティアクセス
      '@typescript-eslint/no-unsafe-return': 'warn', // any型の値を返すこと
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],

      // 命名規則 (プロジェクト導入初期は調整が必要なためコメントアウト。徐々に有効化を推奨)
      /*
      '@typescript-eslint/naming-convention': [
        'warn', // 最初は 'warn' から始め、徐々に 'error' へ
        { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'property', format: ['camelCase', 'PascalCase', 'UPPER_CASE'], leadingUnderscore: 'allow' },
        { selector: 'method', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
        { selector: 'enumMember', format: ['UPPER_CASE', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } }, // 'I' prefix は非推奨
        { selector: 'typeAlias', format: ['PascalCase'] },
      ],
      */
    },
  },

  // 3. React / JSX / Hooks / Accessibility 関連
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // JSファイルも含める (Next.js の _document.js など)
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      globals: {
        // ブラウザ環境のグローバル変数を有効化
        ...globals.browser,
      },
    },
    settings: {
      // Reactプラグイン向け設定
      react: {
        version: 'detect', // Reactのバージョンを自動検出
      },
    },
    rules: {
      // React 推奨ルール (eslint-plugin-react)
      ...reactPlugin.configs.recommended.rules,
      // React 17+ JSX Transform 用のルール (React import 不要に対応)
      ...reactPlugin.configs['jsx-runtime'].rules,
      // 'react/react-in-jsx-scope': 'off', // jsx-runtime でカバーされる
      // 'react/jsx-uses-react': 'off',    // jsx-runtime でカバーされる
      'react/prop-types': 'off', // TypeScript を使用しているため不要

      // React Hooks 推奨ルール (eslint-plugin-react-hooks)
      ...reactHooksPlugin.configs.recommended.rules, // 'rules-of-hooks' と 'exhaustive-deps' を含む
      // 'react-hooks/exhaustive-deps': 'warn', // デフォルトは warn. error に変更も検討

      // JSX Accessibility 推奨ルール (eslint-plugin-jsx-a11y)
      ...jsxA11yPlugin.configs.recommended.rules,
      // 個別の jsx-a11y ルールの調整 (Next.js <Link> との連携など)
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },
  },

  // 4. import/export 関連 (eslint-plugin-import)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        // モジュール解決方法の設定
        typescript: {
          project: resolve(projectRoot, './tsconfig.json'), // TypeScriptのパス解決を利用
        },
        node: true, // node_modules からの解決
      },
      'import/parsers': {
        // import プラグインがTSファイルをパースするために必要
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules, // importプラグインの推奨ルール
      // ...importPlugin.configs.typescript.rules, // TypeScript用のimportルール (上記resolver設定で大部分カバー)

      'import/order': [
        // import文の順序を細かく規定
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
            'unknown',
          ],
          pathGroups: [
            // プロジェクト内のパスエイリアスなどの順序を定義
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' }, // 例: src/components -> @/components
            { pattern: '~/**', group: 'internal', position: 'before' }, // 例: src -> ~/
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always', // グループ間に常に改行
          alphabetize: { order: 'asc', caseInsensitive: true }, // アルファベット順ソート
        },
      ],
      'import/no-unresolved': 'error', // 解決できないimportパスをエラーに (resolver設定が重要)
      'import/newline-after-import': 'error',
      'import/no-duplicates': ['error', { considerQueryString: true }],
      'import/no-cycle': ['error', { maxDepth: 5, ignoreExternal: true }], // 循環依存の検出
      'import/prefer-default-export': 'off', // プロジェクト/チームの方針による
      // 'import/no-default-export': 'error', // pages/api など一部を除き default export を禁止する場合
    },
  },

  // 5. Next.js 固有の設定 (eslint-config-next)
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // 6. Vitest (テスト) 関連の設定
  {
    files: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/__mocks__/**/*.{ts,tsx}',
    ],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        // Vitest のグローバル変数 (describe, it, expect など) を認識させる
        ...vitestPlugin.environments.env.globals,
      },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules, // Vitest推奨ルール
      'vitest/expect-expect': 'warn', // アサーションがないテストを警告
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error', // CIで失敗させるため error
      'vitest/prefer-to-have-length': 'error',

      // テストファイル内では一部の厳格なルールを緩和
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-empty-function': 'off', // モック関数などで空関数を許容
      'react/display-name': 'off', // テスト内で無名関数コンポーネントを使用することがあるため
    },
  },

  // 7. Unicorn Plugin (より良いJavaScriptの書き方を提案)
  {
    // files: ['**/*.{js,jsx,ts,tsx}'], // 全体に適用する場合
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      // unicorn の推奨設定は非常に多いため、最初は部分的に導入するか、
      // プロジェクトに合わせて調整することを強く推奨します。
      // ...unicornPlugin.configs.recommended.rules, // これを有効にすると多くの警告/エラーが出ます

      // 選択的に有効化する例
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/custom-error-definition': 'error',
      'unicorn/error-message': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': ['warn', { cases: { kebabCase: true, pascalCase: true } }],
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-array-reduce': 'warn', // チームの方針による (可読性の観点から)
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-for-loop': 'warn', // .map, .filter などを使うことを推奨
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-nested-ternary': 'warn', // Prettier と競合する場合があるので注意
      'unicorn/no-new-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-process-exit': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
      'unicorn/no-zero-fractions': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/prefer-default-parameters': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-modern-dom-apis': 'error',
      'unicorn/prefer-node-protocol': 'error', // 'node:' prefix を強制
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-switch': 'warn',
      'unicorn/prefer-ternary': 'warn',
      'unicorn/prevent-abbreviations': [
        'warn',
        { replacements: { props: false, ref: false, params: false, args: false } },
      ], // 略語をどこまで許容するか
      'unicorn/throw-new-error': 'error',
    },
  },

  // 8. その他、プロジェクト全体に適用したいルール
  {
    rules: {
      'no-warning-comments': [
        'warn',
        { terms: ['todo', 'fixme', 'xxx', 'hack'], location: 'anywhere' },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }], // `== null` は `=== null || === undefined` の短縮形として許容
      // 'no-shadow': 'off', // @typescript-eslint/no-shadow を推奨 (型を考慮するため)
      // '@typescript-eslint/no-shadow': 'error', // 有効化する場合
    },
  },

  // 9. セキュリティ関連ルール (オプション: プロジェクトに応じて導入検討)
  /*
  {
    // files: ['** / *. {js,ts}'], // サーバサイドコードや重要なロジックに限定することも可能
    plugins: {
      // security: securityPlugin, // `eslint-plugin-security` or `eslint-plugin-security-node`
    },
    rules: {
      // ...securityPlugin.configs.recommended.rules,
    }
  },
  */

  // Z. Prettier との競合を避ける設定 (必ず最後に配置)
  // これにより、ESLint のフォーマット関連ルールが無効になり、Prettier に一任される
  prettierConfig
);
