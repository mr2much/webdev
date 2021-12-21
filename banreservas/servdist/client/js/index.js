const API_URL = "http://localhost:3000/api/v1/servers";

const searchBar = document.querySelector("#search");
const ulServer = document.querySelector("#matches");

const commands = {
  cancel,
  edit,
  remove,
  save,
};

const servers = [];

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
    const servID = e.target.parentNode.parentNode.id;
    const parentContainer = e.target.parentNode.parentNode;

    const params = {
      __id: servID,
      container: parentContainer,
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

// <div class="card">
//   <h5 class="card-header">Featured</h5>
//   <div class="card-body">
//     <h5 class="card-title">Special title treatment</h5>
//     <p class="card-text">
//       With supporting text below as a natural lead-in to additional content.
//     </p>
//     <a href="#" class="btn btn-primary">
//       Go somewhere
//     </a>
//   </div>
// </div>;

function getHTMLString(server) {
  const template = document.createElement("template");
  template.innerHTML = `
        <li class="server-entry list-group-item" id=${server._id}>
            <div class="card content border-0">
                <h5 class="card-header"><strong>Servidor: </strong><span class="server">${server.server}</span></h5>
                <div class="card-body flex-column">                  
                  <p class="card-text"><strong>DNS: </strong><span class="dns">${server.dns}</span></p>
                  <p><strong>Función: </strong><span class="function">${server.function}</span></p>                  
                  <p><strong>IP: </strong><span class="ip">${server.ip}</span></p>
                  <p><strong>Soporte OS (Memoria, Discos, CPU): </strong><span class="os_support">${server.os_support}</span></p>
                  <p><strong>Soporte Aplicación: </strong><span class="app_support">${server.app_support}</span></p>
                </div>
            </div>
            <div class="btn-group" role="group">
                <button id="save" class="btn btn-success save hidden">Grabar</button>
                <button id="cancel" class="btn btn-warning cancel hidden">Cancelar</button>
                <button id="edit" class="btn btn-primary edit">Editar</button>
                <button id="remove" class="btn btn-danger remove">Eliminar</button>
            </div>
        </li>`;

  return template.content.firstElementChild;
}
