import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import appWrite from './utils';
import PreviewAndCrop from './components/PreviewAndCrop';
import ListImage from './components/ListImage';
import UploadImage from './components/UploadImage';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [appwrite] = useState(
    appWrite({ endpoint: 'http://localhost:4000/v1', projectId: '5f830bed0e5bf' }),
  );
  const [userProfile, setUserProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(true);
  const [imageId, setImageId] = useState(null);
  async function getUserData() {
    try {
      const response = await appwrite.account.get();
      setUserProfile(response);
    } catch (err) {
      // console.log(err);
    }
  }

  async function logout() {
    await setUserProfile(false);
    appwrite.account.deleteSession('current');
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {!userProfile && (
        <div>
          <Login
            appwrite={appwrite}
            currentPage={currentPage}
            getUserData={getUserData}
            setCurrentPage={(curPage) => setCurrentPage(!curPage)}
          />
          <SignUp
            appwrite={appwrite}
            currentPage={currentPage}
            setCurrentPage={(curPage) => setCurrentPage(!curPage)}
          />
        </div>
      )}
      {userProfile && (
        <Container component="main">
          <UploadImage appwrite={appwrite} />
          <ListImage appwrite={appwrite} changeImage={(id) => setImageId(id)} />
          <PreviewAndCrop imageId={imageId} appwrite={appwrite} />
          <Button variant="contained" color="primary" onClick={() => logout()}>
            LOGOUT
          </Button>
        </Container>
      )}
    </div>
  );
}

export default App;
