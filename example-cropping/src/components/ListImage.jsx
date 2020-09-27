import React, { useState, useEffect } from 'react';
import { PreviewImage } from "./PreviewImage"

function ListImage(props) {
  const [listImages,setListImages]=useState([])
  const [active, setActive] = useState(null)
  async function getAllImages() {
    let images = await props.appwrite.storage.listFiles();
    let me=[...images.files];
   
    setListImages(me)

  }

  useEffect(() => {
    getAllImages()

  }, []);
  useEffect(() => {


  }, [active]);
 
  async function selectImage(e, id, index) {

    setActive(index)
    props.changeImage(id)

  }
  return (
    <div>
      <h1>List Image</h1>
      <button onClick={()=>getAllImages()}>refresh list</button>
      {listImages?.length && listImages.length > 0 ? listImages.map((a, index) => {
        a.color = active === index ? "solid" : "none";

        return (
          <div key={index} style={{ display: "inline-block", border: a.color, cursor: "pointer" }} onClick={(e) => selectImage(e, a.$id, index)}>

            <PreviewImage width={300} output={"webp"} appwrite={props.appwrite} id={a.$id} />
          </div>

        )
      }) : ""}
    </div>
  )

};

export { ListImage };