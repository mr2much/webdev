const cont = document.querySelector("#container");

showImages();

async function showImages() {
  const imgs = await loadImages();
  for (let i = 0; i < imgs.length; i++) {
    let image = document.createElement("img");
    image.src = URL.createObjectURL(imgs[i]);
    cont.appendChild(insertImage(image));
  }
}

async function loadImages() {
  const imgs = [];

  for (let i = 0; i < 4; i++) {
    const res = await fetch(`res/img/img${i}.jpg`);
    const blob = await res.blob();
    imgs.push(blob);
  }

  return imgs;
}

function insertImage(img) {
  const div = document.createElement("div");
  img.setAttribute("width", 200);

  div.appendChild(img);

  return div;
}
