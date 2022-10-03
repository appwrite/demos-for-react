import { Client, Locale } from "appwrite"; //Import appwrite 

const client = new Client();
const locale = new Locale(client);
client
  .setEndpoint("http://localhost:8000/v1") // Your API Endpoint
  .setProject("632354c21d497895d2dd") // Your project ID

let response = locale.get();

export {response};
