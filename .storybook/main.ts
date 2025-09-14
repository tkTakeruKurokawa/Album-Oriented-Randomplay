import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    if (config.resolve) {
      config.resolve.alias = Object.assign(config.resolve.alias ?? {}, {
        '@': path.resolve(__dirname, '../src'),
      })
    }
    return config
  },
}

export default config
