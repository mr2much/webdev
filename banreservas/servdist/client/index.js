const API_URL = "http://localhost:3000/";

fetchData();

async function fetchData() {
  console.log("Data fetched");

  const res = await fetch(API_URL);
  const json = await res.json();

  console.log(json);

  //   servers.push(...json);
}
