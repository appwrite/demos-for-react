import { Client, Storage, Account, Permission, Role } from 'appwrite';
import { Server } from '../utils/config';

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let client = new Client();
    client.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(client);
    const storage = new Storage(client);

    api.sdk = { storage, account };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  getSession(id) {
    return api.provider().account.getSession(id);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },

  createFile: (bucketId, file) => {
    return api
      .provider()
      .storage.createFile(bucketId, 'unique()', file);
  },

  listFiles: (bucketId) => {
    return api.provider().storage.listFiles(bucketId);
  },

  getFilePreview: (bucketId, fileId, width) => {
    return api.provider().storage.getFilePreview(bucketId, fileId, width);
  },

  getFileView: (bucketId, fileId) => {
    return api.provider().storage.getFileView(bucketId, fileId);
  },

  makeFilePublic: async (bucketId, fileId, ownerId) => {
    return api.provider().storage.updateFile(bucketId, fileId, [
        Permission.read(Role.user(ownerId)),
        Permission.update(Role.user(ownerId)),
        Permission.delete(Role.user(ownerId)),
        Permission.read(Role.users())
    ]);
  },

  makeFilePrivate: async (bucketId, fileId, ownerId) => {
    return api.provider().storage.updateFile(bucketId, fileId, [
      Permission.read(Role.user(ownerId)),
      Permission.update(Role.user(ownerId)),
      Permission.delete(Role.user(ownerId))
    ]);
  },

  deleteFile: (bucketId, fileId) => {
    return api.provider().storage.deleteFile(bucketId, fileId);
  }
};

export default api;
