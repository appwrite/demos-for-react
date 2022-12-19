# Appwrite + ReactJS =❤️

This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [React](https://reactjs.org/) by creating a Simple image cropping examples and tutorial.

## Prerequisites

- A Recent Version of NodeJS
- Yarn (Feel free to use NPM if you want to, just switch out the Yarn Commands for their NPM counterparts)
- [A locally running appwrite instance](https://appwrite.io/docs/installation).

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

With the boilerplate now complete we can now initialise the Appwrite SDK in the project before working on the cropping tutorial. To keep things clean we will initialise this in it's own file, we will create this file in `src/` and call it `utils.js`. Within this file go ahead and paste the following code:

```js
import { Client } from 'appwrite';

const client = new Client();

const bucketID = '633ba835e370fde52ce7';  // your bucket ID
const endpoint = 'http://localhost/v1';  // Your End point
const projectId = 'ProjectID'; //Your bucked ID

client.setEndpoint(endpoint).setProject(projectId);

export { bucketID, client };

```

## How To Use Cropping Using Appwrite SDK

To crop an image using appwrite SDK is actually pretty simple you just need to upload your file into appwrite storage then preview the image and pass the optional parameters, if you take a look at the js docs in https://appwrite.io/docs/client/storage#getFilePreview you will see all of the optional parameters and how to use it. Below is the example of how to use it using js SDK

```js
import { Client, Storage } from "appwrite";

const client = new Client();

const storage = new Storage(client);

client
    .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const result = storage.getFilePreview('[BUCKET_ID]', '[FILE_ID]');

console.log(result);// Resource URL for example http://localhost/v1/storage/buckets/{bucketId}/files/{fileId}/preview
```

using the above script we will get our image with the output that we like so for example we pass 300 as width,100 as quality and output webp we can get the exact output without the need of CDN. Appwrite will do it just like we want. Now we will create a component that can implement this functionality using react, below is the step by step procedure on how to create a simple app that can crop our image from Appwrite storage starting from signup, login, upload, list, then preview and crop.

## Step 1 - Create PreviewImage Component

So this is actually the main ingredient in our tutorial what this does is to show the preview of the image in our server and return in a spesific parameter that we want so in order to use this component we can pass the parameter exactly the same as in the appwrite SDK documentation which is id, width, height, quality, background and output and it will output the image with that specific condition which means this component is used for cropping an image that we get from our storage.

```js
import { Storage } from 'appwrite';
import React from 'react';
import {bucketID} from "../utils"

export default function PreviewImage({ id, width, height, quality, background, output, appwrite }) {
  const storage= new Storage(appwrite)
  function getImage() {
    const mWidth = width || undefined;
    const mHeight = height || undefined;
    const mQuality = quality || undefined;
    const mBackground = background || undefined;
    const mOutput = output || undefined;
    const image = storage.getFilePreview(
      bucketID,
      id,
      mWidth,
      mHeight,
      undefined,  //  gravity
      mQuality,   
      undefined,  //  borderWidth
      undefined,  //  borderColor
      undefined,  //  borderRadius
      undefined,  //  opacity
      undefined,  //  rotation
      mBackground,
      mOutput     //  output not working


    );

    return image;
  }

  return <img alt="" src={id ? getImage() : ''} />;
}

```

### Example usage

```js
import React, { useState } from 'react';
import { Account,ID } from 'appwrite';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({ currentPage, appwrite, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  async function signUp(e) {
    e.preventDefault();
    if (loading) return;

    setError(false);
    setLoading(true);

    if (!(password.length >= 6 && password.length <= 32)) {
      setError('Error: Password must be between 6 and 32 characters.');
      setLoading(true);

      return;
    }
    try {
      const account = new Account(appwrite)
      await account.create(ID.unique(),email, password);
      setCurrentPage(currentPage);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs" style={{ display: currentPage ? 'none' : 'block' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} noValidate onSubmit={(e) => signUp(e)}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}  
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Button variant="body2" onClick={() => setCurrentPage(currentPage)}>
                have an account? Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

```

### Example usage

```js
<SignUp
  appwrite={appwrite}
  currentPage={currentPage}
  setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
/>
```

It takes three props which is

- `appwrite` to connect to appwrite server using sdk
- `currentPage` the state of login or sign up
- `setCurrentPage` to switch between login and sign up

So what this does is process the sign up through `signUp` function then if success it will go to login component so that we can login using that credential, notice that we dont have email verification here, because the purpose of this tutorial is actually to cropping an image and this step is one of the step to implement that functionality.

## Step 3 - Create Login Component

```js
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Account } from 'appwrite';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function login(e) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    try {
      setError(false);
      const account = new Account(props.appwrite)
      await account.createEmailSession(email, password);
      props.getUserData();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  const classes = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      // eslint-disable-next-line react/destructuring-assignment
      style={{ display: props.currentPage ? 'block' : 'none' }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} noValidate onSubmit={(e) => login(e)}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Button variant="body2" onClick={() => props.setCurrentPage(props.currentPage)}>
                Don&apos;t have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
```

### Example usage

```js
<Login
  appwrite={appwrite}
  currentPage={currentPage}
  getUserData={getUserData}
  setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
/>
```

It takes four props which is

- `appwrite` to connect to appwrite server using sdk
- `currentPage` the state of login or sign up
- `setCurrentPage` to switch between login and sign up
- `getUserData` to check we already login or not

Here we implement login because in order for us to be able to crop an image we should login to our appwrite server and this component does exactly that.

## Step 4 - Create UploadImage Component

UploadImage component is used for uploading an image using the Appwrite SDK. Uploading an image will allow us to crop it later.

```js
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

```

### Example usage

```js
<UploadImage appwrite={appwrite} />
```

This only take one props which is ```appwrite``` for connecting to our server using Appwrite SDK

```js
await storage.createFile(bucketID,ID.unique(),uploadFile);
```

This is actually for creating any file but in this tutorial we will use it to create an image file and this function takes three parameters. You can take a look the detailed explanation here https://appwrite.io/docs/client/storage#createFile

## Step 5 - Create ListImage Component

So after we're done uploading our image we would want to see all of our images that we uploaded right? So in order to do that we create a `ListImage` component so that we can display our images stored on the server

```js
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

```

### Example usage

```js
<ListImage appwrite={appwrite} changeImage={(id) => changeImage(id)} />
```

There is two props here:

- `appwrite` for using the appwrite SDK
- `changeImage` to pick or change an image that we want to crop later in `PreviewAndCrop` component

## Step 6 - Create PreviewAndCrop Component

So what this component does is it takes the image that we pick from the list of images and allows us to change the value of the width, height etc. here. So that we can preview how the image looks after cropping.

```js
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import PreviewImage from './PreviewImage';

export default function PreviewAndCrop({ appwrite, imageId }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(0);
  const [background, setBackground] = useState(null);
  const [output, setOutput] = useState(null);

  return (
    <div>
      <h1>Preview and Crop Image</h1>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          {'width : '}
          <Input
            style={{ marginRight: 10 }}
            value={width}
            margin="dense"
            onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (width < 0) {
                setWidth(0);
              } else if (width > 4000) {
                setWidth(4000);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 4000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 4000 '}
        </Grid>
        <Grid item>
          {'height : '}
          <Input
            style={{ marginRight: 10 }}
            value={height}
            margin="dense"
            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (height < 0) {
                setHeight(0);
              } else if (height > 4000) {
                setHeight(4000);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 4000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 4000 '}
        </Grid>
        <Grid item>
          {'quality : '}
          <Input
            style={{ marginRight: 10 }}
            value={quality}
            margin="dense"
            onChange={(e) => setQuality(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (quality < 0) {
                setQuality(0);
              } else if (quality > 100) {
                setQuality(100);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 100 '}
        </Grid>
        <Grid item>
          {'background : '}
          <input
            style={{ marginRight: 10 }}
            type="color"
            onChange={(e) => setBackground(e.target.value.replace('#', ''))}
          />
          only works for png with transparent background
        </Grid>
        <Grid item>
          {'output : '}
          <select onChange={(e) => setOutput(e.target.value)}>
            <option value="jpeg">jpeg</option>
            <option value="jpg">jpg</option>
            <option value="png">png</option>
            <option value="gif">gif</option>
            <option value="webp">webp</option>
          </select>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <PreviewImage
          appwrite={appwrite}
          width={width}
          height={height}
          quality={quality}
          background={background}
          output={output}
          id={imageId}
        />
      </Grid>
    </div>
  );
}
```

### Example usage

```js
<PreviewAndCrop imageId={imageId} appwrite={appwrite} />
```

There is two props here:

- `imageId` to get the state of imageId that we get from `ListImages` component and preview it using `PreviewImage` component
- `appwrite` for using the appwrite SDK

## Step 7 - Putting it all together in App.js

So in order for this application to work we should put all of our components into `App.js` so that we can see how our cropped image looks

```js
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Account } from 'appwrite';
import {client }from './utils';
import PreviewAndCrop from './components/PreviewAndCrop';
import ListImage from './components/ListImage';
import UploadImage from './components/UploadImage';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const [appwrite] = useState(client);
  const account  = new Account(appwrite)
  const [userProfile, setUserProfile] = useState(false);
  const [currentPage, setCurrentPage] = useState(true);
  const [imageId, setImageId] = useState(null);
  async function getUserData() {
    try {
      const response = await account.get();
      setUserProfile(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function logout() {
    await setUserProfile(false);
    account.deleteSession('current');
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

```

So here's what our final application looks like. There are 4 state variables that we use

- `appwrite` state to implement the appwrite SDK that we create in `utils.js` earlier
- `userProfile` to check whether we already login or not
- `currentPage` to change between sign up and login
- `imageId` to pick the image that we want to crop in `ListImages` component then crop it using `PreviewAndCrop` component

There are two functions

- `getUserData` to check whether we already login or not using appwrite SDK
- `logout` to logout of the application

## What next?

Congratulations! You've just created a image cropping page using React and Appwrite! 🥳🥳🥳

Notice that I used material ui for the design here. You can change that if you don't like it, but the most important thing here is you learn how to use the preview and cropping API of Appwrite SDK.

Good Luck! If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs). TIP: TIP: [Preview Image API](https://appwrite.io/docs/client/storage?sdk=web#getFilePreview)

(If you want to checkout the finished code is over on the [repository](https://github.com/appwrite/demos-for-react/tree/master/example-cropping) aswell as a mirror for this tutorial!)
