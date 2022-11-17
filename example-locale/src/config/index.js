const {Client, Locale} = require("appwrite"); //Import appwrite 

let client  = new Client();
client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("demos-for-react") // Your project ID

const locale = new Locale(client);
let response = locale.get();

export {response};
