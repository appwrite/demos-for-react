import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Storage } from 'appwrite';
import PreviewImage from './PreviewImage';
import {bucketID} from "../utils"

export default function ListImage(props) {
  const [listImages, setListImages] = useState([]);
  const [active, setActive] = useState(null);
  async function getAllImages() {
    const storage= new Storage(props.appwrite)
    const images = await storage.listFiles(bucketID);
    const me = [...images.files];
    console.log(me);
    setListImages(me);
  }

  useEffect(() => {
    getAllImages();
  }, []);
  useEffect(() => {}, [active]);

  async function selectImage(e, id, index) {
    setActive(index);
    props.changeImage(id);
  }
  return (
    <div>
      <h1>List Image</h1>

      <Button
        style={{ marginBottom: 30 }}
        variant="contained"
        color="primary"
        onClick={() => getAllImages()}
      >
        Refresh List
      </Button>

      <Grid container direction="row" spacing={5}>
        {listImages?.length && listImages.length > 0
          ? listImages.map((a, index) => {
              // eslint-disable-next-line no-param-reassign
              a.color = active === index ? 'solid' : 'none';
             
              return (
                <Grid
                  container
                  justify="center"
                  xs={4}
                  item
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{ border: a.color, cursor: 'pointer' }}
                  onClick={(e) => selectImage(e, a.$id, index)}
                >
                  <PreviewImage width={300} output="webp" appwrite={props.appwrite} id={a.$id} />
                </Grid>
              );
            })
          : ''}
      </Grid>
    </div>
  );
}
