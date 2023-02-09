# Appwrite + ReactJS =❤️

This example is to showcase [Appwrite's Locale API](https://appwrite.io/docs/client/locale) with [React](https://reactjs.org/) by creating a simple web-app that displays your IP, Country,Continent,CountryCode,Continent and Currency.

## Prerequisites

- A Recent Version of NodeJS
- NPM (Feel free to use Yarn if you want to, just switch out the NPM Commands for their YARN counterparts)
- [A locally running appwrite instance](https://appwrite.io/docs/installation).

## Getting Started

To get started quickly we will use [Create React App](https://github.com/facebook/create-react-app) to create the boilerplate that our code will be built on.

```shell
npx create-react-app appwrite-react
cd appwrite-react
```

While we are in the CLI we will also install Appwrite by running:

```shell
npm install appwrite
```

and finally we will launch the React development server with:

```shell
npm start
```

This should launch a server on `localhost:3000` with Live Reload.

## Introducing the Appwrite

With the boilerplate now complete, we can now initialise Appwrite in the project before working on the details page. To keep things clean we will initialise this in it's own file, we will create a folder in `src/` and call it `config` and within this folder we will create the file `index.js`. Within this file go ahead and paste the following code:

```js
import { Client, Locale } from "appwrite"; //Import appwrite 

const client = new Client();
const locale = new Locale(client);
client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("632354c21d497895d2dd") // Your project ID

let response = locale.get();

export {response};

```

A deeper inspection of this code can be found in the comments within it,

TL:DR: Create a appwrite instance and initalise it with the endpoint and ProjectID of the project we are working with then export this for usage outside of the file.

## Creating App.js

Inside our `src/App.js` we'll be importing our two components `components/Header.js` and `components/YourInfo.js`. Header.js is just our logo and heading, where as YourInfo.js accepts the reponse of the Locale-API and displays it in the DOM.

Make a components folder in the src folder and inside it add two files, Header.js and YourInfo.js.
For now paste the following code in the `src/App.js`.

```js
import React, {Fragment} from "react";
import "./App.css";
import YourInfo from "./components/YourInfo";
import Header from "./components/Header";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Header />
        <YourInfo />
      </div>
    </Fragment>
  );
}

export default App;
```

Inside our App.js we have just imported our two components. Now it's time to create YourInfo.js

## Creating YourInfo.js

This file recieves all the json data from the Locale API. We first import the response which is basically `sdk.get();` from our index.js file. Then we use a promise to fetch the json data.

We are using functional component in this file and we'll set our state inside this promise only.

Now we'll use destructuring and extract different data such as IP and Country from our state. And then finally display it in the DOM.
Paste the following code in the `src/components/YourInfo.js`.

```js
import React, {useState, useEffect} from "react";
import {response} from "../config/index";
const YourInfo = () => {
  const [info, setInfo] = useState({});
  const [weather, setWeather] = useState({});

  // Promise to get the location details from the Locale API.
  response.then(
    function (res) {
      setInfo(res);
    },
    function (error) {
      console.error(error.message);
    }
  );
  const {ip} = info; //Extracting IP from JSON
  const {countryCode} = info; //Extracting countryCode from JSON
  const {country} = info; //Extracting country from JSON
  const {continent} = info; //Extracting continent from JSON
  const {currency} = info; //Extracting currency from JSON
  //Displaying Info
  return (
    <div className="info">
      <h1>Here are you Location Details!</h1>
      <p>
        <strong>Your IP Address</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ip}
      </p>
      <p>
        <strong>Your Country</strong>: &nbsp;&nbsp;&nbsp;{country}
      </p>
      <p>
        <strong>Your Country Code</strong>: &nbsp;&nbsp;&nbsp;{countryCode}
      </p>
      <p>
        <strong>Your Continent</strong>: &nbsp;&nbsp;&nbsp;{continent}
      </p>
      <p>
        <strong>Your Currency</strong>: &nbsp;&nbsp;&nbsp;{currency}
      </p>
    </div>
  );
};
export default YourInfo;
```

Now we are almost complete with our app. Let's add a header to the project. Add the following code in the `src/components/Header.js` file.

```js
import React from "react";

export const Header = () => {
  return (
    <div>
      <p className="header">
        app<strong>write</strong> Locale API Demo
      </p>
    </div>
  );
};
export default Header;
```

Our simple web-app that displays the IP and geographic details is almost ready, all that's left to do is add some styling.😎
We have already given the respective classNames in the above file. So let's quickly add some styles. Paste the following code in the `App.css` file.

```css
.App {
  text-align: center;
  font-family: "Poppins", sans-serif;
}
.header {
  font-size: 2rem;
  color: #f35884;
}

.info {
  text-align: center;
  margin-left: 35%;
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #f35884;
}
.info h1 {
  padding-top: 50px;
}
```

Congratulations!!! We just used Locale API to get the client's IP and other details!! Woo-hoo! 🥳🥳🥳
Now you can use these details that you've just got from the Appwrite's Locale API in your own project and personalize every user's experience.

Good Luck! If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs).
