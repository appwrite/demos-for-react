const {Client, Locale} = require("appwrite"); //Import appwrite 

let client  = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID) // Your project ID

const locale = new Locale(client);
let response = locale.get();

export {response};
