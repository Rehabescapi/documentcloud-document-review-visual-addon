
var userId;
var prevUrls = [];
const searchUrl = "https://api.www.documentcloud.org/api/documents/search/";

function getUserId() {
  const url = "https://api.www.documentcloud.org/api/users/me/";
  fetch(url, { credentials: "include"})
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data) {
            document.getElementById("auth").innerHTML = "You are authenticated as " +
              data.username;
            userId = data.id;
            var query = `user:${userId}`;
            document.getElementById("query").value = query;
            update();
          }
        });
      } else {
        document.getElementById("auth").innerHTML = "You are not authenticated";
      }
    }).catch((err) => document.getElementById("auth").innerHTML =
    `Error: check your CORS settings: ${err}`);
}

function paginator(parent, data, url, attrs, metadata) {
  var nav = document.createElement("div");
  parent.appendChild(nav);
  if (prevUrls.length > 0) {
    var a = document.createElement("a");
    a.addEventListener("click", (event) => {
      event.preventDefault();
      getDocuments(prevUrls.pop(), attrs, metadata);
    });
    a.href = "#";
    a.innerHTML = "Prev";
    nav.appendChild(a);
  } else {
    nav.appendChild(document.createTextNode("Prev"));
  }
  nav.appendChild(document.createTextNode(" | "));
  if (data.next) {
    a = document.createElement("a");
    a.addEventListener("click", (event) => {
      event.preventDefault();
      prevUrls.push(url);
      getDocuments(data.next, attrs, metadata);
    });
    a.href = "#";
    a.innerHTML = "Next";
    nav.appendChild(a);
  } else {
    nav.appendChild(document.createTextNode("Next"));
  }
  return nav;
}

function getDocuments(url, attrs, metadata) {
  const documents = document.getElementById("documents");
  documents.innerHTML = "Loading...";
  fetch(url, { credentials: "include"})
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          documents.innerHTML = "";
          documents.appendChild(
            document.createTextNode(
              `There are ${data.count.toLocaleString("en-us")} documents`
            )
          );
          paginator(documents, data, url, attrs, metadata);
          documents.appendChild(document.createElement("hr"));
          data.results.forEach((item) => {
            var docDiv = document.createElement("div");
            var docDl = document.createElement("dl");
            docDiv.appendChild(docDl);
            attrs.forEach((attr, i) => {
              var dt = document.createElement("dt");
              dt.innerHTML = attr;
              docDl.appendChild(dt);
              var dd = document.createElement("dd");
              if (i == 0) {
                  dd.innerHTML = `<a href="${item.canonical_url}" target="_blank">` +
                  `${item[attr]}</a>`;
              } else {
                dd.innerHTML = item[attr];
              }
              docDl.appendChild(dd);
            });
            metadata.forEach((datum) => {
              if (datum) {
                var dt = document.createElement("dt");
                dt.innerHTML = datum;
                docDl.appendChild(dt);
                var dd = document.createElement("dd");
                dd.innerHTML = item.data[datum];
                docDl.appendChild(dd);
              };
            });
            if (item.notes.length > 0) {
              var dt = document.createElement("dt");
              dt.innerHTML = "Notes";
              docDl.appendChild(dt);
              var dd = document.createElement("dd");
              var ul = document.createElement("ul");
              dd.appendChild(ul);
              item.notes.forEach((note) => {
                var li = document.createElement("li");
                li.innerHTML = note.title;
                ul.appendChild(li);
              });
              docDl.appendChild(dd);
            }
            documents.appendChild(docDiv);
            documents.appendChild(document.createElement("hr"));
          });
          paginator(documents, data, url, attrs, metadata);
        });
      } else {
        documents.innerHTML = "Error";
      }
    }).catch((err) => documents.innerHTML = `Error: ${err}`);
}

function update() {
  var query = document.getElementById("query").value;
  var dataUrl = `${searchUrl}?q=${query}`;
  var attrs = document.getElementById("attrs").value.split(",").map((i) => i.trim());
  var metadata = document.getElementById("data").value.split(",").map((i) => i.trim());
  getDocuments(dataUrl, attrs, metadata);
}

document.getElementById("update").addEventListener("click", update);

getUserId();
