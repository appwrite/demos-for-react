const Appwrite = require("appwrite"); //Import appwrite 

let sdk  = new Appwrite();
sdk
  .setEndpoint("http://localhost:443/v1") // Your API Endpoint
  .setProject("[PROJECT ID]") // Your project ID
  .setKey("[SECRET API KEY]"); // Your secret API key

let response = sdk.locale.get();

export {response};
