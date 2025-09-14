// ブラウザ環境ではsharpを使用しない
// サーバーサイド（Node.js）環境でのみplaiceholderを読み込み
let getPlaiceholder: ((src: Buffer) => Promise<{ base64: string }>) | undefined

// ブラウザ環境では常にundefinedに設定
// eslint-disable-next-line unicorn/prefer-global-this -- ブラウザ環境判定のため
if (typeof window === 'undefined') {
  // サーバーサイド環境でのみplaiceholderを読み込み
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module -- 条件付きインポートのためrequireを使用
    const plaiceholder = require('plaiceholder') as {
      getPlaiceholder: (src: Buffer) => Promise<{ base64: string }>
    }
    getPlaiceholder = plaiceholder.getPlaiceholder
  } catch {
    // sharpが利用できない場合は無視
    getPlaiceholder = undefined
  }
}

/**
 * placeholder画像の設定オプション
 */
export interface PlaceholderOptions {
  /** 画像の幅 (デフォルト: 200) */
  width?: number
  /** 画像の高さ (デフォルト: 200) */
  height?: number
  /** 背景色 (デフォルト: '#1f2937') */
  backgroundColor?: string
  /** テキスト色 (デフォルト: '#ffffff') */
  textColor?: string
  /** 表示するテキスト */
  text?: string
  /** フォントサイズ (デフォルト: 16) */
  fontSize?: number
}

/**
 * アルバムアート用のplaceholder画像URLを生成する
 */
export function generateAlbumPlaceholder(options: PlaceholderOptions = {}): string {
  const {
    width = 200,
    height = 200,
    backgroundColor = '#1f2937',
    textColor = '#ffffff',
    text = 'Album',
    fontSize = 16,
  } = options

  // 背景色から#を削除
  const bgColor = backgroundColor.replace('#', '')
  const txtColor = textColor.replace('#', '')

  return `https://via.placeholder.com/${width.toString()}x${height.toString()}/${bgColor}/${txtColor}?text=${encodeURIComponent(text)}&font-size=${fontSize.toString()}`
}

/**
 * アーティスト用のplaceholder画像URLを生成する
 */
export function generateArtistPlaceholder(options: PlaceholderOptions = {}): string {
  const {
    width = 200,
    height = 200,
    backgroundColor = '#7c3aed',
    textColor = '#ffffff',
    text = 'Artist',
    fontSize = 16,
  } = options

  const bgColor = backgroundColor.replace('#', '')
  const txtColor = textColor.replace('#', '')

  return `https://via.placeholder.com/${width.toString()}x${height.toString()}/${bgColor}/${txtColor}?text=${encodeURIComponent(text)}&font-size=${fontSize.toString()}`
}

/**
 * 色のプリセット
 */
export const colorPresets = {
  dark: '#1f2937',
  red: '#dc2626',
  purple: '#7c3aed',
  green: '#059669',
  slate: '#0f172a',
  pink: '#ec4899',
  yellow: '#fbbf24',
  blue: '#2563eb',
  gray: '#6b7280',
} as const

export type ColorPreset = keyof typeof colorPresets

/**
 * プリセット色を使用してplaceholder画像を生成する
 */
export function generatePlaceholderWithPreset(
  text: string,
  colorPreset: ColorPreset = 'dark',
  options: Omit<PlaceholderOptions, 'backgroundColor' | 'text'> = {},
): string {
  return generateAlbumPlaceholder({
    ...options,
    backgroundColor: colorPresets[colorPreset],
    text,
  })
}

/**
 * ローカル画像からblurred placeholderを生成する（サーバーサイドで使用）
 */
export async function generateBlurredPlaceholder(imageBuffer: Buffer) {
  try {
    if (!getPlaiceholder) {
      // sharpが利用できない場合のフォールバック
      console.warn('getPlaiceholder is not available, falling back to static placeholder')
      return generateAlbumPlaceholder({ text: 'Loading...' })
    }
    const { base64 } = await getPlaiceholder(imageBuffer)
    return base64
  } catch (error) {
    console.error('Failed to generate blurred placeholder:', error)
    // フォールバック：シンプルなplaceholder
    return generateAlbumPlaceholder({ text: 'Loading...' })
  }
}

/**
 * アルバム情報に基づいてplaceholder画像を生成する
 */
export function generateAlbumArtPlaceholder(
  albumTitle: string,
  artistName?: string,
  options: PlaceholderOptions = {},
): string {
  // アルバム名から色を決定（シンプルなハッシュベース）
  const colorKeys = Object.keys(colorPresets) as ColorPreset[]
  // eslint-disable-next-line unicorn/prefer-spread, unicorn/prefer-code-point -- シンプルなハッシュのため意図的にsplit('')とcharCodeAtを使用
  const hash = albumTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colorPreset = colorKeys[hash % colorKeys.length]

  // 表示テキストを短縮
  const shortTitle = albumTitle.length > 12 ? albumTitle.slice(0, 12) + '...' : albumTitle
  const displayText = artistName ? `${shortTitle}\n${artistName}` : shortTitle

  return generatePlaceholderWithPreset(displayText, colorPreset, options)
}
