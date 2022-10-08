import { Client } from 'appwrite';

const client = new Client();

const bucketID = '633ba835e370fde52ce7';  // your bucket ID
const endpoint = 'http://localhost/v1';  // Your End point
const projectId = 'ProjectID'; //Your bucked ID

client.setEndpoint(endpoint).setProject(projectId);

export { bucketID, client };
