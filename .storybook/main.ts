import type { StorybookConfig } from '@storybook/react-vite'

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
      })
    }

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
        }

    return config
  },
}

export default config
