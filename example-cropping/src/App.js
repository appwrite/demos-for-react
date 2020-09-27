import React, { useState, useEffect } from 'react';
import { appWrite } from './utils';
import { PreviewAndCrop } from './components/PreviewAndCrop';
import { ListImage } from './components/ListImage';
import { UploadImage } from './components/UploadImage';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

function App() {
  const [appwrite, setAppwrite] = useState(appWrite({ endpoint: "http://localhost:4000/v1", projectId: "5f6f49028c5b9" }))
  const [userProfile, setUserProfile] = useState(false);
  const [error, setError] = useState(false);
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
  async function login(email, password) {
    try {
      setError(false)
      await appwrite.account.createSession(
        email,
        password
      );
      getUserData();
    } catch (err) {
      console.log(err.message)
      setError({ type: "login", message: err.message })


    }
  }
  async function signUp(email, password) {
    try {


      setError(false)


      await appwrite.account.create(
        email,
        password
      );
      setCurrentPage(true)

    } catch (err) {
      setError({ type: "signUp", message: err.message })

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
        <div className='loginPage'>
          <Login currentPage={currentPage} loginFunc={(email, password) => login(email, password)} error={() => error} />
          <SignUp currentPage={currentPage} signUpFunc={(email, password) => signUp(email, password)} error={() => error} />
          <div className='loginSwitchContainer'>
            <p>{currentPage ? "Haven't got an account?" : 'Got an account?'}</p>
            <button onClick={() => setCurrentPage(!currentPage)}>{currentPage ? 'Sign Up' : 'Login'}</button>
          </div>
        </div>
      )}
      {userProfile && (
        <div>
          <UploadImage appwrite={appwrite} />
          <ListImage appwrite={appwrite} changeImage={(id) => changeImage(id)} />
          <PreviewAndCrop imageId={imageId} appwrite={appwrite} />

          <button onClick={() => logout()}>LOGOUT</button>
        </div>

      )}

    </div>
  )

};

export default App;