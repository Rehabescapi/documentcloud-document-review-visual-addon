export const url = "https://api.www.documentcloud.org/api/users/me/";
export const projectsUrl =
  "https://api.www.documentcloud.org/api/projects/218188";
export const projectDocsUrl =
  "https://api.www.documentcloud.org/api/projects/218188/documents";
export const documentStub = "https://api.www.documentcloud.org/api/documents/";

export const emptyProject =
  "https://api.www.documentcloud.org/api/projects/218484/documents";

export const proxyUrl = "http://127.0.0.1:5000/proxy/";

export function getURL() {
  const url = "https://api.www.documentcloud.org/api/users/me/";
  return url;
}

export function getProjectURL() {
  const projectsUrl = "https://api.www.documentcloud.org/api/projects/218188";
  return projectsUrl;
}

export function getDocumentStub() {
  return documentStub;
}

export function proxyURL() {
  return proxyURL;
}
