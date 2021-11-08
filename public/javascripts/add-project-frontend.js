/* Handle this in the "/projects-client.js"
/* Frontend JS 
Written by Kennedy C. Ezumah
This is the client JS script that executes the addition of a project
This script checks for duplicate entries and then makes a post request 
on the backend database
*/

// use document selector to target the add button
const addButton = document.querySelector("#add-project-form");
// add an event listener
addButton.addEventListener("submit", addProject);


// define addProject
async function addProject(evt) {

  // prevent data delivery
  evt.preventDefault();

  window.alert("add-project-frontend.js: projects loaded...");

  // make an asynchronous POST request to the route for updating the database
  const form = new FormData(formSubmit);

  const data = {};
  for (let [key, val] of form.entries()) {
    data[key] = val;
  }

  const res = await fetch("/projects/create", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok){
    window.location.replace("/projects.html");
  }
}

