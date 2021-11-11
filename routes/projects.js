/* Backend JS 
Written by Kennedy C. Ezumah
Script: This is the backend script that handles different endpoint routes
*/

let express = require("express");
let router = express.Router();
const myDB = require("../db/myMongoDB.js");

console.log("projects.js: module loaded...");

/* GET projects listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

// make GET request to the MongoDB to load all projects
router.get("/load", async (req, res) => {
  // Call MongoDB server
  const projectList = await myDB.getProjects();

  console.log("projects.js: projects retrieved...");
  console.log(projectList);

  // send back data in JSON format to calling frontend script
  res.json(projectList);
});

/* POST new project to projects listing. */
router.post("/create", function (req, res) {
  res.send("respond with a resource");
});

console.log("projects.js: module executed with 0 errors!");
module.exports = router;
