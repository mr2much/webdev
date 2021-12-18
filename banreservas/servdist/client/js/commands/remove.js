async function remove({ __id }) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`/${__id}`, options);
  const json = await res.json();

  servers = [];
  await fetchData();
  displayMatches();

  return json;
}
