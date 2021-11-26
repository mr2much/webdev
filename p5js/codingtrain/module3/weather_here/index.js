const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = "3000";
const weatherAPI_key = "aeaf67d82874488f8cf75614212611";

app.listen(port, () => {
  console.log(`Connected and listening on port: ${port}`);
});

// set the directory where static files are going to be served from
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// Make new /weather endpoint on the server
app.get("/weather/:latlon", async (req, res) => {
  console.log("I got a request!");

  const latlon = req.params.latlon.split(",");

  lat = latlon[0];
  lon = latlon[1];

  const weatherAPI_url = `http://api.weatherapi.com/v1/current.json?key=${weatherAPI_key}&q=${lat},${lon}`;

  const response = await fetch(weatherAPI_url);
  const json = await response.json();

  res.json(json);
});
