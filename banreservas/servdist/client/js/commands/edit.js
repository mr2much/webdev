function edit({ container }) {
  container.querySelectorAll(".content span").forEach((span) => {
    span.contentEditable = true;
  });

  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("hidden");
  });
}
