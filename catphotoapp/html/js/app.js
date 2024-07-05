const catFactContainer = document.querySelector('#container-cat-facts');

const BASE_URL = 'https://catfact.ninja/facts';
let catFacts = [];

const loadEntries = async () => {
  const res = await axios.get(BASE_URL);
  catFacts = res.data.data.map((info) => info.fact);
};

const showEntries = () => {
  if (catFacts.length > 0) {
    for (let i = 0; i < catFacts.length; i++) {
      const newDiv = document.createElement('div');

      newDiv.classList.add('carousel-item');

      if (i === 0) {
        newDiv.classList.add('active');
      }

      newDiv.innerHTML = `
        <div class="carousel-caption d-none d-md-block">
            <p>
              ${catFacts[i]}
            </p>
        </div>
      `;

      catFactContainer.append(newDiv);
    }
  }
};

const setup = async () => {
  await loadEntries();
  showEntries();
};

setup();
