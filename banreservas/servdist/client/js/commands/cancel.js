function cancel({ __id, container }) {
  let divContent = container.querySelectorAll(".content span");

  const prevValues = servers.find((server) => server._id === __id);

  divContent[0].textContent = prevValues.server;
  divContent[1].textContent = prevValues.dns;
  divContent[2].textContent = prevValues.function;
  divContent[3].textContent = prevValues.ip;
  divContent[4].textContent = prevValues.os_support;
  divContent[5].textContent = prevValues.app_support;

  divContent.forEach((span) => {
    span.contentEditable = false;
  });

  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("hidden");
  });
}
