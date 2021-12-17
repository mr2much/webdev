const btnAdd = document.querySelector("#agregar");
const serverName = document.querySelector("#server-name");

serverName.addEventListener("keyup", (e) => {
  document.querySelector("#error").textContent = "";
});

btnAdd.addEventListener("click", async (e) => {
  e.preventDefault();

  if (serverName.value !== "") {
    const formData = getFormData();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch("/", options);
    const json = await res.json();

    if (json.success) {
      document.querySelector(
        "#status"
      ).textContent = `Servidor ${json.data.server} fue grabado exitosamente!`;
      console.log("success");
    } else {
      if (json.message === "duplicated") {
        document.querySelector(
          "#status"
        ).textContent = `El servidor ${serverName.value} ya existe en la base de datos`;
      }
    }

    console.log(json);
  } else {
    document.querySelector("#error").textContent =
      "El nombre del servidor no puede estar vacio";

    serverName.focus();
  }
});

function getFormData() {
  const server = serverName.value;
  const dns = document.querySelector("#dns").value;
  const servFunc = document.querySelector("#server-function").value;
  const ip = document.querySelector("#ip").value;
  const osSupp = document.querySelector("#os_support").value;
  const appSupp = document.querySelector("#app_support").value;

  return {
    server,
    dns,
    function: servFunc,
    ip,
    os_support: osSupp,
    app_support: appSupp,
  };
}
