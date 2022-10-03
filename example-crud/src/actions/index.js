import { Account,Databases } from "appwrite";
import { client } from "../config";

const collectionID = "633ae0beae855eba99c9";
const databaseID="633ae03c9d2692732dbb"
const account = new Account(client);
const database = new Databases(client);

const getUserData = async () => {
  try {
    return account.get();
  } catch (e) {
    console.error(e.message);
  }
};

const login = async (email, password) => {
  try {
    return  account.createEmailSession(email, password);
  } catch (e) {
    console.error(e.message);
  }
};

const logout = async history => {
  try {
    await account.deleteSession("current");
    return history.push("/login");
  } catch (e) {
    console.error(e.message);
  }
};

const creatUserDocument = async userData => {
  try {
    return database.createDocument(
      databaseID,
      collectionID,
      "unique()",
      userData,
    );
  } catch (e) {
    console.error(e.message);
  }
};

const getUserDocuments = async () => {
  try {
    return database.listDocuments(databaseID,collectionID);
  } catch (e) {
    console.error(e.message);
  }
};

const updateUserDocument = async ({ documentID, name, email }) => {
  try {
    return database.updateDocument(
      databaseID,
      collectionID,
      documentID,
      { name, email },
    );
  } catch (e) {
    console.error(e.message);
  }
};

const deleteUserDocument = async documentID => {
  try {
    return database.deleteDocument(databaseID,collectionID, documentID);
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
