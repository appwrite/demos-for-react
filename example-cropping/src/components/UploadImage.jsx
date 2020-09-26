import React from 'react';

class UploadImage extends React.Component {
  constructor (props) {
    super(props);
  this.state={loading:false,
file:null,
error:false};
  };

 processUpload=async ()=>{
console.log(this.state.file)
try{
let promise = await this.props.appwrite.storage.createFile(this.state.file, [], []);
console.log(promise)
}catch(e){
    console.log(e.message)
this.state.error=e.message
}



 }
onFileChange= e => {
this.state.file=e.target.files[0]
}
  render () {
    
    return (
      <div>
        <h1>Upload Image</h1>
    {this.state.error && <p>error</p>}
         <input type="file" onChange={this.onFileChange} /> 
          
          <button onClick={() => {this.processUpload()} } >Upload</button>
        
      </div>
    )
  }
};

export { UploadImage };