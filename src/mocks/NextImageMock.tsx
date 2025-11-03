/* eslint-disable @next/next/no-img-element */

import React from 'react';

// next/imageのpropsを型定義としてインポート
import type { ImageProps } from 'next/image';

const NextImageMock = (props: ImageProps) => {
  const { src, alt, ...rest } = props;
  // next/imageのunoptimizedプロパティを模倣し、通常のimgタグとしてレンダリング
  return <img src={src as string} alt={alt} {...rest} />;
};

export default NextImageMock;
