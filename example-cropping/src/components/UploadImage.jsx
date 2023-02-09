import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Storage,ID } from 'appwrite';
import {bucketID} from "../utils"

export default function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState(false);
  const processUpload = async (_props) => {
    setLoading(true);
    try {
      const storage=new Storage(_props.appwrite);
      await storage.createFile(bucketID,ID.unique(),uploadFile);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  const onFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload Image</h1>
      {error && <p>{error}</p>}
      <input type="file" onChange={onFileChange} />
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={() => {
          processUpload(props);
        }}
      >
        Upload
      </Button>
    </div>
  );
}
