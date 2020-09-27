import React, { useState } from 'react';

function PreviewImage(props) {

  function getImage(id){

    let mWidth=props.width || null;
    let mHeight=props.height || null;
    let mQuality=props.quality || 100;
    let mBackground=props.background || null;
    let mOutput=props.output || null;
    let image=props.appwrite.storage.getFilePreview(id,mWidth,mHeight,mQuality,mBackground,mOutput);


    return image
  }

    return (
      
<img src={props.id?getImage(props.id):""} />
      
      
         )
  
};

export { PreviewImage };