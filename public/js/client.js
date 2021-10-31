// This is the client JS file that executes on the frontend of the application
const projectList = document.querySelector("#project-list");

async function reloadProjects() {
  // make a request from the client to the server
  const res = await fetch("/projects");

  if (!res.ok) {
    projectList.innerHTML = "Error loading data";
    return;
  }

  console.log("testing client");

  const projects = await res.json();
  window.alert("Test passed!");

  // clean up inner HTML
  projectList.innerHTML = "";
  // iterate through the returned response containing the list of project objects
  // append them dynamically
  for (let p of projects) {
    projectList.innerHTML += `<li>
                <div class="card">
                  <div class="card-header">${p.name}</div>
                  <div class="card-body">
                    <div>Company: ${p.company}</div>
                    <div>Email: ${p.email}</div>
                    <div>Phone: ${p.phone}</div>
                    <p class="card-text">
                      ${p.description}
                    </p>
                    <a
                      href="https://github.com/randylirano/NEU-CS5200-Summer2021-Project-3"
                      class="btn btn-primary"
                      target="_blank"
                      >GitHub</a
                    >
                  </div>
                  <div class="card-footer">
                    <ul class="skill-tags">
                      <li>${p.skillStack}</li>
                    </ul>
                  </div>
                </div>
              </li>`;
  }
}

reloadProjects();
