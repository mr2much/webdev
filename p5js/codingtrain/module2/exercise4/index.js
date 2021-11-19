const express = require("express");
const Datastore = require("nedb");
const fs = require("fs");

const _dir = "./public/res/img";
const path = require("path");

const app = express();
app.listen("3000", () => {
  console.log("Connected and listening on port 3000");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// Create Database database.db on local file
const database = new Datastore("database.db");
database.loadDatabase(); // load database or create it if it doesn't exist

app.post("/api", async (req, res) => {
  console.log("I got a request!");

  const data = req.body;
  const timestamp = Date.now();

  data.timestamp = timestamp;
  const imagePath = path.join(_dir, data.image.filename);
  data.image.filename = imagePath;

  const dbEntry = {
    lat: data.lat,
    lon: data.lon,
    mood: data.mood,
    timestamp: timestamp,
    path: imagePath,
    width: data.image.width,
    height: data.image.height,
  };

  database.insert(dbEntry);

  await dataBase64ToFile(data.image.image64, imagePath, data.image.type);

  res.json({
    status: "success",
    mood: data.mood,
    timestamp: timestamp,
    latitude: data.lat,
    longitude: data.lon,
  });
});

async function dataBase64ToFile(image64, path, mimeType) {
  const asciiToBinary = Buffer.from(image64, "base64");

  fs.writeFile(path, asciiToBinary, (e) => {
    if (e) {
      return console.log(`File error: ${e}`);
    }
    console.log(`File saved to: ${path}`);
  });
}

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
