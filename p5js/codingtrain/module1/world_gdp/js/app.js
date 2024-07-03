// Anual GDP Growth Percentage Per Country from 1961 - 2020
const ctx = document.querySelector("#chart").getContext("2d");
const fileName = "res/data/World_GDP_PerCountry_1960-2020.csv";
const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

function extractHeaders(str) {
  return str.split(regex);
}

function retrieveCountryData(row) {
  const result = [];

  const temp = row.split(regex);

  for (let i = 0; i < temp.length; i++) {
    if (!temp[i].trim()) {
      temp[i] = "0.00";
    }

    result.push(temp[i]);
  }

  return result;
}

function extractValues(table) {
  const result = [];

  for (let i = 0; i < table.length; i++) {
    let gdp = retrieveCountryData(table[i]);

    const countryName = gdp.shift();
    const countryCode = gdp.shift();

    result.push({
      countryName,
      countryCode,
      gdp,
    });
  }

  return result;
}

async function retrieveData() {
  const res = await fetch(fileName);
  const text = await res.text();
  const table = text.split("\r\n");

  const headers = extractHeaders(table.shift());
  const xs = headers.splice(2);
  const countries = extractValues(table);

  return { headers, xs, countries };
}

function getDataForCountry(data, code = "WLD") {
  return Object.values(data.countries).find((o) => {
    return o.countryCode === code;
  });
}

async function graphData() {
  const data = await retrieveData();

  const dom = getDataForCountry(data, "DOM");

  const latam = getDataForCountry(data, "LCN");

  const world = getDataForCountry(data);

  const haiti = getDataForCountry(data, "HTI");

  const chart = new Chart(ctx, {
    data: {
      labels: data.xs,
      datasets: [
        {
          type: "line",
          label: `${dom.countryName}, ${dom.countryCode}`,
          data: dom.gdp,
          fill: false,
          backgroundColor: "rgba(255,0,0,0.5)",
          borderColor: "rgba(100, 0, 0, 0.3)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: `${latam.countryName}, ${latam.countryCode}`,
          data: latam.gdp,
          fill: false,
          backgroundColor: "rgba(0,0,255,0.5)",
          borderColor: "rgba(0, 0, 100, 0.3)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: `${world.countryName}, ${world.countryCode}`,
          data: world.gdp,
          fill: false,
          backgroundColor: "rgba(0,255,0,0.5)",
          borderColor: "rgba(0, 100, 0, 0.3)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: `${haiti.countryName}, ${haiti.countryCode}`,
          data: haiti.gdp,
          fill: false,
          backgroundColor: "rgba(250,255,100,0.5)",
          borderColor: "rgba(255, 100, 200, 0.7)",
          borderWidth: 1,
        },
      ],
    },
  });
}

graphData();
