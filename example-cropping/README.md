# Appwrite + ReactJS =❤️
This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [React](https://reactjs.org/) by creating a Simple image cropping examples and tutorial.

## Prerequisites

-   A Recent Version of NodeJS
-   Yarn (Feel free to use NPM if you want to, just switch out the Yarn Commands for their NPM counterparts)
-   [A locally running appwrite instance](https://appwrite.io/docs/installation).
## Getting Started
To get started quickly we will use [Create React App](https://github.com/facebook/create-react-app) to create the boilerplate that our code will be built on.
```shell
npx create-react-app appwrite-react
cd appwrite-react
```
While we are in the CLI we will also install the Appwrite JS API by running:
```shell
yarn add appwrite
```
and finally we will launch the React development server with:
```shell
yarn start
```
This should launch a server on `localhost:3000` with Live Reload.

## Introducing the Appwrite SDK
With the boilerplate now complete we can now initialise the Appwrite SDK in the project before working on the login page. To keep things clean we will initialise this in it's own file, we will create this file in `src/` and call it `utils.js`. Within this file go ahead and paste the following code:
```js
import 'appwrite';
const appwrite = new window.Appwrite();
function appWrite({ endpoint, projectId }) {
  let ep = endpoint || 'http://localhost/v1';
  let pi = projectId || 'ProjectID';
  return appwrite
    .setEndpoint(ep)
    .setProject(pi)

}
export { appWrite };

```

TL:DR: Create a appwrite SDK Instance and initalise it with the endpoint and ProjectID of the project we are working with then export this for usage outside of the file.

## Step 1 - Create SignUp Component

This component is used for sign up to our appwrite server using appwrite SDK in order to login you should sign up first to appwrite SDK.

```js

import React, { useState } from 'react';

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



  async function processSignUp(event) {
    event.preventDefault()

    if (loading) return;


    setError(false)
    setLoading(true)

    if (!(password.length >= 6 && password.length <= 32)) {

      setError('Error: Password must be between 6 and 32 characters.')
      setLoading(true)

      return;
    }

    await props.signUpFunc(email, password);


    setLoading(false)
  }


  return (
    <div style={{ display: props.currentPage ? "none" : "block" }} >

      <h1>Sign Up</h1>
      {props.error().type === "signUp" && (
        <p className='error'>{props.error().message}</p>
      )}
      <form onSubmit={(e) => processSignUp(e)}>
        <input onChange={(event) => setEmail(event.target.value)} type='email' id='email' required placeholder='Email' />
        <input onChange={(event) => setPassword(event.target.value)} type='password' id='password' required placeholder='Password' />
        <button disabled={loading} type='submit'>Sign Up</button>
      </form>
    </div>
  )

};

export { SignUp };
```

so what this does is process the sign up thorough props then if success it will go to login and if it fails it will throw an error.

## Step 2 - Create Login Component

So in order for us to crop an image we should first have file in our storage, to do that we can either upload it to storage through appwrite dashboard, or we can create a login page then upload it and then crop the image using appwrite server. This tutorial will use the second one so you will learn how to login, upload, and crop the image using appwrite sdk. First of all we create the login component.

```js

import React, { useState } from 'react';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function processLogin(event) {
    event.preventDefault()

    if (loading) return;

    setLoading(true)
    await props.loginFunc(email, password);


    setLoading(false)
  }


  return (
    <div style={{ display: props.currentPage ? "block" : "none" }}>
      <h1>Login</h1>

      {props.error().type === "login" && (
        <p className='error'>{props.error().message}</p>
      )}
      <form onSubmit={(e) => processLogin(e)}>
        <input onChange={(event) => setEmail(event.target.value)} type='email' id='email' required placeholder='Email' />
        <input onChange={(event) => setPassword(event.target.value)} type='password' id='password' required placeholder='Password' />
        <button disabled={loading} type='submit'>Sign In</button>
      </form>
    </div>
  )

};

export { Login };
```

here we create a functional component that has another function called ```processLogin``` which will process our login through ```props.loginFunc``` if it's success it will go to our main page if it doesn't it will throw an authorized error.

## Step 3 - Create UploadImage Component

UploadImage component is used for uploading component through appwrite SDK so after we login in order for us to crop an image we should upload our image so that we can crop it later

```js
import React, { useState } from 'react';

function UploadImage(props) {
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState(false);

  let processUpload = async (props) => {
    setLoading(true)
    try {
      let promise = await props.appwrite.storage.createFile(uploadFile, ['*'], ['*']);
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
```

## Step 4 - Create ListImage Component

So after we done uploading our image we want to see all of our image that we upload right? so in order to do that we create a ```ListImage``` component so that we can show our image from the server

```js
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

```

There is two important function here which is ```getAllImages``` and ```selectImage``` what is that? so we create ```getAllImages``` so that we can get a list of image that we upload from our server and then we also create ```selectImage``` here so that we can select which of the image that we want to crop for later.

## Step 5 - Create PreviewImage Component

So this is actually the main ingredient in our tutorial what this does is to show the preview of the image in our server and return in a spesific parameter that we want so in order to use this component we can pass the parameter exactly the same as in the appwrite SDK documentation which is id,width,height,quality,background,and output and it will output the image in that spesific condition which mean this component is used for cropping an image that we get from our storage.

```js
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

    return (<img src={props.id?getImage(props.id):""} />)
  
};

export { PreviewImage };
```

## Step 6 - Create PreviewAndCrop Component

So what this component does is to preview how the image will look like after we crop it which means how if the we change the width to 100 how if we change quality to 20 and etc. This component does all that.

```js
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
```

## Step 7 - Putting it all together in App.js

So in order for this application to work we should put all of our component into ```App.js``` so that we can see how our cropped image looks like

```js
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
```

i will explain one by one what does this component do so first of all we import all of the component that we create earlier 

```js
import React, { useState, useEffect } from 'react'; //react hooks for managing state
import { appWrite } from './utils'; //to connect to our server
import { ListImage } from './components/ListImage'; // to list all of our image
import { PreviewAndCrop } from './components/PreviewAndCrop'; //to show the cropped image that we pick from ListImage component
import { UploadImage } from './components/UploadImage'; // to upload image
import { Login } from './components/Login'; // login
import { SignUp } from './components/SignUp'; // sign up
```

so after that we create our state so that our component can re-render if there is some change in state

```js
 const [appwrite, setAppwrite] = useState(appWrite({ endpoint: "http://localhost:4000/v1", projectId: "5f6f49028c5b9" })) // this is for connecting to our appwrite server
  const [userProfile, setUserProfile] = useState(false); //check if we are logegd in or not
  const [error, setError] = useState(false); // check if there are error or not
  const [currentPage, setCurrentPage] = useState(true); // change state between sign up and login
  const [imageId, setImageId] = useState(null); // pick image from ListImage component
```

so after that we create a function that we use for connecting our app to our backend appwrite server

```js
async function getUserData() {
    try {
      const response = await appwrite.account.get();
      setUserProfile(response)
    } catch (err) {
      console.log(err)
    }
  } // check if user already logged in or no 
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
  } // login to server
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
  } // sign up to server

  async function logout() {
    await setUserProfile(false);
    appwrite.account.deleteSession('current');
  } // logout from server

  useEffect(() => {

    getUserData()
  }, []); // from the first time our page load check if user logged in show our main page if no go to login

  function changeImage(id) {
    setImageId(id)
  } // change an image in PreviewAndCrop component
```
after that we can render our app using this code

```js
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
```
so what this does is to check whether or not our user logged in if no go to login if yes go to our main page which is to crop and preview a cropped image

## What next?

Congratulations! You've just created a image cropping page using React and Appwrite! 🥳🥳🥳

Good Luck! If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs). TIP: [Checkout account create documentation for the web API](https://appwrite.io/docs/client/account#create)

(If you want to checkout the finished code is over on the [repository](https://github.com/appwrite/demos-for-react/tree/master/example-auth) aswell as a mirror for this tutorial!)