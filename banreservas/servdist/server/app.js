const createError = require("http-errors");
const express = require("express");
const fetch = require("node-fetch");
const Datastore = require("nedb");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const __dir = "./db";
const __db = "servidoresxunidadgssd.db";
const dbFilePath = path.join(__dir, __db);

app.use(logger("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const database = new Datastore(dbFilePath);
database.loadDatabase();
app.get("/", async (req, res, next) => {
  database.find({}, (err, entries) => {
    if (err) {
      next(err);
    }

    res.json(entries);
  });
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
