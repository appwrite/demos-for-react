import api from "../api/api";
import { Server } from "../utils/config";
import { useEffect, useReducer } from "react";

export const FetchState = {
  FETCH_INIT: 0,
  FETCH_SUCCESS: 1,
  FETCH_FAILURE: 2,
};

export const useGetFiles = (stale) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          files: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    files: [],
  });

  useEffect(() => {
    let didCancel = false;
    const getFiles = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await api.listFiles(Server.bucketID);
        for (const file of data.files) {
          file.public = (file["$permissions"].includes("read(\"users\")"));
        }
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: data.files });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getFiles();
    return () => (didCancel = true);
  }, [stale]);

  return [state];
};

export const useGetUser = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          user: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    user: null
  });

  useEffect(() => {
    let didCancel = false;
    const getFiles = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const account = await api.getAccount();
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: account });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getFiles();
    return () => (didCancel = true);
  }, []);

  return [state, dispatch];
};
