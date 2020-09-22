# Appwrite + ReactJS =❤️
This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [React](https://reactjs.org/) by creating a simple login/register page.

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
import 'appwrite'; // Import the appwrite library
const appwrite = new window.Appwrite(); // The reason we use window.Appwrite() is for compatability with <script> imported appwrite.
appwrite
  .setEndpoint('http://localhost/v1') // We set the endpoint, change this if your using another endpoint URL.
  .setProject('ProjectID'); // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

export default { appwrite }; // Finally export the appwrite object to be used in projects.
```
A deeper inspection of this code can be found in the comments within it, 

TL:DR: Create a appwrite SDK Instance and initalise it with the endpoint and ProjectID of the project we are working with then export this for usage outside of the file.

## Creating the App.js
We are now going to replace the `src/App.js` with our own, doing so we will turn the object from a function react component to a class based one aswell as adding a bunch of logic to the app which will be used later by components.

```js
import React from 'react';
import { appwrite } from './utils';
import './App.css';

import { Login } from './components/Login';
import { Profile } from './components/Profile';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { // Create the variables we will use later.
            userprofile: false,
            error: false
        };
    };

    // Get userdata function.
    async getUserdata() {
        try {
            const response = await appwrite.account.get(); // Request to appwrite server to see if we are logged in.
            this.setState({ userprofile: response }); // If Logged in then set the returned profile to the userprofile variable in state.
        } catch (err) { // If we are not logged in or another error occoured then catch(err)
            if (err.toString() === 'Error: Unauthorized') return; // If not logged in then do nothing.
            this.setState({ error: err.toString() }); // If it's another error then set the error variable in state.
            console.error(err); // and also console.error the error for clearer debugging.
        }
    }

    // Login function
    async login(email, password) {
        try {
            // Set error to false so if we are successful the error doesn't perist making bad UX Design.
            // also set the loading prop to true to signal to the user we are processing his request.
            await this.setState({ error: false })

            // Create the session, if this fails it will error and be caught by the catch(err).
            await appwrite.account.createSession(
                email,
                password
            );
            // If all is successful then get the userdata.
            this.getUserdata();
        } catch (err) {
            await this.setState({ error: 'Invalid Credentials' }) // If login fails then show user the login was not successful.
            console.error(err) // also console error for debugging purposes.
        }
    }

    // Logout the user function.
    async logout() {
        await this.setState({ userprofile: false }); // Remove the local copy of the userprofile causing the app to see that the user is not logged in.
        appwrite.account.deleteSession('current'); // Tell appwrite server to remove current session and complete the logout.
    }

    componentDidMount() {
        this.getUserdata(); // On page load check if we are already logged in.
    }

    render() {
        return (
	  <div>
            Hello World!
          </div>
        )
    }
};

