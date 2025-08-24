import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/.next/**',
        '**/test/**',
        '**/mocks/**',
        '**/*.config.*',
        '**/*.d.ts',
        '**/layout.tsx', // Next.js App Router レイアウト
        '**/loading.tsx',
        '**/error.tsx',
        '**/not-found.tsx',
      ],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', '.next', 'coverage', 'dist', '.storybook', '**/storybook-static/**'],
    // テスト実行時のタイムアウト設定
    testTimeout: 10_000,
    hookTimeout: 10_000,
    // 並列実行の設定
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    // ウォッチモードの設定
    watch: true,
    // 環境変数のモック
    env: {
      NODE_ENV: 'test',
      NEXTAUTH_URL: 'http://localhost:3000',
      NEXTAUTH_SECRET: 'test-secret',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
