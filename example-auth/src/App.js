import React from 'react';
import { appwrite } from './utils';
import './App.css';

import { Login } from './components/Login';
import { Profile } from './components/Profile';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { // Create the variables we will use later.
      userprofile: false,
      error: false,
      currentPage: false,
    };
  };

  // Get userdata function.
  async getUserdata () {
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
  async login (email, password) {
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

  async register(email, password){
    try {
      // Set error to false so if we are successful the error doesn't perist making bad UX Design.
      // also set the loading prop to true to signal to the user we are processing his request.
      await this.setState({ error: false })

      // Create the account, if this fails it will error and be caught by the catch(err).
      await appwrite.account.create(
        email,
        password
      );

      await this.setState({ error: 'Register Successful'});
    }  catch (err) {
      await this.setState({ error: 'Invalid Credentials' }) // If registration fails then show user the registration was not successful.
      console.error(err) // also console error for debugging purposes.
    }
  }

  // Logout the user function.
  async logout () {
    await this.setState({ userprofile: false }); // Remove the local copy of the userprofile causing the app to see that the user is not logged in.
    appwrite.account.deleteSession('current'); // Tell appwrite server to remove current session and complete the logout.
  }

  componentDidMount () {
    this.getUserdata(); // On page load check if we are already logged in.
  }

  render () {
    return (
      <div>
        <div className='loginCore'>
          {!this.state.userprofile && (
            <div className='loginPage'>
              <Login currentPage={this.state.currentPage} registerFunc={(email, password) => this.register(email, password)} loginFunc={(email, password) => this.login(email, password)} error={() => this.state.error} />
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
};

export default App;
