import { AxiosError, AxiosResponse } from 'axios'

import spotifyApi from './spotify'

import { SpotifyAlbumsResponse } from '@/types/spotify/albums'

// Spotify API エラーレスポンス型
interface SpotifyErrorResponse {
  error?: {
    message?: string
  }
}

/**
 * ユーザーの保存済みアルバムを取得する関数
 * @param limit 取得するアルバム数（最大50）
 * @param offset ページネーションのオフセット
 * @returns 保存済みアルバムのレスポンス
 */
export const getUserSavedAlbums = async (
  limit = 20,
  offset = 0,
): Promise<SpotifyAlbumsResponse> => {
  try {
    const response: AxiosResponse<SpotifyAlbumsResponse> = await spotifyApi.get('/me/albums', {
      params: {
        limit,
        offset,
        market: 'from_token',
      },
    })

    return response.data
  } catch (error) {
    console.error('Failed to fetch saved albums:', error)

    if (error instanceof AxiosError && error.response) {
      const status = error.response.status
      const data = error.response.data as SpotifyErrorResponse
      throw new Error(
        `Failed to fetch saved albums: ${String(status)} - ${data.error?.message ?? 'Unknown error'}`,
      )
    }

    throw new Error('Failed to fetch saved albums')
  }
}

/**
 * アルバムの詳細情報を取得する関数
 * @param albumId アルバムID
 * @returns アルバム詳細情報
 */
export const getAlbumDetails = async (albumId: string): Promise<unknown> => {
  try {
    const response = await spotifyApi.get(`/albums/${albumId}`, {
      params: {
        market: 'from_token',
      },
    })

    return response.data
  } catch (error) {
    console.error(`Failed to fetch album details for ID ${albumId}:`, error)

    if (error instanceof AxiosError && error.response) {
      const status = error.response.status
      const data = error.response.data as SpotifyErrorResponse
      throw new Error(
        `Failed to fetch album details: ${String(status)} - ${data.error?.message ?? 'Unknown error'}`,
      )
    }

    throw new Error('Failed to fetch album details')
  }
}

/**
 * ランダムなアルバムを選択する関数
 * @param count 選択するアルバムの数
 * @returns ランダムに選択されたアルバムの配列
 */
export const getRandomAlbums = async (count = 1): Promise<SpotifyAlbumsResponse['items']> => {
  try {
    // 最初に総数を取得（limit=1で最小限のデータ取得）
    const initialResponse = await getUserSavedAlbums(1, 0)
    const totalAlbums = initialResponse.total

    if (totalAlbums === 0) {
      return []
    }

    // ランダムなoffsetを生成
    const randomAlbums: SpotifyAlbumsResponse['items'] = []
    const selectedIndices = new Set<number>()

    // 必要な数のユニークなランダムアルバムを選択
    while (randomAlbums.length < count && randomAlbums.length < totalAlbums) {
      // ランダムなインデックスを生成（すでに選択済みのものは除外）
      let randomIndex: number
      do {
        randomIndex = Math.floor(Math.random() * totalAlbums)
      } while (selectedIndices.has(randomIndex))

      selectedIndices.add(randomIndex)

      // 該当インデックスのアルバムを取得
      const response = await getUserSavedAlbums(1, randomIndex)

      if (response.items.length > 0 && response.items[0]) {
        randomAlbums.push(response.items[0])
      }
    }

    return randomAlbums
  } catch (error) {
    console.error('Failed to get random albums:', error)
    throw new Error(`Failed to get random albums: ${String(error)}`)
  }
}
