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

// all routes are appended with /api/v1/servers
app.post("/", async (req, res, next) => {
  if (validServer(req.body)) {
    const { server, dns, func, ip, os_support, app_support, notes } = req.body;

    notes = typeof notes === "undefined" ? "" : notes;

    const entry = {
      server,
      dns,
      func,
      ip,
      os_support,
      app_support,
      notes,
      date_created: Date.now(),
      last_modified: Date.now(),
    };

    const result = await queries.create(entry);
    res.json(result);
  } else {
    const error = new Error("Invalid server");
    next(error);
  }
});

function validServer(server) {
  return server.server == "string" && server.server.trim() != "";
}

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
