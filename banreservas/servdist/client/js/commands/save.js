async function save({ __id, container }) {
  const data = getContentData(container.querySelectorAll(".content span"));
  data._id = __id;

  // should call update on the database
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(`/${__id}`, options);
  const json = await res.json();

  // after updating, fetchData again
  servers = [];
  await fetchData();

  // display matches again
  displayMatches();

  // disable edit mode
  container.querySelectorAll(".content span").forEach((span) => {
    span.contentEditable = false;
  });

  hideShowButtons(container);

  return json;
}
