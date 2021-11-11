const express = require("express");
const app = express();
app.listen("3000", () => {
  console.log("Connected and listening on port 3000");
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  console.log("I got a request!");
  console.log(req.body);

  const data = req.body;
  res.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });
});
