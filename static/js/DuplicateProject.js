import { getURL, getProjectURL, emptyProject } from "./constants.js";

document
  .getElementById("duplicate")
  .addEventListener("click", DuplicateProject);

console.log("Duplicate project working");
function helloWorld() {
  console.log("helloWorld");
}
async function getProjectOptions() {}

async function DuplicateProject() {
  var data = document.getElementById("projectDup").value;
  console.log(data);
  console.log("Duplicate Project Reached. " + data);
}

async function getProjectData(url = "", data = {}) {
  const response = await fetch(url + "24658728/data", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function vetAPI() {
  console.log("Pre Try")
  try {
    console.log("Test")
    const response = await fetch(url, { credentials: "include" });
    if (!response.ok) throw new Error("Authentication failed");

    console.log("Fetch URL");

    const data = await response.json();
    document.getElementById("content").innerHTML =
      "You are authenticated as " + data.username;

    const projResponse = await fetch(projectsUrl);
    if (!projResponse.ok) throw new Error("Failed to fetch project data");

    console.log(projResponse);
    const projData = await projResponse.json();
    document.getElementById("ProjectTitle").innerHTML =
      "Project Name : " + projData.title;

    const docsResponse = await fetch(projectDocsUrl);
    if (!docsResponse.ok) throw new Error("Failed to fetch project documents");

    console.log(docsResponse);
    const docsData = await docsResponse.json();
    const smallArray = docsData.results.slice(0, 3);

    const docPromises = smallArray.map(async (element) => {
      const docResponse = await fetch(documentStub + element.document + "/");
      if (!docResponse.ok) throw new Error("Failed to fetch document data");

      const docData = await docResponse.json();
      const x = document.createElement("li");
      x.innerText = docData.title;
      document.getElementById("ProjectList").append(x);
    });

    await Promise.all(docPromises);

    return smallArray;
  } catch (error) {
    document.getElementById("content").innerHTML = "Error: " + error.message;
  }
}

console.log("end of JS file");

(async () => {
  console.log("start of things");
  var url = getURL();
  var emptyProject = getProjectURL();
  console.log(url);
  console.log("Woot");
  const data = await vetAPI(url, emptyProject);
  console.log(data);

  if (data[0]) {
    toDelete = data[0].document;

    /***
     * Showing that DELETE is not working.
     * */
    try {
      const x = await deleteProjectData(
        emptyProject + "/documents/" + toDelete
      );
      console.log(x);
    } catch (exception) {}
  }
  try {
    const y = await deleteProject(projectsUrl);
    console.log(x);
  } catch (exception) {}
})();
