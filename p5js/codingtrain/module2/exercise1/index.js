const express = require("express");
const app = express();
app.listen("3000", () => {
  console.log("Connected and listening on port 3000");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = [];

app.post("/api", (req, res) => {
  console.log("I got a request!");

  const data = req.body;

  database.push(data);

  console.log(database);

  res.json({
    status: "success",
    data: database,
  });
});
