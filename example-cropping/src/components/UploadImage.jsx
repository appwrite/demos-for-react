import React, { useState } from 'react';



function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState(false);  

  let processUpload = async (props) => {
    setLoading(true)
    try {
      let promise = await props.appwrite.storage.createFile(uploadFile, [], []);
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  
  
  
  }
  let onFileChange = e => {
    setUploadFile(e.target.files[0])
  }  

    return (
      <div>
        <h1>Upload Image</h1>
        {error && (<p>{error}</p>)}
        <input type="file" onChange={onFileChange} />

        <button disabled={loading} onClick={() => { processUpload(props) }} >Upload</button>

      </div>
    )
  
};

export { UploadImage };