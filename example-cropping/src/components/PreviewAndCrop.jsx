import React, { useState } from 'react';
import {PreviewImage} from "./PreviewImage"
function PreviewAndCrop(props) {
  const [width,setWidth]=useState(null)
  const [height,setHeight]=useState(null)
  const [quality,setQuality]=useState(null)
  const [background,setBackground]=useState(null)
  const [output,setOutput]=useState(null)
  
 return (
   <div>
<h1>Preview and Crop Image</h1>
width : <input onChange={(e)=>setWidth(e.target.value)} type="range" min="0" max="4000"  /> {width}
height : <input onChange={(e)=>setHeight(e.target.value)} type="range" min="0" max="4000"  /> {height}
quality : <input onChange={(e)=>setQuality(e.target.value)} type="range" min="0" max="100"  /> {quality}
background : <input type="color" onChange={(e)=>setBackground(e.target.value.replace("#",""))}/>
output : <select onChange={(e)=>setOutput(e.target.value)}>
  <option value="jpeg">jpeg</option>
  <option value="jpg">jpg</option>
  <option value="png">png</option>
  <option value="gif">gif</option>
  <option value="webp">webp</option>
</select>
<PreviewImage appwrite={props.appwrite} width={width} height={height} quality={quality} background={background} output={output} id={props.imageId} />
   </div>
  
 )
  
};

export { PreviewAndCrop };