// RENAME TO FREELANCECLIENT

const listingsDiv = document.querySelector("#section-listings");

function redrawFreelancers(freelancers) {
  for (let f of freelancers) {
    // create card div
    const divCard = document.createElement("div");
    divCard.className = "card p-1 m-1 freelancer-info";
    // card header
    const divCardHeader = document.createElement("div");
    divCardHeader.className = "card-header";
    divCardHeader.innerText = f.name;

    // card body
    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    Object.keys(f).forEach(function(key) {
      if (key != "name") {
        let divInfo = document.createElement("div");
        divInfo.className = "" + key;
        divInfo.innerText = f[key];

        divCardBody.appendChild(divInfo);
      }
    });

    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);

    listingsDiv.appendChild(divCard);
  }
}

// retrieve freelancers from db
async function reloadFreelancers() {
  listingsDiv.innerHTML = "";
  let freelancers;

  try {
    const res = await fetch("/freelanceListings.html/");

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
