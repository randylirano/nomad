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
let db = require("../data/database.json");

// import module for writing to files
const fs = require("fs");

console.log("okooo");

// catch and process the request
router.get("/", (req, res) => {
  // convert the string to a javascript object
  try {
    const searchQuery = JSON.parse(req.body);
  } catch (error) {
    console.log("Error parsing JSON");
  }

  // traverse the database and search to see if a matching company and project are are found
  for (let i = 0; i < db.length; i++) {
    // if so, return an error code
    if (
      db[i].company == searchQuery.company &&
      db[i].name == searchQuery.name
    ) {
      console.log("Duplicate entry found in database, cannot proceed");
      res.sendStatus(403);
    }
  }

  // otherwise, update the database with the new entry and return ok
  fs.writeFile("../data/database.json", JSON.stringify(searchQuery), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database successfully updated!");
    }
  });

  // return ok
  res.sendStatus(200);
});

module.exports = router;
