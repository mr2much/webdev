const createError = require("http-errors");
const express = require("express");
const fetch = require("node-fetch");

const fs = require("fs");
// const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

const servers = require("./api/servers");
const queries = require("./db/queries");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use("/api/v1/servers", servers);

app.get("/", async (req, res, next) => {
  res.json({ message: "Hello World!" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err.stack : {},
  });
});

module.exports = app;
