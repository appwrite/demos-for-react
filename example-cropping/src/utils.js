import 'appwrite';
const appwrite = new window.Appwrite();
function appWrite({ endpoint, projectId }) {
  let ep = endpoint || 'http://localhost/v1';
  let pi = projectId || 'ProjectID';
  return appwrite
    .setEndpoint(ep)
    .setProject(pi)

}


export { appWrite };
