import AlbumCard from './AlbumCard'

import type { Meta, StoryObj } from '@storybook/react'

import { generateSvgPlaceholder } from '@/lib/placeholder'

const meta = {
  title: 'Components/AlbumCard',
  component: AlbumCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'アルバム情報を表示するカードコンポーネント。画像、タイトル、アーティスト名、年を表示できます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'アルバムのタイトル',
    },
    artist: {
      control: 'text',
      description: 'アーティスト名',
    },
    coverUrl: {
      control: 'text',
      description: 'アルバムカバー画像のURL（オプション）',
    },
    year: {
      control: 'number',
      description: 'リリース年（オプション）',
    },
  },
} satisfies Meta<typeof AlbumCard>

export default meta
type Story = StoryObj<typeof meta>

// 基本的なストーリー
export const Default: Story = {
  args: {
    title: 'Abbey Road',
    artist: 'The Beatles',
    coverUrl: generateSvgPlaceholder({ text: 'Abbey Road\nThe Beatles' }),
    year: 1969,
  },
}

// 画像なしのストーリー
export const WithoutImage: Story = {
  args: {
    title: 'Untitled Album',
    artist: 'Unknown Artist',
    year: 2024,
  },
}

// 年なしのストーリー
export const WithoutYear: Story = {
  args: {
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    coverUrl: generateSvgPlaceholder({ text: 'RAM', bgColor: '#dc2626' }),
  },
}

// 長いタイトルのストーリー
export const LongTitle: Story = {
  args: {
    title: 'The Dark Side of the Moon: 50th Anniversary Edition Deluxe Box Set',
    artist: 'Pink Floyd',
    coverUrl: generateSvgPlaceholder({ text: 'Pink Floyd', bgColor: '#7c3aed' }),
    year: 1973,
  },
}

// 短いタイトルのストーリー
export const ShortTitle: Story = {
  args: {
    title: 'IV',
    artist: 'Led Zeppelin',
    coverUrl: generateSvgPlaceholder({ text: 'IV', bgColor: '#059669' }),
    year: 1971,
  },
}

// 最小構成（必須プロパティのみ）
export const MinimalProps: Story = {
  args: {
    title: 'Test Album',
    artist: 'Test Artist',
  },
}

// 実際のSpotifyアルバムサンプル（プレースホルダー画像使用）
export const SpotifyExample: Story = {
  args: {
    title: 'OK Computer',
    artist: 'Radiohead',
    coverUrl: generateSvgPlaceholder({ text: 'OK Computer\nRadiohead' }),
    year: 1997,
  },
  parameters: {
    docs: {
      description: {
        story: 'Spotifyから取得したアルバム情報の表示例です。',
      },
    },
  },
}

// 日本語タイトルのテスト
export const JapaneseTitle: Story = {
  args: {
    title: 'さくらんぼの実る頃',
    artist: '森高千里',
    coverUrl: generateSvgPlaceholder({ text: 'さくらんぼの実る頃\n森高千里' }),
    year: 1989,
  },
}

// 複数のカードを並べて表示するストーリー
export const MultipleCards = {
  render: () => (
    <div className='grid grid-cols-3 gap-4'>
      <AlbumCard
        title='Thriller'
        artist='Michael Jackson'
        coverUrl={generateSvgPlaceholder({ text: 'Thriller', bgColor: '#fbbf24' })}
        year={1982}
      />
      <AlbumCard
        title='Back in Black'
        artist='AC/DC'
        coverUrl={generateSvgPlaceholder({ text: 'Back in Black\nAC/DC' })}
        year={1980}
      />
      <AlbumCard
        title='Hotel California'
        artist='Eagles'
        coverUrl={generateSvgPlaceholder({ text: 'Eagles', bgColor: '#dc2626' })}
        year={1976}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '複数のAlbumCardを並べて表示した例です。',
      },
    },
  },
} satisfies StoryObj
