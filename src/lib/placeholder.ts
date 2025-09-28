import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder'

/**
 * @cloudfour/simple-svg-placeholder のオプション
 * ライブラリの型定義が提供されていないため、ここで定義します。
 */
interface SvgPlaceholderOptions {
  width?: number
  height?: number
  text?: string
  fontFamily?: string
  fontWeight?: number
  fontSize?: number
  dy?: number
  bgColor?: string
  textColor?: string
}

/**
 * SVGプレースホルダーのData URIを生成する汎用関数
 *
 * @param options - プレースホルダーの見た目を設定するオプション
 * @returns SVGのData URI文字列
 */
export function generateSvgPlaceholder(options: SvgPlaceholderOptions = {}): string {
  // ライブラリを直接呼び出し、Data URIとして取得
  return simpleSvgPlaceholder({ ...options, dataUri: true })
}
