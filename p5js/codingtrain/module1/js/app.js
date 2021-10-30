let img = document.querySelector("#ritual");

console.log("Loading an image");

fetch("img/img.jpg")
  .then((res) => {
    console.log(res);
    return res.blob();
  })
  .then((blob) => {
    console.log(blob);
    // Right now, the data of the BLOLB is not in a format that the image element recognizes, so we have to use URL.createObjectURL() to convert it
    img.src = URL.createObjectURL(blob);
  })
  .catch((e) => {
    console.log("An error ocurred!");
    console.error(e);
  });
