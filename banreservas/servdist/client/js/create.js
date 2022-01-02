const form = document.querySelector("main form");

form.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();

      document.querySelector("#server").focus();
      return;
    }

    form.classList.add("was-validated");

    const formData = new FormData(form);

    const server = formData.get("server").trim();
    const dns = formData.get("dns").trim();
    const func = formData.get("func").trim();
    const ip = formData.get("ip").trim();
    const os_support = formData.get("os_support").trim();
    const app_support = formData.get("app_support").trim();
    const notes = formData.get("notes").trim();

    const entry = {
      server,
      dns,
      func,
      ip,
      os_support,
      app_support,
      notes,
    };

    createServerEntry(entry)
      .then((result) => {
        if (result.error) {
          throw result.error;
        }

        window.location = "./";
      })
      .catch((error) => {
        return error;
      });
  },
  false
);

async function createServerEntry(server) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(server),
  };

  const res = await fetch(API_URL, options);
  const json = await res.json();

  return json;
}
