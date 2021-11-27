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
  const weather_res = await fetch(weatherAPI_url);
  const weather_data = await weather_res.json();

  const openAQ_url = `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?coordinates=${lat},${lon}`;
  const openaq_res = await fetch(openAQ_url);
  const openaq_data = await openaq_res.json();

  const data = {
    weather: weather_data,
    air_quality: openaq_data,
  };

  res.json(data);
});
