/* Frontend JS 
Written by Kennedy C. Ezumah
This is the client JS script that executes the addition of a project
This script checks for duplicate entries and then makes a post request 
on the backend database
*/

// use document selector to target the add button
const addButton = document.querySelector("#add-project-button");
// add an event listener
addButton.addEventListener("click", addProject());


// define addProject
async function addProject() {
  // create new object
  let newProject = {};

  // fill attributes
  // show errors if attributes are left blank
  let newProject.name = prompt("Please enter the name of the project");
  let newProject.company = prompt("Please enter your organization's name");
  let newProject.email  = prompt("Please enter your business email");
  let newProject.phone = prompt("Please enter your business number");
  let newProject.description = prompt("Please give a brief description of the project");
  let newProject.skills = prompt("Please list the required skills");
  
  // make an asynchronous POST request to the route for updating the database
  const res = await fetch("/add-project-backend", {
    method: "POST", 
    body: JSON.stringify(newProject);
  });

  // if an error resonse is received (due to a duplicate entry), show this alert
  // duplicate verification is performed on the backend
  if (!res.ok) {
    window.alert("Duplicate project entries not allowed. Please re-enter");
    return;
  } else { 
  // post a message showing that the request has been completed
  window.alert("Your new project has been posted!", res);
  }

}

