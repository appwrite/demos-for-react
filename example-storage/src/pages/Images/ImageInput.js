import api from "../../api/api";
import {useRef, useState} from "react";
import {Server} from "../../utils/config";

const ImageInput = ({ setStale }) => {
  const fileInput = useRef(null);
  const [currentFiles, setCurrentFiles] = useState(null);
  const [dataUri, setDataUri] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const onClickSelect = (e) => {
    e.preventDefault();
    fileInput.current.click();
  }

  const onClickUpload = async (e) => {
    e.preventDefault();
    console.log("Adding file");
    try {
      const file = currentFiles[0];
      setFeedbackMessage(`Uploading ${currentFiles[0]["name"]}`);
      setCurrentFiles(null);
      setDataUri(null);
      setStale({ stale: true });
      await api.createFile(Server.bucketID, file);
      setFeedbackMessage("");
      setStale({ stale: true });
    } catch (e) {
      console.log("Error in adding image", e);
    }
  };

  const onClickCancel = async (e) => {
    e.preventDefault();
    console.log("Canceling");
    setStale({ stale: true });
    setCurrentFiles(null);
    setDataUri(null);
  };

  const onChangeFile = (e) => {
    setCurrentFiles(e.target.files);
    buildDataUri(e.target.files[0]);
  }

  const buildDataUri = (file) => {
    let reader = new FileReader();
    reader.onload = function(ev){
      setDataUri(ev.target.result.toString());
    };
    reader.readAsDataURL(file);
  }

  const buildImgTag = () => {
    if (dataUri) {
      return (<img className="mx-auto w-24 px-1 py-4" src={dataUri} alt="Preview"/>);
    }
    return null;
  }

  const getFeedbackElement = () => {
    if (feedbackMessage) {
      return (<div className="text-sm"><br/>{feedbackMessage}<br/></div>);
    }
    return null;
  }

  const buttonClass = "px-4 py-1 mx-2 text-sm font-semibold hover:bg-gray-200 focus:ring focus:ring-gray-400 active:bg-gray-400 " +
      "transition duration-150 ease-in-out rounded-full border";

  return (
      <form className="flex space-x-6">
        <div className="w-full my-8 px-6 py-4 text-xl rounded-lg border-0 focus:ring-2 focus:ring-gray-800
                        transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110
                        hover:shadow-xl shadow-md">
          <input type="file" accept="image/*" className="hidden"
                 ref={fileInput} onChange={onChangeFile}/>
          {
            currentFiles ? <></> :
              <button className={buttonClass} onClick={onClickSelect}>Select Image for Upload</button>
          }
          {getFeedbackElement()}
          {buildImgTag()}
          {
            currentFiles ?
              <div>
                <button className={buttonClass} onClick={onClickUpload}>Upload</button>
                <button className={buttonClass} onClick={onClickCancel}>Cancel</button>
              </div> : <></>
          }
        </div>
      </form>
  );
};

export default ImageInput;