import {Client} from "appwrite"

const collectionID = "633ae0beae855eba99c9";   // your collection ID
const databaseID="633ae03c9d2692732dbb"   // Your database ID
const client= new Client()
  .setEndpoint('http://localhost:80/v1') // We set the endpoint, change this if your using another endpoint URL.
  .setProject('6341c044078cb5fb6a72'); // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

export { client,collectionID,databaseID }; // Finally export the client to be used in projects.
