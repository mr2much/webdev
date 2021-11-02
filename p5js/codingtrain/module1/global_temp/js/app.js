const ctx = document.querySelector("#chart").getContext("2d");

async function createChart() {
  const data = await getData();

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            "Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in C° - 1880-present",
          data: data.ys,
          fill: false,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
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

  const data = await res.text();

  const table = await data.split("\n");

  table.shift();

  table.forEach((row) => {
    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
  });

  return { xs, ys };
}
