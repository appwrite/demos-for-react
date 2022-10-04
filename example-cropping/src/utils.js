import {Client} from "appwrite"

const client =new Client();

const bucketID="633ba835e370fde52ce7"

function appWrite({ endpoint, projectId }) {
  const ep = endpoint || 'http://localhost/v1';
  const pi = projectId || 'ProjectID';
  client.setEndpoint(ep).setProject(pi);
  return client
}

export {appWrite,bucketID}
