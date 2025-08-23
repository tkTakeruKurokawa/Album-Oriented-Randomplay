import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { expect, afterEach, beforeAll, afterAll } from 'vitest'

import { server } from '../mocks/server'

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers)

// MSWのサーバーを開始・終了
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})
afterEach(() => {
  cleanup()
  server.resetHandlers() // リクエストハンドラーをリセット
})
afterAll(() => {
  server.close()
})
