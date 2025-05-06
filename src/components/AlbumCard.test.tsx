import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AlbumCard from './AlbumCard';

describe('AlbumCard', () => {
  it('必須プロップスでレンダリングされる', () => {
    // Arrange
    const props = {
      title: 'テストアルバム',
      artist: 'テストアーティスト',
    };

    // Act
    render(<AlbumCard {...props} />);

    // Assert
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.artist)).toBeInTheDocument();
    // オプショナルプロップスがない場合、年は表示されない
    expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument();
  });

  it('全てのプロップスでレンダリングされる', () => {
    // Arrange
    const props = {
      title: 'テストアルバム',
      artist: 'テストアーティスト',
      coverUrl: 'https://example.com/album.jpg',
      year: 2025,
    };

    // Act
    render(<AlbumCard {...props} />);

    // Assert
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.artist)).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();

    // 画像が正しく表示されていることを確認
    const image = screen.getByAltText(`${props.title} by ${props.artist}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.coverUrl);
  });
});
