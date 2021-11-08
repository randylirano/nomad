/* Backend JS 
Written by Kennedy C. Ezumah
Script: This is the backend script that adds a new entry to the projects database
It returns either an "OK" code or "Error" code to confirm whether the operation was
successful
Called by: This script is invoked by the "Add" button on the frontend
*/

let express = require("express");
let router = express.Router();

// import the database
let db = require("../db/database.json");
let searchQuery;

console.log("add-projects-backend.js: module loaded...");

// catch and process the request
// change to "/projects" and combine with load projects route
router.post("/", (req, res) => {
  // convert the string to a javascript object
  // try {
  searchQuery = req.body;
  // } catch (error) {
  //   console.log("Error parsing JSON");
  //}

  console.log("add-projects-backend.js: submission parsed...");

  // traverse the database and search to see if a matching company and project are are found
  for (let i = 0; i < db.length; i++) {
    // if so, return an error code
    if (
      db[i].company == searchQuery.company &&
      db[i].name == searchQuery.name
    ) {
      console.log(
        "add-projects-backend.js: Duplicate entry found in database, cannot proceed"
      );
      res.sendStatus(403);
    }
  }

  // otherwise, update the database with the new entry and return ok
  fs.writeFile("~/data/database.json", JSON.stringify(searchQuery), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("add-projects-backend.js: database successfully updated!");
    }
  });

  // return ok
  res.redirect("../");
});

module.exports = router;
