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

  const server = await queries.findByID(req.params.id);

  if (server) {
    res.json(server);
  } else {
    next();
  }
});

router.put("/:id", async (req, res, next) => {
  if (validServer(req.body)) {
    // query to update
    queries
      .update(req.params.id, req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    const error = new Error(`Invalid server: ${req.body}`);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  if (validServer(req.body)) {
    const { server, dns, func, ip, os_support, app_support, notes } = req.body;

    const entry = {
      server,
      dns,
      func,
      ip,
      os_support,
      app_support,
      notes: typeof notes === "undefined" ? "" : notes,
      date_created: Date.now(),
      last_modified: Date.now(),
    };

    queries
      .create(entry)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    const error = new Error(`Invalid server: ${req.body}`);
    next(error);
  }
});

function validServer(server) {
  return typeof server.server == "string" && server.server.trim() != "";
}

module.exports = router;
