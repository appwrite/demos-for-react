import { appwrite } from "../config";

const collectionID = "5f69c0a24b1cb";

const getUserData = async () => {
  try {
    return appwrite.account.get();
  } catch (e) {
    console.error(e.message);
  }
};

const login = async (email, password) => {
  try {
    return appwrite.account.createSession(email, password);
  } catch (e) {
    console.error(e.message);
  }
};

const logout = async history => {
  try {
    await appwrite.account.deleteSession("current");
    return history.push("/login");
  } catch (e) {
    console.error(e.message);
  }
};

const creatUserDocument = async userData => {
  try {
    return appwrite.database.createDocument(
      collectionID,
      userData,
      ["*"],
      ["*"]
    );
  } catch (e) {
    console.error(e.message);
  }
};

const getUserDocuments = async () => {
  try {
    return appwrite.database.listDocuments(collectionID);
  } catch (e) {
    console.error(e.message);
  }
};

const updateUserDocument = async ({ documentID, name, email }) => {
  try {
    return appwrite.database.updateDocument(
      collectionID,
      documentID,
      { name, email },
      ["*"],
      ["*"]
    );
  } catch (e) {
    console.error(e.message);
  }
};

const deleteUserDocument = async documentID => {
  try {
    return appwrite.database.deleteDocument(collectionID, documentID);
  } catch (e) {
    console.error(e.message);
  }
};

export {
  getUserData,
  login,
  logout,
  creatUserDocument,
  getUserDocuments,
  updateUserDocument,
  deleteUserDocument
};
