const img = document.querySelector("#ritual");

console.log("Loading an image");

async function loadImage() {
  const res = await fetch("img/img.jpg");
  const blob = await res.blob();

  // Right now, the data of the BLOLB is not in a format that the image element recognizes, so we have to use URL.createObjectURL() to convert it
  img.src = URL.createObjectURL(blob);
}

loadImage()
  .then((res) => {
    console.log("Image loaded correctly");
  })
  .catch((e) => {
    console.log("An error ocurred!");
    console.error(e);
  });
