import React from 'react';

class Profile extends React.Component {
  render () {
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