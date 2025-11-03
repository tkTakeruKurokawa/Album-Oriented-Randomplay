import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react-swc';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  viteFinal(config) {
    // パスエイリアスの設定
    if (config.resolve) {
      config.resolve.alias = Object.assign(config.resolve.alias ?? {}, {
        '@': new URL('../src', import.meta.url).pathname,
        'next/image': new URL('../src/mocks/NextImageMock.tsx', import.meta.url)
          .pathname,
      });
    }

    // sharp関連モジュールを除外設定
    config.optimizeDeps ??= {};
    config.optimizeDeps.exclude ??= [];
    config.optimizeDeps.exclude.push('sharp', 'plaiceholder');

    // Next.js用のグローバル変数の定義
    config.define = config.define
      ? Object.assign(config.define, {
          global: 'globalThis',
          process: JSON.stringify({
            env: {
              NODE_ENV: 'development',
            },
          }),
        })
      : {
          global: 'globalThis',
          process: JSON.stringify({
            env: {
              NODE_ENV: 'development',
            },
          }),
        };

    // React自動インポート設定（新しいJSX Transform使用）
    config.plugins = config.plugins ?? [];
    config.plugins.unshift(
      react({
        jsxImportSource: 'react',
      })
    );

    return config;
  },
};

export default config;
