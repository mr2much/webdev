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

    let server = getContentData(cardData);
    // server.__id = servID;

    // console.log(server);

    // console.log(await fetchSingleServerData(servID));

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

// function getHTMLString(server) {
//   const template = document.createElement("template");
//   template.innerHTML = `
//         <li class="server-entry list-group-item" id=${server._id}>
//             <div class="card content border-0">
//                 <h5 class="card-header"><strong>Servidor: </strong><span class="server">${server.server}</span></h5>
//                 <div class="card-body flex-column">
//                   <p class="card-text"><strong>DNS: </strong><span class="dns">${server.dns}</span></p>
//                   <p><strong>Función: </strong><span class="function">${server.func}</span></p>
//                   <p><strong>IP: </strong><span class="ip">${server.ip}</span></p>
//                   <p><strong>Soporte OS (Memoria, Discos, CPU): </strong><span class="os_support">${server.os_support}</span></p>
//                   <p><strong>Soporte Aplicación: </strong><span class="app_support">${server.app_support}</span></p>
//                   <p><strong>Notas: </strong><span class="notes">${server.notes}</
//                   span></p>
//                   <p><strong>Fecha de Creación: </strong><span class="date_created">${server.date_created}</
//                   span></p>
//                   <p><strong>Ultima Modificación: </strong><span class="last_modified">${server.last_modified}</
//                   span></p>
//                 </div>
//             </div>
//             <div>
//                 <button id="save" class="btn btn-outline-success save hidden">Grabar</button>
//                 <button id="cancel" class="btn btn-outline-warning cancel hidden">Cancelar</button>
//                 <a id="edit" class="btn btn-outline-info edit" href="./${server._id}">Editar</a>
//                 <button id="remove" class="btn btn-outline-danger remove">Eliminar</button>
//             </div>
//         </li>`;

//   return template.content.firstElementChild;
// }
