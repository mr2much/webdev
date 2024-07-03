const catFactList = document.querySelector('#cat-fact-list');
const catFactContainer = document.querySelector('#container-cat-facts');

const BASE_URL = 'https://catfact.ninja/facts';
let catFacts = [];

const loadEntries = async () => {
  const res = await axios.get(BASE_URL);
  catFacts = res.data.data.map((info) => info.fact);
};

{
  /* <li
                data-target="#carouselCatFacts"
                data-slide-to="0"
                class="active"
              ></li> */
}
const showEntries = () => {
  if (catFacts.length > 0) {
    for (let i = 0; i < catFacts.length; i++) {
      const newIndicatorLI = document.createElement('li');
      newIndicatorLI.setAttribute('data-target', '#carouselCatFacts');
      newIndicatorLI.setAttribute('data-slide-to', `${i}`);
    }
    // catFacts.forEach((fact) => {
    //   console.log(fact);
    // });
  }
};

const setup = async () => {
  await loadEntries();
  showEntries();
};

setup();