export default App;
```
Now this is alot to take in we will attempt to break this down and explain what all this code does.

First we create a new class based off React.Component which allows us to create our custom App component we also go ahead and import the earlier created appwrite object from `utils.js`.

in `constructor(props)` we use `super(props)` to call the parents constructor, in this tutorial you do not have to know exactly what `super()` is used for, all you need to know is that it allows us to use `this`. 

Next we will create `this.state` in react this is how we store data in components and rerender when things get changed with `this.setState()`

We now create a couple functions which allow us to interact with the appwrite instance using the SDK, I'll explain them now.

### `getUserdata()` 
1. The function will contact the appwrite instance and check if we are logged in.
2. If we are logged in then we will set the `userprofile` variable in state to tell the rest of the app that we are logged in.
3. If we are not logged in then it will simply return,
First we function we create will check if we are logged in and if so sets the `userprofile` variable in state to it Iit will also null all the input variables as a security precaution). If we are not logged in it will simply return. If another error is encountered it will set the error variable in state to show the user the error and log the error in console.

### `login()`

1. Check that a previous request is not being processed by checking the loading variable in state. If it is then a new request isn't started.
2. Sets the error variable in state to false and the loading variable to true to prevent new request from being created during this request.
3. Then the funciton will attempt to create a new session with the credentials provided by the user. If this is successful then `getUserdata()` is called and it will get the profile and tell the rest of the app that the user is logged in.
4. If the login function fails then it will throw a `Invalid Credentials` error and let the user know that their credentials we're invalid.

### logout()
Thankfully this function is pretty simple. It will set the `userprofile` state variable to false then tell appwrite to invalidate the session it was holding to complete the logout.

With that all appwrite related functions are finished and we can continue to the components.

## Creating the login and profile components
At the moment we have all the logic to create our login page but we don't yet have the actual forms at the moment it just says `Hello World!` and you can't login with that! So now we will create two new components. First we will create the login one.

### Creating the Login Component
Go ahead and create a folder as `src/components/` this is where we will store the components we will be creating. Now in `src/components/` create a new file called `Login.jsx`(The .jsx is not a typo, it's a extension type for JSX Files used in React. [See more here](https://reactjs.org/docs/introducing-jsx.html))

```JSX
import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
    };

    async processLogin(event) {
        event.preventDefault() // Prevent default to prevent reloading of page.

        if (this.state.loading) return; // If loading then return.

        await this.setState({
            error: false,
            loading: true
        }); // Start new request by removing any previous errors and setting loading to true

        // Validation
        if (!(this.state.password.length >= 6 && this.state.password.length <= 32)) {
            // If validation incorrect then set error and then set loading to false
            this.setState({
                error: 'Error: Password must be between 6 and 32 characters.',
                loading: false
            });
            return;
        }

        await this.props.loginFunc(this.state.email, this.state.password); // Request login

        // If success then set loading to false
        await this.setState({
            loading: false
        });
    }

    render() {
        const error = this.state.error || this.props.error()
        return (
            <div>
        <h1>Login</h1>
        {error && (
          <p className='error'>{error}</p>
        )}
        <form onSubmit={(e) => this.processLogin(e)}>
          <input onChange={(event) => this.setState({ email: event.target.value })} type='email' id='email' required placeholder='Email' />
          <input onChange={(event) => this.setState({ password: event.target.value })} type='password' id='password' required placeholder='Password' />
          <button disabled={this.state.loading} type='submit'>Sign In</button>
        </form>
      </div>
        )
    }
};

export {
    Login
};
```
Now, lets explain this code. First we do create a new class from based off React.Component like last time and create a constructor with `super(props)` and a `this.state` with the variables we will use.

Now we create a function called `processLogin(event)` all this does is:
1. Calls event.preventDefault() to prevent a page refresh
2. Set's error and loading to false in state
3. Performs validation and if anything fails sets the Error variable in state then returns
4. Runs `this.props.loginFunc`. Now this is different `this.props` is actually a way of us passing data and functions from parents to the children component, and here we pass a prop called `loginFunc` which will run the `login()` function from `src/App.js`. We'll explain this more when we start patching things together in App.js
5. Once everything is done set loading to false in state and if everything is successful then `src/App.js` will switch the component being rendered to the Profile component that we will create next.

Now, the render function uses JSX and all the render function does is create a form with some styling and has `onSubmit` to trigger the `processLogin()` function aswell as `onChange` to change the variables in state whenever the input changes, We also will disable the Sign In button if `this.state.loading` is to show the user that the request is being processed.

### Creating the Profile Component
Next we will create a new component for the Profile render, make a new file in the `src/components` directory and call it `Profile.jsx` then copy the following code:
```JSX
import React from 'react';

class Profile extends React.Component {
    render() {
        return (
            <div>
	        <h2>Logged In!</h2>
	        <h1>{this.props.userprofile.name}</h1>
	        <p>{this.props.userprofile.email}</p>
	        <p>ID: {this.props.userprofile.$id}</p>
	        <button onClick={() => this.props.logout()}>Logout</button>
	    </div>
        )
    }
};

