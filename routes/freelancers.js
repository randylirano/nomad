let express = require("express");
let router = express.Router();

/* GET listings */
// simulation db
const freelancersStub = [
  {
    name:"Randy Lirano",
    email:"lirano.randy@fakemail.com",
    phone:"+1 (111) 111-1111",
    skills:["Python", "Java"],
    links:""
  },
  {
    name:"Kennedy Ezumah",
    email:"ezumah.kennedy@fakemail.com",
    phone:"+1 (222) 222-2222",
    skills:"Python",
    links:""
  },
  {
    name:"Paola Quevedo",
    email:"quevedo.paola@fakemail.com",
    phone:"+1 (333) 333-3333",
    skills:"Python",
    links:""
  },
  {
    name:"John Alexis",
    email:"alexis.john@fakemail.com",
    phone:"+1 (444) 444-4444",
    skills:"Python",
    links:""
  },
  {
    name:"John Guerra",
    email:"guerra.john@fakemail.com",
    phone:"+1 (555) 555-5555",
    skills:"Python",
    links:""
  },
];

router.get("/", function (req, res) {
  res.json(freelancersStub);
});

router.post("/create", function(req, res) {
  const freelancer = req.body;
  console.log("create freelancer", freelancer);

  freelancersStub.push({
    name:freelancer.name,
    email:freelancer.email,
    phone:freelancer.phone,
    skills:freelancer.skills,
    links:freelancer.links
  });

  res.redirect("/freelanceListings.html/");
});

module.exports = router;