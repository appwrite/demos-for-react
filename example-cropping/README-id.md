# Appwrite + ReactJS =❤️
Ini adalah contoh penggunaan [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) dengan [React](https://reactjs.org/) dengan membuat aplikasi cropping sederhana.

Klik disini untuk [Versi Inggris](/example-cropping/README.md)

## Prasyarat

-   Versi terbaru dan stabil NodeJS
-   Yarn (silahkan jika mau menggunakan NPM)
-   [Server appwrite yang berjalan di localhost](https://appwrite.io/docs/installation).

## Getting Started
Untuk memulai dengan cepat kita akan menggunakan [Create React App](https://github.com/facebook/create-react-app) untuk membuat __boilerplate__ dimana aplikasi kita akan dibuat.
```shell
npx create-react-app appwrite-react
cd appwrite-react
```
kita juga harus menginstall library appwrite dengan mengetik:
```shell
yarn add appwrite
```
lalu kita jalankan aplikasi kita dengan
```shell
yarn start
```
Ini akan memulai aplikasi kita di `localhost:3000` dengan Reload otomatis.

## Pengenalan Appwrite SDK
Setelah __boilerplate__ sudah selesai dibuat sekarang kita bisa menginisialisai Appwrite SDK di proyek kita sebelum membuat tutorial cropping. Untuk menyederhanakan aplikasi kita akan membuat satu file untuk dipakai seterusnya, kita akan membuat file di direktori `src/` dan menamakannya `utils.js`. di dalam file ini copy paste kode berikut:
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

## Bagaimana Cara Membuat Cropping Image Dengan Appwrite SDK

Untuk membuat cropping gambar pertama tama kita harus login setelah login kita upload gambar kita lalu kita crop gambar tersebut menggunakan appwrite SDK seperti berikut:

```js
let sdk = new Appwrite();

sdk
    .setEndpoint('https://[HOSTNAME_OR_IP]/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

let result = sdk.storage.getFilePreview('[FILE_ID]',300,null,100,null,"webp");

console.log(result); // Resource URL for example http://localhost/v1/storage/files/5f70694f8637d/preview?width=300&quality=100&output=webp&project=5f6f49028c5b9

```

dengan menggunakan kode diatas kita akan mendapatkan hasil cropping image kita berupa URL yang nantinya bisa kita pakai dengan memasangnya di tag <img/> sebagai contoh.

## Langkah 1 - Buat Komponen PreviewImage 

Ini adalah komponen yang digunakan untuk memperlihatkan hasil dari cropping image kita

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

contoh penggunaan

```js
<PreviewImage appwrite={props.appwrite} width={width} height={height} quality={quality} background={background} output={output} id={props.imageId} />
```

disini bisa anda lihat ada banyak props yang bisa digunakan semua props ini adalah paramater yang bisa anda lihat dokumentasinya di dokumentasi resmi appwrite SDK https://appwrite.io/docs/client/storage#getFilePreview perbedaannya mungkin tidak ada parameter ```appwrite``` di dokumentasi appwrite SDK karena props ```appwrite``` disini digunakan untuk implementasi appwrite SDK itu sendiri

## Langkah 2 - Buat Komponen SignUp

Komponen berikut digunakan untuk Sign up kedalam server appwrite menggunakan appwrite SDK

```js

import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
   form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const classes = useStyles();
  async function signUp(e) {
    e.preventDefault()
    if (loading) return;


    setError(false)
    setLoading(true)

    if (!(password.length >= 6 && password.length <= 32)) {

      setError('Error: Password must be between 6 and 32 characters.')
      setLoading(true)

      return;
    }
    try {

      await props.appwrite.account.create(
        email,
        password
      );
      props.setCurrentPage(props.currentPage)

    } catch (err) {
      setError(err.message)

    }
    setLoading(false)
  }




  return (
    <Container component="main" maxWidth="xs"  style={{ display: props.currentPage ? "none" : "block" }}>
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      
      {error && (
           <Alert severity="error">{error}</Alert>
    )}
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
            <Link href="#" variant="body2" onClick={()=>props.setCurrentPage(props.currentPage)}>
              {"have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  )

};

export { SignUp };
```
contoh pemakaian

```js
<SignUp
            appwrite={appwrite}
            currentPage={currentPage}
            setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
          />
```
komponen berikut mengambil tiga props:

- ```appwrite``` untuk konek menggunakan sdk
- ```currentPage``` untuk menyimpan state login atau sign up
- ```setCurrentPage``` untuk mengganti state dari login ke sign up dan sebaliknya

## Langkah 3 - Membuat Komponen Login

```js
import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
   form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    async function login(e) {
      e.preventDefault()
  
      if (loading) return;
  
      setLoading(true)
      try {
        setError(false)
        await props.appwrite.account.createSession(
          email,
          password
        )
        props.getUserData()
      } catch(err) {
        
        setError(err.message)
      }
       setLoading(false)
    }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs"  style={{ display: props.currentPage ? "block" : "none" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        
        {error && (
             <Alert severity="error">{error}</Alert>
      )}
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
              <Link href="#" variant="body2" onClick={()=>props.setCurrentPage(props.currentPage)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export {Login}

```

contoh penggunaan

```js
   <Login
            appwrite={appwrite}
            currentPage={currentPage}
            getUserData={getUserData}
            setCurrentPage={(currentPage) => setCurrentPage(!currentPage)}
          />
```
komponen berikut mengambil 4 props yaitu:

- ```appwrite``` untuk konek ke server appwrite
- ```currentPage``` untuk menyimpan state login atau sign up
- ```setCurrentPage``` mengganti state ke login atau sign up
- ```getUserData``` mengecek apakah kita sudah login atau tidak 

## Langkah 4 - Membuat Komponen UploadImage 

Komponen UploadImage untuk mengupload file ke appwrite server menggunakan appwrite SDK

```js
import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
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
      <Button
          
          variant="contained"
          color="primary"
          disabled={loading} onClick={() => { processUpload(props) }}
        >
         Upload
        </Button>
     

    </div>
  )

};

export { UploadImage };
```

contoh penggunaan

```js
  <UploadImage appwrite={appwrite} />
```

komponen ini hanya butuh satu props yaitu ```appwrite``` untuk memanggil method ```createFile```

```js
await props.appwrite.storage.createFile(uploadFile, ['*'], ['*']);
```

method berikut digunakan untuk mengupload file ke server untuk melihat lebih jelas bagaimana cara menggunakannya anda bisa melihat dokumentasinya disini https://appwrite.io/docs/client/storage#createFile

## Langkah 5 - Membuat Komponen ListImage

setelah kita berhasil mengupload image kita membuat komponen ```ListImage``` untuk melihat semua list file kita dan juga komponen ini digunakan untuk memilih file mana yang akan kita crop nantinya.

```js
import React, { useState, useEffect } from 'react';
import { PreviewImage } from "./PreviewImage"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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
      
<Button
          style={{marginBottom:30}}
          variant="contained"
          color="primary"
          onClick={()=>getAllImages()}
        >
      Refresh List
        </Button>
  
      
        <Grid
  container
  direction="row"
  spacing={5}
>
{listImages?.length && listImages.length > 0 ? listImages.map((a, index) => {
        a.color = active === index ? "solid" : "none";

        return (
          <Grid container justify="center" xs={4} item key={index} style={{  border: a.color, cursor: "pointer" }} onClick={(e) => selectImage(e, a.$id, index)}>

            <PreviewImage width={300} output={"webp"} appwrite={props.appwrite} id={a.$id} />
          </Grid>

        )
      }) : ""}
</Grid>
      
    </div>
  )

};

export { ListImage };

```
contoh pemakaian

```js
<ListImage appwrite={appwrite} changeImage={(id) => changeImage(id)} />
```

ada dua props disini:

- ```appwrite``` untuk konek ke server melalui SDK
- ```changeImage``` untuk memilih atau mengubah image yang akan kita crop

## Step 6 - Membuat Komponen PreviewAndCrop

Komponen berikut digunakan untuk memperlihatkan hasil dari cropping yang sudah kita lakukan. Jadi setelah kita memilih gambar di komponen berikut anda akan mendapatkan opsi untuk mengubah salah satu parameter dari cropping image yang berasal dari appwrite SDK seperti width, height, dan lain sebagainya.

```js
import React, { useState } from 'react';
import {PreviewImage} from "./PreviewImage"
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";
function PreviewAndCrop(props) {
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [quality,setQuality]=useState(0)
  const [background,setBackground]=useState(null)
  const [output,setOutput]=useState(null)
  
 return (
   <div>
<h1>Preview and Crop Image</h1>
<Grid  container
  direction="column"
  spacing={5}>
<Grid item>
width :  <Input
style={{marginRight:10}}
          value={width}
          margin="dense"
          onChange={(e)=>setWidth(e.target.value===''?'':Number(e.target.value))}
          onBlur={()=>{
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
        /> possible values 0 - 4000
</Grid>
<Grid item>
height :  <Input
style={{marginRight:10}}
          value={height}
          margin="dense"
          onChange={(e)=>setHeight(e.target.value===''?'':Number(e.target.value))}
          onBlur={()=>{
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
        /> possible values 0 - 4000
</Grid>
<Grid item>
quality :  <Input
style={{marginRight:10}}
          value={quality}
          margin="dense"
          onChange={(e)=>setQuality(e.target.value===''?'':Number(e.target.value))}
          onBlur={()=>{
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
        /> possible values 0 - 100
</Grid>
<Grid item>
background : <input style={{marginRight:10}} type="color" onChange={(e)=>setBackground(e.target.value.replace("#",""))}/>
 only works for png with transparent background
</Grid>
<Grid item >
output : <select onChange={(e)=>setOutput(e.target.value)}>
  <option value="jpeg">jpeg</option>
  <option value="jpg">jpg</option>
  <option value="png">png</option>
  <option value="gif">gif</option>
  <option value="webp">webp</option>
</select>
</Grid>
</Grid>
<Grid item style={{marginTop:15}}>
<PreviewImage appwrite={props.appwrite} width={width} height={height} quality={quality} background={background} output={output} id={props.imageId} />
</Grid>

   </div>
  
 )
  
};

export { PreviewAndCrop };
```
contoh penggunaan

```js
<PreviewAndCrop imageId={imageId} appwrite={appwrite} />
```

ada dua props disini:

- ```imageId``` untuk mendapatkan imageId dari komponen ```ListImages``` dan memperlihatkan  hasil dari cropping kita di komponen ```PreviewImage```
- ```appwrite``` untuk konek ke server appwrite

## Langkah 7 - Mengkombinasikan semua komponen dalam app.js

Agar aplikasi kita berjalan dengan lancar kita harus mengkombinasikannya dalam satu file yaitu ```App.js``` dengan begitu kita bisa menggunakan aplikasi kita sesuai yang kita mau.

```js
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
          <ListImage appwrite={appwrite} changeImage={(id) => setImageId(id)} />
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
```
jadi kode diatas adalah aplikasi final kita ada kode yang harus dijelaskan contohnya adalah sebagai berikut

di dalam kode diatas ada 4 state:

- ```appwrite``` untuk mengkoneksikan aplikasi React kita ke server appwrite kita membuat file ```utils.js``` sebelumnya, hal itu digunakan untuk memanggil fungsi yang ada di server menggunakan SDK
- ```userProfile``` state untuk menyimpan apakah kita sudah login atau tidak
- ```currentPage``` untuk mengganti state dari login ke sign up dan sebaliknya
- ```imageId``` untuk memilih file gambar yang ingin kita crop dari komponen ```ListImages``` lalu mengcropnya menggunakan komponen ```PreviewAndCrop``` 

ada dua fungsi dalam ```App.js```

- ```getUserData``` untuk mengecek apakah kita sudah login
- ```logout``` untuk keluar dan kembali ke login


## Apa Selanjutnya?

Selamat! Anda sudah berhasil membuat aplikasi cropping sederhana! 🥳🥳🥳

Jika anda lihat aplikasi cropping ini digunakan hampir sama seperti saat kita menggunakan CDN jadi kita bisa memperbesar memperkecil image kita dan juga mengubahnya ke format lain seperti webp.

Semoga beruntung! Jika ada pertanyaan silahkan bergabung ke [Discord](https://discord.gg/ZFwqr3S) atau lihat [Appwrite Documentation](https://appwrite.io/docs). TIP: [Preview Image API](https://appwrite.io/docs/client/storage?sdk=web#getFilePreview)

(jika anda ingin mencheckout kode ini silahkan ke [repository](https://github.com/appwrite/demos-for-react/tree/master/example-cropping)!)
