async function showReport() {
  const report = await retrieveData();

  showDuplicates(report);

  console.log(report);
}

async function showDuplicates(report) {
  const reportMap = new Map();
  const atms = report.atms;

  for (let i = 0; i < atms.length; i++) {
    if (reportMap.has(atms[i].atm)) {
      const dup = reportMap.get(atms[i].atm);
      let msg = document.createElement("p");
      msg.textContent = JSON.stringify(dup);

      let p = document.createElement("p");
      p.textContent = JSON.stringify(atms[i]);

      document.body.append(msg, p);
    } else {
      reportMap.set(atms[i].atm, atms[i]);
    }
  }
}

showReport();

async function retrieveData() {
  // const res = await fetch("res/data/temp_data_atm.csv");
  // const res = await fetch("res/data/ReporteATM30-10-2021.csv");
  const res = await fetch("res/data/ReporteATM04-09-2021.csv");
  const text = await res.text();
  const data = text.split("\r\n");

  const reportDate = await extractReporteDate(data[2]);
  const categories = await extractCategories(data[3]);
  const cajeros = data.slice(4);
  const atms = await extractAtms(cajeros, categories);

  const report = {
    day: reportDate.day,
    month: reportDate.month,
    year: reportDate.year,
    atms: atms,
    count: atms.length,
  };

  const total = await getTotalAtms(report);

  report.total = total;

  return report;
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

  // this part extracts the atms
  for (let i = 0; i < atms.length; i++) {
    let temp = atms[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    let tempReport = {};

    // this part matches the categories with their respective values from the temp variable after splitting the values in atms
    for (let j = 0; j < temp.length; j++) {
      tempReport[`${categories[j]}`] = temp[j];
    }

    const dateTime = await getDateTime(tempReport);

    const { fecha, hora = "0:00" } = dateTime;

    // TODO: Look for simpler way of doing this
    tempReport.fecha = fecha;
    tempReport.hora = hora;

    cajeros.push(tempReport);
  }

  return cajeros;
}

async function getDateTime({ fecha }) {
  const fullDate = fecha.split(" ");
  let date = fullDate[0];
  let hora = fullDate[1].split(":")[0];

  hora = `${hora}:00`;

  return { fecha: date, hora };
}

// Returns the number of unique atms
// TODO: Find better solution
async function getTotalAtms({ atms }) {
  const atmMap = new Map();

  for (let atm of atms) {
    atmMap.set(atm.atm, atm);
  }

  return atmMap.size;
}
