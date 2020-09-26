import React,{useState} from 'react';
import { appWrite } from './utils';
import './App.css';

import { PreviewImage } from './components/PreviewImage';
import { ListImage } from './components/ListImage';
import { UploadImage } from './components/UploadImage';
import { Login } from './components/Login';

function App (){
  const [appwrite,setAppwrite]=useState(appWrite({endpoint:"http://localhost:4000/v1",projectId:"5f6f49028c5b9"}))
  const [userProfile,setUserProfile]=useState(false);
  const [error,setError]=useState(false);
  async function getUserData(){
    try {
      const response = await appwrite.account.get(); // Request to appwrite server to see if we are logged in.
      setUserProfile(response)
    } catch (err) { // If we are not logged in or another error occoured then catch(err)
      setError(err.message)
    }
  }
  async function login (email, password) {
    try {
      // Set error to false so if we are successful the error doesn't perist making bad UX Design.
      // also set the loading prop to true to signal to the user we are processing his request.
      setError(false)

      // Create the session, if this fails it will error and be caught by the catch(err).
      await appwrite.account.createSession(
        email,
        password
      );
      // If all is successful then get the userdata.
      getUserData();
    } catch (err) {
      setError('Invalid Credentials') // If login fails then show user the login was not successful.
      
    }
  }

  // Logout the user function.
  async function logout () {
    await setUserProfile(false); // Remove the local copy of the userprofile causing the app to see that the user is not logged in.
    appwrite.account.deleteSession('current'); // Tell appwrite server to remove current session and complete the logout.
  }
   
    
    return (
      <div>
        <UploadImage appwrite={appwrite}/>
        <ListImage appwrite={appwrite}/>
        <PreviewImage appwrite={appwrite}/>
      </div>
    )
  
};

export default App;