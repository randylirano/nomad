// Backend
let express = require("express");
let router = express.Router();

// define a projects array to store objects of projects
let projects = [];

// display the first 3 projects
const displayCount = 3;

// build dummy project(s)
let testProjectOne = {
  company: "Acme",
  name: "API Development",
  description: "Develop an API to connect our data to our customers",
  email: "hiringmanager@acme.com",
  phone: "123456789",
  skillStack: "HTML, CSS, JavaScript, Node, React, MongoDB",
};

let testProjectTwo = {
  company: "Meta",
  name: "Backend Development",
  description: "Develop an API to connect our data to our customers",
  email: "hiringmanager@acme.com",
  phone: "123456789",
  skillStack: "HTML, CSS, JavaScript, Node, React, MongoDB",
};

let testProjectThree = {
  company: "Mvidia",
  name: "Embedded Development",
  description: "Develop an API to connect our data to our customers",
  email: "hiringmanager@acme.com",
  phone: "123456789",
  skillStack: "HTML, CSS, JavaScript, Node, React, MongoDB",
};

let testProjectFour = {
  company: "AirDnD",
  name: "Frontend Development",
  description: "Develop an API to connect our data to our customers",
  email: "hiringmanager@acme.com",
  phone: "123456789",
  skillStack: "HTML, CSS, JavaScript, Node, React, MongoDB",
};

let testProjectFive = {
  company: "SnapTalk",
  name: "Mobile Development",
  description: "Develop an API to connect our data to our customers",
  email: "hiringmanager@acme.com",
  phone: "123456789",
  skillStack: "HTML, CSS, JavaScript, Node, React, MongoDB",
};

projects.push(testProjectOne);
projects.push(testProjectTwo);
projects.push(testProjectThree);
projects.push(testProjectFour);
projects.push(testProjectFive);

console.log(projects);

//https://nomad/projects/projects

// define a projects array to store objects of projects
router.get("/", (req, res) => {
  // choose minimum between amount of project objects and display count
  let counter = Math.max(displayCount, projects.length);

  // response variable
  let response = [];

  // push objects to response
  for (let i = 0; i < counter; i++) {
    response.push(projects[i]);
  }

  console.log("here");
  // send data in JSON format
  res.send(response);

  console.log("done");
});

console.log("here3");

module.exports = router;
