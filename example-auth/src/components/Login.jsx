import React from 'react';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '', password: '', loading: false
    };
  };

  async processSubmit(event){
    event.preventDefault() // Prevent default to prevent reloading of page.

    if(!this.props.currentPage){
      await this.processLogin(event);
    } else {
      await this.processRegister(event);
    }
  }

  async processLogin (event) {
    if (this.state.loading) return; // If loading then return.

    await this.setState({ error: false, loading: true }); // Start new request by removing any previous errors and setting loading to true

    // Validation
    if (!(this.state.password.length >= 6 && this.state.password.length <= 32)) {
      // If validation incorrect then set error and then set loading to false
      this.setState({ error: 'Error: Password must be between 6 and 32 characters.', loading: false });
      return;
    }

    await this.props.loginFunc(this.state.email, this.state.password); // Request login

    // If success then set loading to false
    await this.setState({ loading: false });
  }

  async processRegister(event){
    if (this.state.loading) return; // If loading then return.

    await this.setState({ error: false, loading: true }); // Start new request by removing any previous errors and setting loading to true

    // Validation
    if (!(this.state.password.length >= 6 && this.state.password.length <= 32)) {
      // If validation incorrect then set error and then set loading to false
      this.setState({ error: 'Error: Password must be between 6 and 32 characters.', loading: false });
      return;
    }

    await this.props.registerFunc(this.state.email, this.state.password); // Request Register

    // If success then set loading to false
    await this.setState({ loading: false });
  }

  render () {
    const error = this.state.error || this.props.error()
    return (
      <div>
        {!this.props.currentPage ? (<h1>Login</h1>) : (<h1>Register</h1>)}
        {error && (
          <p className='error'>{error}</p>
        )}
        <form onSubmit={(e) => this.processSubmit(e)}>
          <input onChange={(event) => this.setState({ email: event.target.value })} type='email' id='email' required placeholder='Email' />
          <input onChange={(event) => this.setState({ password: event.target.value })} type='password' id='password' required placeholder='Password' />
          {!this.props.currentPage ? (<button disabled={this.state.loading} type='submit'>Sign In</button>) : <button disabled={this.state.loading} type='submit'>Register</button>}
        </form>
      </div>
    )
  }
};

export { Login };
