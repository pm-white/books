const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { auth } = require("express-openid-connect");

const indexRouter = require("./routes/index");
const bookFormRouter = require("./routes/bookForm");
const backlogRouter = require("./routes/backlog");
const backlogFormRouter = require("./routes/backlogForm");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// authentication
const auth_config = {
  authRequired: process.env.AUTH_AUTH_REQUIRED,
  auth0Logout: process.env.AUTH_AUTH0_LOGOUT,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
};

app.use(auth(auth_config));

app.use("/", indexRouter);
app.use("/bookForm", bookFormRouter);
app.use("/backlog", backlogRouter);
app.use("/backlogForm", backlogFormRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
