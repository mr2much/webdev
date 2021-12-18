const express = require("express");

const router = express.Router();

const queries = require("../db/queries");

// All requests that come here are prefixed with /api/v1/servers

router.get("/", async (req, res) => {
  const entries = await queries.getAll();

  res.json(entries);
});

module.exports = router;
