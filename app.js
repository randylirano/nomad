let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");


// Routers List
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let projectsRouter = require("./routes/projects");
let freelancersRouter = require("./routes/freelancers");


let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/freelancers", freelancersRouter);


module.exports = app;
