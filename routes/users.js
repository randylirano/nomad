let express = require("express");
let router = express.Router();

// import module to interact with DB
const nomadDB = require("../db/myMongoDB.js");

// routes to create new user during sign-up
router.post("/create", async (req, res) => {
  const body = req.body;

  try {
    const checkCredential = await nomadDB.getCredential(body);

    if (checkCredential.length == 0) {
      console.log("NO DUPLICATE FOUND");
      const createRes = await nomadDB.createUser(body);
      console.log("User created", createRes);
    } else {
      console.log("DUPLICATE FOUND");
    }
  } catch (err) {
    console.log("FAILED INSERTING", err);
  }

  res.json({"status":"OK"});
});

/* Subroute used for verifying user login */
router.post("/query", async function (req, res) {
  console.log("users.js: '/query' route invoked...");
  console.log(req.body);
  const body = req.body;

  try {
    const checkCredential = await nomadDB.getCredential(body);

    if (checkCredential.length == 0) {
      console.log("NO DUPLICATE FOUND");
      const createRes = await nomadDB.createUser(body);

    } else {
      console.log("DUPLICATE FOUND");
    }
  } catch (err) {
    console.log("FAILED INSERTING", err);
  }

  res.json({"status":"OK"});
});

module.exports = router;
