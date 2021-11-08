const signUpForm = document.querySelector("form#userSignUp");

signUpForm.addEventListener("submit", async (evt) => {
  // prevent default event handling
  evt.preventDefault();
  console.log("submit form");

  // transfer form data into data object
  const formData = new FormData(signUpForm);
  const data = {};
  for (let [key, val] of formData.entries()){
    data[key] = val;
  };

  const fetchResponse = await fetch("/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  const res = await fetchResponse.json();

  console.log("Got response", res);

  if (res.status === "OK"){
    window.location.replace("./index.html");
  } else {
    console.log("Failed POST");
  }

});
