import { url } from "./constants.js";

export async function vetAPI() {
  console.log(url);
  const List = document.getElementById("ProjectList");
  fetch({ url }, { credentials: "include" })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          if (data) {
            document.getElementById("content").innerHTML =
              "You are authenticated as " + data.username;

            fetch(projectsUrl).then((response) => {
              if (response.ok) {
                response.json().then((projData) => {
                  console.log(projData);
                  document.getElementById("ProjectTitle").innerHTML =
                    "Project Name : " + projData.title;
                });
              }
            });

            fetch(projectDocsUrl).then((response) => {
              if (response.ok) {
                response.json().then((projData) => {
                  console.log(projData);
                  var data = projData.results.sort();

                  var smallArray = projData.results.slice(0, 3);
                  console.log(smallArray);
                  smallArray.forEach((element) => {
                    fetch(documentStub + element.document + "/").then(
                      (docResponse) => {
                        if (docResponse.ok) {
                          docResponse.json().then((docData) => {
                            console.log(docData);
                            var x = document.createElement("li");
                            List.append(x);
                            x.innerText = docData.title;
                          });
                        }
                      }
                    );
                  });
                  {
                  }
                });
              }
            });
          }
        });
      } else {
        document.getElementById("content").innerHTML =
          "You are not authenticated";
      }
    })
    .catch(
      (err) =>
        (document.getElementById("content").innerHTML =
          "Error: check your CORS settings")
    );
}




   
    /***
     * Attempts to change the tag name credentials
     ***/
export async function ChangeTagNames(data) {
        console.log("Change Tag Names Reached");
        console.log(data);
        const smallArray = data
  
        try {
          const docPromises = smallArray.map(async (element) => {
            const response = await postData(documentStub + element.document + "/", { answer: 42 });
            console.log(element + " Stubbed", response);
          });
  
          await Promise.all(docPromises);
        } catch (error) {
          console.error("Error updating document tags: ", error);
        }
      }
  
export async function postData(url = "", data = {}) {
        console.log("Changed to PUT to PATCH")
          // Default options are marked with *
          const response = await fetch(url+"notes/LifeAnswer/", {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
             // "Access-Control-Allow-Origin":"*", 
              //"Content-Type": "application/json",
              Accept: "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
      }
  


      (async () => {
        console.log("start of things")
        
        
        console.log("HI")
        const data = await vetAPI();
        console.log(data)
        console.log("Woo")
        if (data) await ChangeTagNames(data);
      })();
