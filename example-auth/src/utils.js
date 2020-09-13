import 'appwrite'; // Import the appwrite library
const appwrite = new window.Appwrite(); // The reason we use window.Appwrite() is for compatability with <script> imported appwrite.
appwrite
  .setEndpoint('https://9680b3e.online-server.cloud/v1') // We set the endpoint, change this if your using another endpoint URL.
  .setProject('5f567e45491bb'); // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

export { appwrite }; // Finally export the appwrite object to be used in projects.