export { Profile };
```
Notice how this code is significantly simpler than the others and that it doesn't have a `constructor()` this is because we don't need to add a state as we are not processing data with this component. All it does it render the data sent from the `userprofile` prop and offers a button that will call `this.props.logout()` when clicked.

With that all our custom components are finished!

## Combining it all together
With all the components finished all we need to do now is add them into our main `App.js` and create the JSX to render it.

First we want to import our shiny new components, in `src/App.js` go ahead and place the following under `import { appwrite } from './utils` near the top:
```JS
import  './App.css';

import { Login } from './components/Login';
import { Profile } from './components/Profile';
```
This will import the components we need aswell as add the styling from `app.css` that we removed earlier.

Next we change the `render()` function to render some JSX that will render our custom components.
Go ahead and find:
```js
render() {
  return (
    <div>
      Hello World!
    </div>
  )
}
```
and replace it with:
```js
render() {
    return (
        <div>
        <div className='loginCore'>
          {!this.state.userprofile && (
            <div className='loginPage'>
              <Login loginFunc={(email, password) => this.login(email, password)} error={() => this.state.error} />
              <div className='loginSwitchContainer'>
                <p>{this.state.currentPage ? 'Got an account?' : "Haven't got an account?"}</p>
                <span onClick={() => this.setState({ currentPage: !this.state.currentPage })}>{this.state.currentPage ? 'Login' : 'Sign Up'}</span>
              </div>
            </div>
          )}
          {this.state.userprofile && (
            <div className='loginPage'>
              <Profile userprofile={this.state.userprofile} logout={() => this.logout()} />
            </div>
          )}
        </div>
      </div>
    )
}
```
Now finally we will explain this JSX, `{!this.state.userprofile && (<div></div>)}` might get you scratching your head, but this is actually one of the features of JSX. It allows us to create if statements within our HTML so for instance this statement is essentially saying if not `this.state.userprofile` then render everything within the circle brackets and we also use brackets to use JS variables within text and to add the functions the components need as props.

## Adding some style 😎
Now, this is all cool but it doesn't look good. You could either style it yourself if your up for the challenge or edit `src/App.css` to add the following CSS I have created:
```css
html {
  background: linear-gradient(90deg, rgba(209, 0, 176, 1) 0%, rgba(0, 249, 255, 1) 100%);
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

html,
body,
#root {
  width: 100%;
  height: 100%;
}

input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  -webkit-padding: 0.4em 0;
  padding: 0.4em;
  margin: 0 0 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.loginPage input {
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
}

.loginCore {
  position: absolute;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
}

.loginCore span {
  color: rgb(0, 162, 255);
}

.loginCore span:hover {
  cursor: pointer;
}

.loginPage input {
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
}

.loggedIn {
  padding-top: 30px;
  padding-bottom: 30px;
}

.loggedIn h1 {
  margin: 0;
}

.loggedIn h2 {
  margin: 0;
}

.loggedIn p {
  margin: 10px;
}

.error {
  color: red;
}

.loginSwitchContainer {
  margin-top: 20px;
  margin-bottom: 20px;
}

.loginSwitchContainer p {
  margin: 0;
  margin-bottom: 5px;
}
```
This should leave you with a nice form and style with your brand new login app!

## What next?

Congratulations! You've just created a login page using React and Appwrite! 🥳🥳🥳

If you noticed I left out the Register section for this tutorial and that was intentional. This is where I hand it off to you and allow you to use the techniques and ideas you used creating this project to add your own register page!

Good Luck! If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs). TIP: [Checkout account create documentation for the web API](https://appwrite.io/docs/client/account#create)

(If you want to checkout the finished code is over on the [repository](https://github.com/appwrite/demos-for-react/tree/master/example-auth) aswell as a mirror for this tutorial!)
