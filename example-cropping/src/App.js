import React from 'react';
import { appWrite } from './utils';
import './App.css';

import { PreviewImage } from './components/PreviewImage';
import { ListImage } from './components/ListImage';
import { UploadImage } from './components/UploadImage';

class App extends React.Component {
  constructor (props) {
    super(props);
   this.state={
       appwrite:appWrite({endpoint:"http://ip172-18-0-24-btnfa4lim9m000btadmg-80.direct.labs.play-with-docker.com/v1"
       ,projectId:"5f6efcca14aa1"})
   }
  };



  render () {
    return (
      <div>
        <UploadImage appwrite={this.state.appwrite}/>
        <ListImage appwrite={this.state.appwrite}/>
        <PreviewImage appwrite={this.state.appwrite}/>
      </div>
    )
  }
};

export default App;