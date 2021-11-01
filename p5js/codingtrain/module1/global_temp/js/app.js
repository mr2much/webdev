getData();

async function getData() {
  const res = await fetch("res/data/ZonAnn.Ts+dSST.csv");

  const data = await res.text();

  const table = await data.split(/\r\n/);

  table.forEach((row) => {
    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    const year = columns[0];
    const temp = columns[1];

    console.log(`${year}, ${temp}`);
  });
}
