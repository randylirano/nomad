let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let bodyParser = require("body-parser");


// freelancers router
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let projectsRouter = require("./routes/load-projects");
let addProjectRouter = require("./routes/add-project-backend");
let freelancersRouter = require("./routes/freelancers");

let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/load-projects", projectsRouter);
app.use("/add-project-backend", addProjectRouter);
app.use("/freelanceListings.html", freelancersRouter);

// POST /login gets urlencoded bodies
app.post("/submit-form", urlencodedParser, function (req, res) {
  console.log(req.body);
  res.send("welcome, " + req.body.username);
});

module.exports = app;
