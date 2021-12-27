const searchBar = document.querySelector("#search");
const ulServer = document.querySelector("#matches");

document.querySelector("#clear").addEventListener("click", (e) => {
  e.preventDefault();
  searchBar.value = "";

  displayMatches();
});

ulServer.addEventListener("click", buttonListeners);

const commands = {
  cancel,
  edit,
  remove,
  save,
};

async function buttonListeners(e) {
  if (e.target instanceof HTMLButtonElement) {
    const { className } = e.target;
    const servID = e.target.parentNode.parentNode.id;
    const parentContainer = e.target.parentNode.parentNode;

    const params = {
      __id: servID,
      container: parentContainer,
    };

    const data = await commands[className](params);

    console.log(data);
  }
}

function getContentData(entries) {
  const server = {
    server: entries[0].textContent,
    dns: entries[1].textContent,
    function: entries[2].textContent,
    ip: entries[3].textContent,
    os_support: entries[4].textContent,
    app_support: entries[5].textContent,
  };

  return server;
}

let servers = [];

(async function () {
  await fetchData();

  displayMatches();
})();

async function fetchData() {
  console.log("Data fetched");

  const res = await fetch("/api");
  const json = await res.json();

  servers.push(...json);
}

searchBar.addEventListener("keyup", displayMatches);

function getHTMLString(server) {
  const template = document.createElement("template");
  template.innerHTML = `
        <li class="server-entry" id=${server._id}>
            <div class="content">
                <p><strong>Servidor: </strong><span class="server">${server.server}</span></p>
                <p><strong>DNS: </strong><span class="dns">${server.dns}</span></p>
                <p><strong>Función: </strong><span class="function">${server.function}</span></p>
                <p><strong>IP: </strong><span class="ip">${server.ip}</span></p>
                <p><strong>Soporte OS (Memoria, Discos, CPU): </strong><span class="os_support">${server.os_support}</span></p>
                <p><strong>Soporte Aplicación: </strong><span class="app_support">${server.app_support}</span></p>
            </div>
            <div>
                <button class="save hidden">Grabar</button>
                <button class="cancel hidden">Cancelar</button>
                <button class="edit">Editar</button>
                <button class="remove">Eliminar</button>
            </div>
        </li>`;

  return template.content.firstElementChild;
}
