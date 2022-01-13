function edit({ container, buttons }) {
  container.forEach((span) => {
    span.contentEditable = true;
  });

  hideShowButtons(buttons);
}
