function cancel({ __id, container, buttons }) {
  // let divContent = container.querySelectorAll(".content span");

  const prevValues = servers.find((server) => server._id === __id);

  container[0].textContent = prevValues.server;
  container[1].textContent = prevValues.dns;
  container[2].textContent = prevValues.function;
  container[3].textContent = prevValues.ip;
  container[4].textContent = prevValues.os_support;
  container[5].textContent = prevValues.app_support;

  // Agregar
  //   Notas:
  //   Fecha de Creación:
  //   Ultima Modificación:

  container.forEach((span) => {
    span.contentEditable = false;
  });

  hideShowButtons(buttons);
}
