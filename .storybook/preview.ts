import '../src/styles/globals.css';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

// MSWの初期化
initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f0f0f0',
        },
        {
          name: 'dark',
          value: '#333333',
        },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  // MSWを使用するためのローダーを追加
  loaders: [mswLoader],
};

export default preview;
