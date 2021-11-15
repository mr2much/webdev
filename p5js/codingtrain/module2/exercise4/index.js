const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen("3000", () => {
  console.log("Connected and listening on port 3000");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// Create Database database.db on local file
const database = new Datastore("database.db");
database.loadDatabase(); // load database or create it if it doesn't exist

app.post("/api", (req, res) => {
  console.log("I got a request!");

  const data = req.body;
  const timestamp = Date.now();

  console.log(data.image64.split(";base64,"));

  data.timestamp = timestamp;
  // database.insert(data);

  res.json({
    status: "success",
    mood: data.mood,
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon,
  });
});

app.get("/api", (req, res) => {
  console.log("All got a request!");

  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }

    res.json(data);
  });
});
