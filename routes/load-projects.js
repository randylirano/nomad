/* Backend JS 
Written by Kennedy C. Ezumah
Script: This is the backend script that handles different endpoint routes
*/

let express = require("express");
let router = express.Router();
const myDB = require("../db/myMongoDB.js");

// define a projects array to store objects of projects
let projects = [];
console.log("projects.js: module loaded...");

// build dummy project(s)

// make request to the MongoDB to load all projects
router.get("/load", (req, res) => {
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

console.log("projects.js: module executed with 0 errors!");
module.exports = router;
