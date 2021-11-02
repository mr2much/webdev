retrieveData();

async function retrieveData() {
  const res = await fetch("res/data/temp_data_atm.csv");
  const text = await res.text();
  const data = await text.split("\r\n");

  const reportDate = await extractReporteDate(data[2]);
  const categories = await extractCategories(data[3]);
  const cajeros = data.slice(4);
  const atms = await extractAtms(cajeros, categories);

  const report = {
    day: reportDate.day,
    month: reportDate.month,
    year: reportDate.year,
    atms: atms,
    total: atms.length,
  };

  console.log(report);
}

async function extractReporteDate(data) {
  const temp = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  const fullDate = temp[0].trim().split(" ");

  return { day: fullDate[0], month: fullDate[1], year: fullDate[2] };
}

async function extractCategories(data) {
  const temp = data.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  const categories = {};

  for (let i = 0; i < temp.length; i++) {
    categories[i] = temp[i].toLowerCase();
  }

  return categories;
}

async function extractAtms(atms, categories) {
  let cajeros = [];

  for (let i = 0; i < atms.length; i++) {
    let temp = atms[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let tempReport = {};

    for (let j = 0; j < temp.length; j++) {
      tempReport[`${categories[j]}`] = temp[j];
    }

    cajeros.push(tempReport);
  }

  return cajeros;
}
