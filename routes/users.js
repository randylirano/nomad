let express = require("express");
let router = express.Router();
const myDB = require("../db/myMongoDB.js");

console.log("users.js: module loaded...");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Subroute used for verifying user login */
router.post("/query", async function (req, res) {
  console.log("users.js: '/query' route invoked...");
  console.log(req.body);
  // define query from get request
  let query = {};
  query.login_email = req.body.login_email;
  query.password = req.body.password;

  // Call MongoDB server
  const matchingUsers = await myDB.authenticateUsers(query);
  console.log(matchingUsers);

  // check that an empty list was not returned, meaning no matches to the query
  // redirection will be handled by client-side JS
  if (matchingUsers.length == 0) {
    res.sendStatus(404);
  }

  // otherwise, authentication was successful and now redirect to projects page
  // redirection will be handled by client-side JS
  else {
    res.sendStatus(200);
  }
});

module.exports = router;
