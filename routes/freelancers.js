let express = require("express");
let router = express.Router();

const nomadDB = require("../db/myMongoDB.js");

/* GET listings */
// get all freelancers information
router.get("/", async function (req, res) {
  const freelancers = await nomadDB.getFreelancers();

  res.json(freelancers);
});

router.post("/create", async function (req, res) {
  const newFreelancer = req.body;
  
  try {
    const postRes = await nomadDB.createFreelancer(newFreelancer);
    console.log("New freelancer created", postRes);
  } catch (err) {
    console.log("FAILED INSERTING", err);
  }

  res.json({"status":"OK"});
});

module.exports = router;
