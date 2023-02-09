import { Account,Databases,ID } from "appwrite";
import { client,collectionID,databaseID } from "../config";

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
      ID.unique(),
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
