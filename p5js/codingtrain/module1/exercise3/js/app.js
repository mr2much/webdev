const ctx = document.querySelector("#chart").getContext("2d");

async function createChart() {
  const data = await getData();

  const myChart = new Chart(ctx, {
    data: {
      labels: data.xs,
      datasets: [
        {
          type: "line",
          label: "Global",
          data: data.ys,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Northern Hemisphere",
          data: data.nhs,
          fill: false,
          backgroundColor: "rgba(55, 255, 132, 0.2)",
          borderColor: "rgba(65, 99, 100, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "Southern Hemisphere",
          data: data.shs,
          fill: false,
          backgroundColor: "rgba(0, 96, 255, 0.9)",
          borderColor: "rgba(0,0,255,0.45)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value, index, values) {
              return `${value}°`;
            },
          },
        },
      },
    },
  });
}

createChart();

async function getData() {
  const res = await fetch("res/data/ZonAnn.Ts+dSST.csv");

  const xs = [];
  const ys = [];
  const nhs = [];
  const shs = [];

  const data = await res.text();

  const table = await data.split("\n");

  table.shift();

  table.forEach((row) => {
    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    const nhem = columns[2];
    const shem = columns[3];

    ys.push(parseFloat(temp) + 14);
    nhs.push(parseFloat(nhem) + 14);
    shs.push(parseFloat(shem) + 14);
  });

  return { xs, ys, nhs, shs };
}
