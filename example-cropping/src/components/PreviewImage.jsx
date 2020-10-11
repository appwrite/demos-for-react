import React from 'react';

export default function PreviewImage({ id, width, height, quality, background, output, appwrite }) {
  function getImage() {
    const mWidth = width || null;
    const mHeight = height || null;
    const mQuality = quality || 100;
    const mBackground = background || null;
    const mOutput = output || null;
    const image = appwrite.storage.getFilePreview(
      id,
      mWidth,
      mHeight,
      mQuality,
      mBackground,
      mOutput,
    );

    return image;
  }

  return <img alt="" src={id ? getImage() : ''} />;
}
