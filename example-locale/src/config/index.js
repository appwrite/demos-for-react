const Appwrite = require("appwrite"); //Import appwrite 

let sdk  = new Appwrite();
sdk
  .setEndpoint("http://localhost:443/v1") // Your API Endpoint
  .setProject("[PROJECT ID]") // Your project ID

let response = sdk.locale.get();

export {response};
