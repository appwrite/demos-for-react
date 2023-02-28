import { useState } from "react";
import api from "../../api/api";
import { FetchState, useGetFiles } from "../../hooks";
import Alert from "../Alert/Alert";
import ImageItem from "./ImageItem";
import ImageInput from "./ImageInput";
import {PopupboxContainer} from "react-popupbox";

const ImagePage = ({ user, dispatch }) => {
  const [stale, setStale] = useState({ stale: false });
  const [{ files, isLoading, isError }] = useGetFiles(stale);

  const handleLogout = async (_) => {
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.deleteCurrentSession();
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
    } catch (e) {
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  }

  const getFileOwnerId = (file) => {
    const updateRegEx = /update\("user:([0-9a-f]+)"\)/;
    for (const permission of file["$permissions"]) {
      const match = permission.match(updateRegEx);
      if (match) {
        return match[1];
      }
    }
    return null;
  }

  return (
    <>
      <section className="container h-screen max-h-screen px-3 max-w-xl mx-auto flex flex-col">
        {isError && <Alert color="red" message="Something went wrong..." />}
        <div className="my-auto p-16 rounded-lg text-center">
          <div className="font-bold text-2xl md:text-4xl lg:text-5xl">
            🖼️ <br /> Images With React
          </div>

          {isLoading && <h1> Loading .... </h1>}

          <PopupboxContainer />
          {files.length ? <>
            <div className="text-xl md:text-3xl lg:text-4xl mt-4">
              Public Images
            </div>
            <div className="grid grid-cols-3">
              {files.filter(item => item["public"]).map((item) => (
                <ImageItem key={item["$id"]} item={item} ownerId={getFileOwnerId(item)} userId={user["$id"]} setStale={setStale} />
              ))}
            </div>

            <div className="text-xl md:text-3xl lg:text-4xl mt-4">
              Your Private Images
            </div>
            <div className="grid grid-cols-3">
              {files.filter(item => !item["public"]).map((item) => (
                  <ImageItem key={item["$id"]} item={item} ownerId={getFileOwnerId(item)} userId={user["$id"]} setStale={setStale} />
              ))}
            </div>
          </> : <div className="text-xl py-3">Upload an image to get started!</div>}

          <ImageInput setStale={setStale} />

        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8">
        <button onClick={handleLogout} className="mx-auto mt-4 py-3 px-12 font-semibold text-md rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none">
          Logout 👋
        </button>
      </section>
    </>
  );
};

export default ImagePage;
