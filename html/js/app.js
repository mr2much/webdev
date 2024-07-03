const BASE_URL = 'https://catfact.ninja/facts';
let catFacts = [];

const loadEntries = async () => {
  const res = await axios.get(BASE_URL);
  catFacts = res.data.data.map((info) => info.fact);
};

const showEntries = () => {
  if (catFacts.length > 0) {
    catFacts.forEach((fact) => {
      console.log(fact);
    });
  }
};

const setup = async () => {
  await loadEntries();
  showEntries();
};

setup();
