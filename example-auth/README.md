# Appwrite + ReactJS =❤️
This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [React](https://reactjs.org/) by creating a simple login/register page.

## Prerequisites

- A recent version of NodeJS
- Yarn (feel free to use NPM if you want to, just switch out the yarn commands for their NPM counterparts)
- [A locally running appwrite instance](https://appwrite.io/docs/installation).

## Getting Started
To get started quickly we will use [Vite](https://vitejs.dev/) to create the boilerplate that our code will be built on.

```shell
yarn create vite
cd appwrite-react
```
And then follow the creation process, in our case we're going to use the `react-typescript` template.

While we are in the CLI we will also install the Appwrite JS API by running:
```shell
yarn add appwrite
```
and finally we will launch the React development server with:
```shell
yarn dev
```
This should launch a server on `localhost:5173` with Live Reload.

## Introducing the Appwrite SDK
With the boilerplate now complete we can now initialise the Appwrite SDK in the project before working on the login page. To keep things clean we will initialise this in it's own file, we will create this file in `src/` and call it `appwrite.ts`. Within this file go ahead and paste the following code:

```ts
import { Client } from "appwrite"

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT);
```

In this codeblock we are using Vite's approach for environment variables. To do this, we're going to create a `.env` file at the root of our project and then populate it with the following information:

NOTE: You can find an example file in this repository as `.env.template`

```env
VITE_APPWRITE_URL=<YOUR_API_ENDPOINT>
VITE_APPWRITE_PROJECT=<YOUR_PROJECT_ID>
```

Now, you can export the initialized client or keep the Appwrite functions in this file.

## Creating the App.tsx
We are now going to replace the `src/App.tsx` with our own. For this example, we're going to use [react-router](https://reactrouter.com/en/main) to develop our SPA.

First of all, install `react-router`

```shell
yarn add react-router-dom@latest
```

Then, in our `main.tsx` file:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

Great! Now we have a functional router for our SPA.

Back to our `App.tsx` file...

```tsx
import { Routes, Route } from "react-router-dom"
import Layout from './components/layout'
import SignUp from './components/signup'
import LogIn from './components/login'
import Home from "./components/home"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
```

In this file we're going to just define the routes we want to use. We'll explain them later. But before that, let's write the functions that connect our site with Appwrite.

## Creating the server functions

From this point you can create a separate file or just stay in the `appwrite.ts` file we created before.

So, let's create our functions.

### getUserData

```ts
export const getUserData = async () => {
  try {
    const account = new Account(client)
    return account.get()
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}
```

This function will get the current user's preferences, but, if there's an error, will throw it as an `AppwriteException`.

### login

```ts
export const login = async (email: string, password: string) => {
  try {
    const account = new Account(client)
    return account.createEmailSession(email, password)
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}
```

This function will create a session from the email and password we pass to it, if they get a match in the database. If not, throws an `AppwriteException`.

### logout

```ts
export const logout = async () => {
  try {
    const account = new Account(client)
    return account.deleteSession('current')
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}
```

This function will logout the user deleting the current session, throwing an `AppwriteException` if there's an error.

### register

```ts
export const register = async (email: string, password: string) => {
  try {
    const account = new Account(client)
    return account.create('unique()', email, password)
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message)
  }
}
```

This function will create a new user from their email and password. Note the `'unique()'` parameter, as it's explained in Appwrite docs, if we aren't using a custom ID generating solution, using this key phrase will tell Appwrite to generate a random one.

And that's all!, you can tell that all of our functions are asynchronous, and that's because we don't want to block the main execution thread while asking the server something and freeze all the site.


## Creating the pages
Now we're ready to do some React stuff. Let's get there.

### Log in page

In our `src/components` folder, we create a new `login.tsx` file and write the following code:

```tsx
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../appwrite";

export default function LogIn() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert('Email is required.')
      return;
    }

    if (!password) {
      alert('Password is required.')
      return;
    }

    login(email, password)
      .then((account) => alert(`Successfully logged in from: ${account.osName}`))
      .finally(() => navigate('/'))
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>
    </form>
  )
}
```

Here, we create a basic HTML form that handles two values in React's state: `email` and `password`. Once the user clicks the submit button, if the credentials are correct, runs the `login()` function and redirects the user to the home page.

### Sign up page

In our `src/components` folder, we'll create `signup.tsx`, and write the following code.

```tsx
import { FormEvent, useState } from "react";
import { register } from "../appwrite";

export default function SignUp() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert('Email is required.')
      return;
    }

    if (!password) {
      alert('Password is required.')
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.')
      return;
    }

    register(email, password).then((account) => alert(`Successfully created account with ID: ${account.$id}`))
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign up</button>
    </form>
  )
}
```

As you can notice, it's pretty similar to our `login.tsx`. In fact, the only notorious changes are: a new conditional checking password length, and the function that we use, in this case `register()`.

If you want, you can create a custom form component to avoid repeating code.

### Home page

```tsx
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getUserData, logout } from "../appwrite";

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState<Models.Account<Models.Preferences>>()

  useEffect(() => {
    getUserData()
      .then((account) => setUser(account))
      .catch((error) => navigate('/login'))
  }, [])

  const handleLogOut = () => logout().then(() => navigate('/login'))

  if (!user) return <p>You aren't logged in.</p>

  return (
    <div>
      <p>Logged in as {user.email}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  )
}
```

Our home page is only accessible by authenticated users, as you can see in our `useEffect` hook, if we catch an error getting the current user's data, it will redirect the user to the login page. If the user is authenticated, then we show them their name (just as an example) and show them a log out button that closes their session.

### Layout

```tsx
import { Outlet, Link } from "react-router-dom"
import appwriteLogo from "../../public/appwrite.svg"
import Footer from "./footer"

export default function Layout() {
  return (
    <main>
      <nav>
        <ul className="navigation-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div className="appwrite-logo">
        <img src={appwriteLogo} alt="Appwrite's logo" />
      </div>

      <section className="content">
        <Outlet />
      </section>

      <Footer />
    </main >
  )
}
```

This is not really a page but a template of how our pages are displayed. We created a navigation bar with the links to our desired pages, added the Appwrite's logo, our `Outlet` component (where `react-router` will display the page's content) and a footer, with some information.

And that's it! You now have a functional SPA to authenticate your users and allow them to create their accounts.


## Adding some style
Now, this is all cool but it doesn't look good. You can use whatever CSS solution you want, like Tailwind, vanilla-extract, Stitches, Chakra, etc. For this example, I just used some of the Vite's defaults and added some classes:

```css
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #FFF;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  --dark-gray: #242424;
  --appwrite-primary: #f02e65
}

html {
  background-color: var(--dark-gray);
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
}

button {
  border-radius: 8px;
  color: #fff;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: var(--appwrite-primary);
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.navigation-bar {
  display: flex;
  position: fixed;
  top: 0;
  padding: 1em;
  width: 90vw;
  justify-content: space-around;
  list-style-type: none;
  background-color: var(--dark-gray);
}

a {
  color: var(--appwrite-primary);
  text-decoration: none;
  transition: filter .15s;
}

a:hover {
  filter: brightness(0.85);
}

.content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.appwrite-logo {
  width: 18em;
  margin: auto;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  justify-content: center;
  background-color: var(--dark-gray);
}

@media screen and (min-width: 768px) {
  footer {
    flex-direction: row;
    gap: 0.25em;
  }
}
```

But, remember, this is just an example! You can do it a lot better ;)

## What next?

Congratulations! You've just created a login page using React and Appwrite!

Good Luck! If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs). TIP: [Checkout account create documentation for the web API](https://appwrite.io/docs/client/account#create)

(If you want to checkout the finished code is over on the [repository](https://github.com/appwrite/demos-for-react/tree/master/example-auth) aswell as a mirror for this tutorial!)
