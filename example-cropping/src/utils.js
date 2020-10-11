import 'appwrite';

const appwrite = new window.Appwrite();
export default function appWrite({ endpoint, projectId }) {
  const ep = endpoint || 'http://localhost/v1';
  const pi = projectId || 'ProjectID';
  return appwrite.setEndpoint(ep).setProject(pi);
}
