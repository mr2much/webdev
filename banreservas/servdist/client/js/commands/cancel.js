async function cancel({ __id, container, buttons }) {
  const prevValues = await fetchSingleServerData(__id);

  container[0].textContent = prevValues.server;
  container[1].textContent = prevValues.dns;
  container[2].textContent = prevValues.func;
  container[3].textContent = prevValues.ip;
  container[4].textContent = prevValues.os_support;
  container[5].textContent = prevValues.app_support;
  container[6].textContent = prevValues.notes;
  container[7].textContent = prevValues.date_created;
  container[8].textContent = prevValues.last_modified;

  container.forEach((span) => {
    span.contentEditable = false;
  });

  hideShowButtons(buttons);
}
