import express from "express";
import fetch from "node-fetch"

const app = express();
const port = "3000";

app.listen(`${port}`, () => {
  console.log(`Connected and listening on port ${port}`);
});

app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

app.get("/api", async (req, res) => {
  console.log("We got a request");
  try {
    const info = await fetch("http://localhost:3000/listadoatms2.csv");
    const csv = await info.text();
    const table = csv.split("\r\n").slice(1);    
    
    const timestamp = Date.now();
    const data = [];
    for(let i = 0; i < table.length;i++) {
      let columns = table[i].split(",");

      let atm = {
        id: columns[0],
        description: columns[1],
        lat: columns[2],
        lon: columns[3]
      }
      
      data.push(atm);
    }
    
    res.json({
      status: "success",
      timestamp: timestamp,
      data: data,
    });
    
  } catch(e) {
    console.log("There was an error");
    console.log(e);
  }
  
});