import { Storage } from 'appwrite';
import React from 'react';
import {bucketID} from "../utils"

export default function PreviewImage({ id, width, height, quality, background, output, appwrite }) {
  const storage= new Storage(appwrite)
  function getImage() {
    const mWidth = width || undefined;
    const mHeight = height || undefined;
    const mQuality = quality || undefined;
    const mBackground = background || undefined;
    const mOutput = output || undefined;
    const image = storage.getFilePreview(
      bucketID,
      id,
      mWidth,
      mHeight,
      undefined,  //  gravity
      mQuality,   
      undefined,  //  borderWidth
      undefined,  //  borderColor
      undefined,  //  borderRadius
      undefined,  //  opacity
      undefined,  //  rotation
      mBackground,
      mOutput     //  output not working


    );

    return image;
  }

  return <img alt="" src={id ? getImage() : ''} />;
}
