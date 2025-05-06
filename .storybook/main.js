import { dirname, join } from 'path';

/**
 * この設定ファイルはStorybookでパスエイリアスを使えるようにします
 * @type { import('@storybook/core-common').StorybookConfig }
 */
export default {
  staticDirs: ['../public'],

  webpackFinal: async config => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // @/ パスエイリアスを追加
    config.resolve.alias['@'] = join(dirname(__dirname), 'src');

    return config;
  },
};
