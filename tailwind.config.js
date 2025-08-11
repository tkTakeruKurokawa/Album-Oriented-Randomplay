/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Spotify ブランドカラー
        spotify: {
          green: '#1DB954', // メインブランドカラー
          black: '#191414', // 推奨ダーク背景色
          white: '#FFFFFF',
          gray: {
            100: '#F8F8F8',
            200: '#E5E5E5',
            300: '#B3B3B3',
            400: '#828282',
            500: '#535353',
            600: '#404040',
            700: '#2D2D2D',
            800: '#191414', // Spotify black
            900: '#121212',
          },
        },
      },
      fontFamily: {
        // Spotify推奨フォント階層
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        // Spotify アートワーク角丸仕様
        'spotify-sm': '2px', // Small & Medium devices
        'spotify-lg': '4px', // Large devices
      },
      spacing: {
        // Spotify コンテンツ用のスペーシング
        'spotify-item': '12px', // アイテム間の標準間隔
        'spotify-section': '24px', // セクション間の間隔
      },
      minHeight: {
        // アルバムアートワーク用
        'spotify-artwork': '64px',
      },
      maxWidth: {
        // メタデータ文字数制限に基づく幅
        'spotify-track': '23ch', // Track name: 23 characters
        'spotify-artist': '18ch', // Artist name: 18 characters
        'spotify-album': '25ch', // Album name: 25 characters
      },
      zIndex: {
        // プレイヤー関連のz-index
        player: 50,
        modal: 100,
      },
    },
  },
  plugins: [],
};
