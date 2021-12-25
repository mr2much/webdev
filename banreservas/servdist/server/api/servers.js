const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

// All requests that come here are prefixed with /api/v1/servers

router.get("/", async (req, res) => {
  const entries = await queries.getAll();

  res.json(entries);
});

router.get("/:id", async (req, res, next) => {
  if (req.params.id.trim() == "") {
    const error = new Error(`ID: ${id} is not a valid ID`);
    next(error);
  }

  const server = await queries.getOne(req.params.id);

  if (server) {
    res.json(server);
  } else {
    next();
  }
});

module.exports = router;
