import React, { useState, useEffect } from 'react';
import { appWrite } from './utils';
import { PreviewAndCrop } from './components/PreviewAndCrop';
import { ListImage } from './components/ListImage';
import { UploadImage } from './components/UploadImage';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
function App() {
  const [appwrite] = useState(appWrite({ endpoint: "http://localhost:4000/v1", projectId: "5f6f49028c5b9" }))
  const [userProfile, setUserProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(true);
  const [imageId, setImageId] = useState(null);
  async function getUserData() {
    try {
      const response = await appwrite.account.get();
      setUserProfile(response)
    } catch (err) {
      console.log(err)
    }
  }



  async function logout() {
    await setUserProfile(false);
    appwrite.account.deleteSession('current');
  }
  useEffect(() => {

    getUserData()
  }, []);

  function changeImage(id) {
    setImageId(id)
  }
  return (
    <div>

      {!userProfile && (
        <div >
          <Login
            appwrite={appwrite}
            currentPage={currentPage}
            getUserData={getUserData}
            setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
          />
          <SignUp
            appwrite={appwrite}
            currentPage={currentPage}
            setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
          />

        </div>
      )}
      {userProfile && (
        <Container component="main"  >
        
          <UploadImage appwrite={appwrite} />
          <ListImage appwrite={appwrite} changeImage={(id) => changeImage(id)} />
          <PreviewAndCrop imageId={imageId} appwrite={appwrite} />
          <Button 
           variant="contained"
           color="primary"
          onClick={() => logout()}>
          LOGOUT
        </Button>
          
        </Container>

      )}

    </div>
  )

};

export default App;