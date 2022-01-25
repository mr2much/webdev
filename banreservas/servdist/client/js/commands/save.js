async function save({ __id, container, buttons }) {
  data = getContentData(container);

  // should call update on the database
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${API_URL}/${__id}`, options);
  const json = await res.json();

  console.log(`Updated server: ${json}`);

  // after updating, fetchData again
  servers = [];
  const entries = await fetchData();
  servers.push(...entries);

  // display matches again
  displayMatches();

  // disable edit mode
  container.forEach((span) => {
    span.contentEditable = false;
  });

  hideShowButtons(buttons);

  return json;
}
