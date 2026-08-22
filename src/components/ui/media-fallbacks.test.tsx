import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MediaCard } from './MediaCard';
import { TrackListItem } from './TrackListItem';

describe('Spotifyメディアのフォールバック表示', () => {
  it('空のカード情報を安全な名称と画像で表示する', () => {
    const { container } = render(
      <MediaCard href="/album/test" imageUrl={null} title="" />
    );

    expect(screen.getByText('タイトル不明')).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'タイトル不明を開く' })
    ).toBeVisible();
    expect(container.querySelector('img')?.getAttribute('src')).toContain(
      'data:image/svg+xml'
    );
  });

  it('再生不可の複数ディスク曲を理由付きで無効化する', () => {
    render(
      <TrackListItem
        discNumber={2}
        trackNumber={3}
        name=""
        duration="3:45"
        explicit
        isPlayable={false}
        restrictionReason="market"
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('2-3')).toBeVisible();
    expect(screen.getByText('曲名不明')).toBeVisible();
    expect(screen.getByLabelText('露骨な表現を含む')).toHaveTextContent('E');
    expect(screen.getByText('この地域では再生できません')).toBeVisible();
  });
});
