const alert = document.querySelector(".alert");
const alertText = alert.querySelector("#alert-text");
const form = document.querySelector("main form");

form.addEventListener(
  "submit",
  (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      document.querySelector("#server").focus();
    }

    form.classList.add("was-validated");

    const formData = new FormData(form);

    const server = formData.get("server");

    //   if (server.trim() === "") {
    //     alertText.innerHTML = "Debe especificar el nombre del servidor";
    //     alert.classList.toggle("d-none");
    //     document.querySelector("#server").focus();
    //     return;
    //   }
    console.log(server);
  },
  false
);

function validServer(server) {}
