// Rename to "/projects-client.js"
/* Frontend JS 
Written by Kennedy C. Ezumah
This is the client JS script that executes on the frontend of the application
This script queries the backend database and loads the project entries
*/
const projectList = document.querySelector("#project-list");

async function reloadProjects() {
  // make a request from the client to the server which then proceeds to query the database for
  let res = await fetch("/projects/load");

  window.alert("client.js: module loaded...");

  if (!res.ok) {
    projectList.innerHTML = "Error loading data";
    return;
  }

  // clean up inner HTML
  projectList.innerHTML = "";

  // iterate through the returned response containing the list of project objects
  // append them dynamically
  // Confirm with professor JG why this second .json() method is required to make the response iterable
  let response = await res.json();

  for (let p of response) {
    projectList.innerHTML += `<li>
                <div class="card">
                  <div class="card-header">${p.project_name}</div>
                  <div class="card-body">
                    <div><b>Company</b>: ${p.company}</div>
                    <div><b>Email</b>: ${p.email}</div>
                    <div><b>Phone</b>: ${p.phone}</div>
                    <p class="card-text">
                      <b>Description: </b>${p.project_description}
                    </p>
                    <a
                      href="https://github.com/randylirano/NEU-CS5200-Summer2021-Project-3"
                      class="btn btn-primary"
                      target="_blank"
                      >I'm Interested</a
                    >
                  </div>
                  <div class="card-footer">
                    <ul class="skill-tags">
                      <li><b>Required Skills</b>: ${p.skill_stack}</li>
                    </ul>
                  </div>
                </div>
              </li>`;
  }
}

reloadProjects();

