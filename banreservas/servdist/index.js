const express = require("express");
const fetch = require("node-fetch");
const Datastore = require("nedb");
const fs = require("fs");
const path = require("path");

const __dir = "./public/res/data";
const __db = "servidoresxunidadgssd.db";
const dbFilePath = path.join(__dir, __db);
const port = "3000";

const app = express();

app.listen(port, () => {
  console.log(`Connected and listening on port ${port}`);
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore(dbFilePath);
database.loadDatabase();

app.get("/api", async (req, res) => {
  console.log("Got a get request");

  database.find({}, (err, entries) => {
    if (err) {
      res.json({ success: false, statusCode: 500, message: err });
      res.end();
      return;
    }

    res.json(entries);
  });
});

app.post("/", async (req, res) => {
  console.log("Received a request to create an entry");
  const data = req.body;

  database.findOne({ server: data.server }, (err, server) => {
    if (err) {
      console.log("Error");
      res.json({ success: false, statusCode: 500, message: err });
      res.end();
      return;
    }

    if (server) {
      res.json({ success: false, message: "duplicated" });
    } else {
      database.insert(data, (err, newDoc) => {
        if (err) {
          res.json({ success: false, statusCode: 500, message: err });
          res.end();
          return;
        }

        res.json(newDoc);
      });
    }
  });
});

app.delete("/:id", async (req, res) => {
  console.log("Got a request to delete an entry");

  const servID = req.params.id;

  console.log(servID);

  database.remove({ _id: servID }, {}, (err, numRemoved) => {
    if (err) {
      res.json({ success: false, statusCode: 500, message: err });
      res.end();
    }

    res.json({ message: "deleted" });

    console.log(`Removed ${numRemoved} entries matching ID: ${servID}`);
  });
});

app.put("/:id", async (req, res) => {
  console.log("Got a call to update an entry");
  const server = req.body;
  const { id } = req.params;

  database.update(
    { _id: id },
    { $set: server },
    {},
    async (err, numReplaced) => {
      if (err) {
        res.json({ success: false, statusCode: 500, message: err });
        res.end();
      }
      console.log(`Updated ${numReplaced} entries matching ID: ${id}`);

      database.loadDatabase();
      res.json(server);
    }
  );
});
