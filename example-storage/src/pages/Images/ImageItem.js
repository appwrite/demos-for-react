import api from "../../api/api";
import { Server } from "../../utils/config";
import {deleteButton, lockedButton, unlockedButton} from "../icons";
import { PopupboxManager } from 'react-popupbox';

const ImageItem = ({ item, ownerId, userId, setStale }) => {
  const handleDelete = async () => {
    console.log(`Deleting image ${item["name"]}`);
    try {
      await api.deleteFile(Server.bucketID, item["$id"]);
      setStale({ stale: true });
    } catch (e) {
      console.log(`Error in deleting image ${item["name"]}`);
    }
  };

  const makeFilePublic = async () => {
    console.log(`Making image ${item["name"]} public`);
    try {
      await api.makeFilePublic(Server.bucketID, item["$id"], ownerId);
      item["public"] = false;
      setStale({ stale: true });
    } catch (e) {
      console.log(`Error in making image ${item["name"]} public`, e);
    }
  };

  const makeFilePrivate = async () => {
    console.log(`Making image ${item["name"]} private`);
    try {
      await api.makeFilePrivate(Server.bucketID, item["$id"], ownerId);
      item["private"] = false;
      setStale({ stale: true });
    } catch (e) {
      console.log(`Error in making image ${item["name"]} private`, e);
    }
  };

  const getControls = () => {
    const buttonClasses = "focus:outline-none transition duration-75 ease-in-out transform hover:scale-125";

    if (userId === ownerId) {
      return (
        <div>
          <button
              onClick={_ => handleDelete()}
              className={buttonClasses}
          >
            {deleteButton}
          </button>
          <br/>
          {item.public ?
              <button
                  onClick={_ => makeFilePrivate()}
                  className={buttonClasses}
              >
                {lockedButton}
              </button> :
              <button
                  onClick={_ => makeFilePublic()}
                  className={buttonClasses}
              >
                {unlockedButton}
              </button>
          }
        </div>
      );
    }
  }

  const openPopupbox = () => {
    const style = {
      maxWidth: (window.innerWidth - 80) + "px",
      maxHeight: (window.innerHeight - 80) + "px"
    }
    const content = (
        <img src={api.getFileView(Server.bucketID, item['$id']).toString()}
             alt={item['name']}
             style={style}
             className="mx-auto"
        />
    )
    PopupboxManager.open({
      content,
      config: {
        overlayClose: true,
        fadeIn: true,
        fadeInSpeed: 500
      }
    });
  }

  return (
      <div className="flex items-center mt-4 px-4">
        <img
            src={api.getFilePreview(Server.bucketID, item['$id'], 100).toString()}
            title={item["name"]}
            alt={item["name"]}
            onClick={openPopupbox}
            className="px-1 py-1"
        />
        {getControls()}
      </div>
  );
};

export default ImageItem;
