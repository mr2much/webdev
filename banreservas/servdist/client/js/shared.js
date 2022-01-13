const API_URL = "http://localhost:3000/api/v1/servers";

async function fetchSingleServerData(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

function getHTMLString(server) {
  const template = document.createElement("template");
  template.innerHTML = `
          <li class="server-entry list-group-item" data-id=${server._id}>
              <div class="card content border-0">
                  <h5 class="card-header"><strong>Servidor: </strong><span class="server">${server.server}</span></h5>
                  <div class="card-body flex-column">                  
                    <p class="card-text"><strong>DNS: </strong><span class="dns">${server.dns}</span></p>
                    <p><strong>Función: </strong><span class="function">${server.func}</span></p>                  
                    <p><strong>IP: </strong><span class="ip">${server.ip}</span></p>
                    <p><strong>Soporte OS (Memoria, Discos, CPU): </strong><span class="os_support">${server.os_support}</span></p>
                    <p><strong>Soporte Aplicación: </strong><span class="app_support">${server.app_support}</span></p>
                    <p><strong>Notas: </strong><span class="notes">${server.notes}</
                    span></p>
                    <p><strong>Fecha de Creación: </strong><span class="date_created">${server.date_created}</
                    span></p>
                    <p><strong>Ultima Modificación: </strong><span class="last_modified">${server.last_modified}</
                    span></p>
                  </div>
              </div>
              <div class="button-group">
                  <button id="save" class="btn btn-outline-success save hidden">Grabar</button>
                  <button id="cancel" class="btn btn-outline-warning cancel hidden">Cancelar</button>
                  <button id="edit" class="btn btn-outline-info edit">Editar</button>
                  <button id="remove" class="btn btn-outline-danger remove">Eliminar</button>
              </div>
          </li>`;

  return template.content.firstElementChild;
}

function hideShowButtons(container) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("hidden");
  });
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
