
const listingsDiv = document.querySelector("#section-listings");
const createFreelancerForm = document.querySelector("form#newFreelancer");

function redrawFreelancers(freelancers) {
  for (let f of freelancers) {
    // create card div for each freelancer
    const divCard = document.createElement("div");
    divCard.className = "card p-1 m-1 freelancer-info";

    // initiate card components
    // card header
    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";
    // card body
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";
    // card footer
    const divCardFooter = document.createElement("div");
    divCardFooter.className = "card-footer";

    // assign name to card header
    divCardHeader.innerText = f.first_name + " " + f.last_name;

    let currFreelancerInfo = f["freelancer_info"];
    assignFreelancerInfo(currFreelancerInfo, divCardBody, divCardFooter);

    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);
    divCard.appendChild(divCardFooter);

    listingsDiv.appendChild(divCard);
  }
}

function assignFreelancerInfo(currFreelancerInfo, divCardBody, divCardFooter){
  // assign each info to card body
  // if the attribut is skills, assign to card footer
  for (const [key, value] of Object.entries(currFreelancerInfo)) {
    if (key == "skill_stack") {
      produceSkillTags(value, divCardFooter);
    } else if (key == "links") {
      produceLinks(value, divCardBody);
    }
    else {
      let divInfo = document.createElement("div");
      divInfo.innerText = value;
      divCardBody.appendChild(divInfo);
    }
  }
}

function produceSkillTags(skills, divCardFooter) {
  const divTagsRow = document.createElement("div");
  divTagsRow.className = "row";

  for (let skill of skills) {
    let divTagCol = document.createElement("div");
    divTagCol.className = "col-6 col-sm-4 col-md-3 col-lg-2 g-2";
    let divSkillTag = document.createElement("div");
    divSkillTag.className = "tag rounded";

    divSkillTag.innerText = skill;
    divTagCol.appendChild(divSkillTag);
    divTagsRow.appendChild(divTagCol);
  }
  divCardFooter.appendChild(divTagsRow);
}

function produceLinks(links, divCardBody) {
  const divLinksRow = document.createElement("div");
  const linksList = document.createElement("ul");

  for (let link of links) {
    let linkListItem = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", link);
    let domain = (new URL(link));
    a.innerText = domain.hostname;
    linkListItem.appendChild(a);
    linksList.appendChild(linkListItem);
  }

  divLinksRow.appendChild(linksList);
  divCardBody.appendChild(divLinksRow);
}

createFreelancerForm.addEventListener("submit", async (evt) => {
  // prevent default event handling
  evt.preventDefault();

  // get active user id
  // transfer form data into data object
  const formData = new FormData(createFreelancerForm);
  const data = {};
  for (let [key, val] of formData.entries()){
    data[key] = val;
  };

  const fetchResponse = await fetch("/freelancers/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const res = await fetchResponse.json();

  console.log("Got response", res);

  if (res.status === "OK"){
    window.location.replace("./freelancers.html");
  } else {
    console.log("Failed POST");
  }

});


// retrieve freelancers from db
async function reloadFreelancers() {
  listingsDiv.innerHTML = "";
  let freelancers;

  try {
    const res = await fetch("/freelancers");

    if (!res.ok) {
      throw new Error("Response not ok" + res.status);
    }

    freelancers = await res.json();
  } catch (e) {
    listingsDiv.innerHTML = e.msg;
  }

  redrawFreelancers(freelancers);
}

reloadFreelancers();
