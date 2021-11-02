/* Backend JS 
Written by Kennedy C. Ezumah
Script: This is the backend script that returns a JSON file
containing a JSON file containing a predetermined number projects
Called by: This script is invoked by the frontend to populate the 
project listing on the projects page
*/

let express = require("express");
let router = express.Router();

// define a projects array to store objects of projects
let projects = [];
console.log("load-projects.js: module loaded...");
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
console.log("load-projects.js: projects pushed...");

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

  // send data in JSON format
  res.json(response);
});

console.log("load-projects.js: module executed with 0 errors!");
module.exports = router;
