import {Client} from "appwrite"  // Import the appwrite library

const client = new Client();
 
client
  .setEndpoint('http://localhost:8000/v1') // We set the endpoint, change this if your using another endpoint URL.
  .setProject('632354c21d497895d2dd'); // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

export { client}; // Finally export the appwrite object to be used in projects.
