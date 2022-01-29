const searchBar = document.querySelector("#search");
const ulServer = document.querySelector("#matches");

const commands = {
  cancel,
  edit,
  remove,
  save,
};

let servers = [];

(async function () {
  const entries = await getServers();
  servers.push(...entries);
  displayMatches();
})();

function getServers() {
  return fetchData();
}

async function fetchData() {
  const res = await fetch(API_URL);
  return await res.json();
}

document.querySelector("#clear").addEventListener("click", (e) => {
  e.preventDefault();
  searchBar.value = "";

  displayMatches();
});

ulServer.addEventListener("click", buttonListeners);

async function buttonListeners(e) {
  if (e.target instanceof HTMLButtonElement) {
    const { id } = e.target;
    const servID = e.target.parentNode.parentNode.getAttribute("data-id");
    const parentContainer = e.target.parentNode.parentNode;
    const buttonContainer = parentContainer.querySelector(".button-group");
    const cardData = parentContainer.querySelectorAll(".content span");

    const params = {
      __id: servID,
      container: cardData,
      buttons: buttonContainer,
    };

    const data = await commands[id](params);

    console.log(data);
  }
}

searchBar.addEventListener("keyup", displayMatches);

function displayMatches() {
  const value = searchBar.value;
  const matchArray = findMatches(value, servers);

  ulServer.replaceChildren();

  matchArray.map((server) => {
    const html = getHTMLString(server);

    ulServer.appendChild(html);
  });
}

function findMatches(searchTerm, servers) {
  return servers.filter((server) => {
    const regex = new RegExp(searchTerm, "gi"); // g means globally, and i means that it's case insensitive

    return server.server.match(regex);
  });
}
