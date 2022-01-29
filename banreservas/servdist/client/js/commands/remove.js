async function remove({ __id }) {
  const serverToDelete = await fetchSingleServerData(__id);

  let isDelete = confirm(
    `Está seguro de que desea eliminar el servidor ${serverToDelete.server}?`
  );

  if (isDelete) {
    const options = {
      method: "DELETE",
    };

    fetch(`${API_URL}/${__id}`, options);

    window.location = "./";
  }
}
