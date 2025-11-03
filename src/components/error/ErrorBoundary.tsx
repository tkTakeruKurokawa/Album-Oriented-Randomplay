'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * エラーバウンダリーコンポーネント
 * 子コンポーネントでエラーが発生した場合に捕捉し、フォールバックUIを表示する
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // エラーが発生したらステートを更新してフォールバックUIをレンダリングする
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // エラー情報をログまたはエラー追跡サービスに記録
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // フォールバックUIをレンダリング
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function' && this.state.error) {
          return this.props.fallback(this.state.error, this.resetErrorBoundary);
        }
        return this.props.fallback as ReactNode;
      }

      // デフォルトのフォールバックUI
      return (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <h2 className="text-lg font-semibold text-red-800">
            エラーが発生しました
          </h2>
          <p className="mt-2 text-sm text-red-700">
            {this.state.error?.message ??
              'アプリケーションで問題が発生しました。'}
          </p>
          <button
            onClick={this.resetErrorBoundary}
            className="mt-3 rounded bg-red-100 px-4 py-2 text-red-800 transition-colors hover:bg-red-200"
          >
            再試行
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
