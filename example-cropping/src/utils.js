import 'appwrite'; // Import the appwrite library
const appwrite = new window.Appwrite(); // The reason we use window.Appwrite() is for compatability with <script> imported appwrite.
function appWrite({endpoint,projectId}){
    let ep=endpoint || 'http://localhost/v1';
    let pi=projectId || 'ProjectID';
return appwrite
  .setEndpoint(ep) // We set the endpoint, change this if your using another endpoint URL.
  .setProject(pi) // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.
  
}


export { appWrite }; // Finally export the appwrite object to be used in projects.
