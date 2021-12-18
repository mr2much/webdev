const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const __dir = "./db";
const __db = "servidoresxunidadgssd.db";
const dbFilePath = path.join(__dir, __db);

const router = express.Router();

const database = new Datastore(dbFilePath);
database.loadDatabase();

router.get("/", (req, res, next) => {
  // database.find({}, (err, entries) => {
  //   if (err) {
  //     next(err);
  //   }

  //   res.json(entries);
  // });

  res.json([]);
});

module.exports = router;
