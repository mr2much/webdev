getData();

async function getData( ) {
  const res = await fetch("res/data/ReporteATM30-10-2021.csv");
  const data = await res.text();  
  
  const table = await data.split(/\r\n/).slice(3);  

  const headers = table.shift().split(",");  
  
  let columns;

  table.map(rows => {
    columns =  rows.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  });

  for (let i = 0; i < headers.length; i++){
    console.log(`${headers[i]}: ${columns[i]}`);
  }
}