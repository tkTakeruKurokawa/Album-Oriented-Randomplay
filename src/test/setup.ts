import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'

import { server } from '../mocks/server'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// Next.js関連のモック
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// IntersectionObserver のモック
class IntersectionObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

// ResizeObserver のモック
class ResizeObserver {
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
})

// Next.js Image 最適化のためのモック
Object.defineProperty(globalThis, 'Image', {
  writable: true,
  value: class {
    constructor() {
      setTimeout(() => {
        if (this.onload) this.onload()
      }, 100)
    }
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    src = ''
    alt = ''
  },
})

// fetch のモック（Next.js API Route用）
globalThis.fetch = vi.fn()

// 環境変数のモック
process.env = {
  ...process.env,
  NODE_ENV: 'test',
  NEXTAUTH_URL: 'http://localhost:3000',
  NEXTAUTH_SECRET: 'test-secret',
}

// MSWのサーバーを開始・終了
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  cleanup()
  server.resetHandlers() // リクエストハンドラーをリセット
  vi.clearAllMocks() // すべてのモックをクリア
})

afterAll(() => {
  server.close()
})
