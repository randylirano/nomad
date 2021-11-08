/* Handle this in the "/projects-client.js"
/* Frontend JS 
Written by Kennedy C. Ezumah
This is the client JS script that executes the addition of a project
This script checks for duplicate entries and then makes a post request 
on the backend database
*/

// use document selector to target the add button
const formSubmit = document.querySelector("#login-form");

// add an event listener
if (formSubmit) {
  formSubmit.addEventListener("submit", authenticateUsers);
}

// define addProject
async function authenticateUsers(evt) {
  // prevent data delivery
  evt.preventDefault();

  window.alert("login.js: module loaded...");

  // make an asynchronous POST request to the route for updating the database
  const form = new FormData(formSubmit);

  const data = {};
  for (let [key, val] of form.entries()) {
    data[key] = val;
  }

  const res = await fetch("/users/query", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // If authentication fails, reprompt user to try again
  if (!res.ok) {
    alert("Incorrect email and password combination. Please retry.");
    window.location.replace("/index.html");
    return;
  } else {
    // otherwise redirect to logged-in projects page
    window.location.replace("/projects.html");
    return;
  }
}
