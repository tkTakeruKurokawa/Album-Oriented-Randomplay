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
        // プロジェクト固有の色を設定できます
      },
      fontFamily: {
        // プロジェクト固有のフォントを設定できます
      },
    },
  },
  plugins: [],
};
