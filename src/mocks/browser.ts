import { handlers } from './handlers';
import { setupWorker } from 'msw/browser';

// ブラウザ環境用のMSWワーカーをセットアップ
export const worker = setupWorker(...handlers);

// この関数を開発環境で呼び出してモックを有効化
export function initMocks() {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      worker
        .start({
          onUnhandledRequest: 'bypass', // 未処理のリクエストは実際のAPIに流す
        })
        .catch(console.error);

      console.log('[MSW] Mock Service Worker起動しました');
    }
  }
}
