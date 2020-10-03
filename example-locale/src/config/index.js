const sdk = require("node-appwrite"); //Import appwrite node sdk

// Init SDK
let client = new sdk.Client();

let locale = new sdk.Locale(client);

client
  .setEndpoint("http://localhost:443/v1") // Your API Endpoint
  .setProject("[PROJECT ID]") // Your project ID
  .setKey("[SECRET API KEY]"); // Your secret API key

let response = locale.get();

export {response};
