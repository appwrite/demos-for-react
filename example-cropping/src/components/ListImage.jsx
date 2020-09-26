import React from 'react';

class ListImage extends React.Component {
  constructor (props) {
    super(props);
  this.state={listImages:[]}
  };
getListImages(){
    this.state.listImages=this.props.listAllImages()
}
 

  render () {
    
    return (
      <div>
        <h1>List Image</h1>
        <button>refresh list</button>
      </div>
    )
  }
};

export { ListImage };