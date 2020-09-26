import React,{useState} from 'react';


function ListImage(props){
  const [listImages,setListImages]=useState([])
    return (
      <div>
        <h1>List Image</h1>
        <button>refresh list</button>
        {listImages}
      </div>
    )
  
};

export { ListImage };