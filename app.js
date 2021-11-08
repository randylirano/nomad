let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// indexRouter is for login page
let indexRouter = require("./routes/index");
/*
Users route has 2 subroutes: (1) "/create" --> subroute for signing up a new user
                             (1) "/query" --> subroute for loging in an existing user
*/
let usersRouter = require("./routes/users");
/* Combine projectsRouter and addProjectRouter to be two different subroutes on "/projects"
 */
let projectsRouter = require("./routes/projects");
//let addProjectRouter = require("./routes/add-project-backend");

let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
//app.use("/add-project-backend", addProjectRouter);

module.exports = app;
