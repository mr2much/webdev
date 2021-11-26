let img;
let cnv;
let imgInput;
let lat, lon;

function setup() {
  background(0);
  if ("geolocation" in navigator) {
    setupImageCaptureMethod();

    setupLeafletMap();

    const submit = document.querySelector("#submit");

    submit.addEventListener("click", async (e) => {
      const mood = document.querySelector("#mood").value.trim();

      let name;

      if (imgInput) {
        name = imgInput.elt.files[0].name;
      } else {
        // check how to get image name when the image is captured from camera
        name = `${Date.now()}.png`;
      }

      const image = getBase64Image(img);

      image.filename = name;

      const data = { lat, lon, mood, image };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const res = await fetch("/api", options);
      const json = await res.json();

      console.log(json);
    });
  } else {
    console.log("geolocation not available");
  }
}

function setupImageCaptureMethod() {
  let noVideo = true;

  (async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    // check all available devices to see if there is video available
    devices.forEach((device) => {
      if (device.kind === "camera") {
        noVideo = false;
        return;
      }
    });
  })();

  if (noVideo) {
    console.log("No video input found!");

    // TODO: Implement code to setup image uploading

    // Create this basically empty canvas to add the image <input>
    cnv = createCanvas(1, 1);

    // create an input to load local images
    imgInput = createFileInput((file) => {
      if (file.type.includes("image")) {
        img = createImg(file.data, "");
        img.hide();
      } else {
        console.log(
          `Image type: ${file.type} is not a valid image format. Please choose an image file format.`
        );
      }
    });
    imgInput.id("load");

    console.log(cnv);

    const label = document.createElement("label");
    label.setAttribute("for", "load");
    label.textContent = "Pick an image file";

    document.querySelector("main").append(label);
    cnv.parent(imgInput);
  } else {
    // proceed with code to capture images
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);
    video.loadPixels();
    img = video.canvas;
  }
}

function setupLeafletMap() {
  const mymap = displayMap();

  navigator.geolocation.getCurrentPosition((position) => {
    let markerInfo = getMarker(position);

    lat = markerInfo.lat;
    lon = markerInfo.lon;

    mymap.addLayer(markerInfo.marker);
    mymap.setView([lat, lon], mymap.getZoom());

    document.querySelector("#lat").textContent = lat;
    document.querySelector("#lon").textContent = lon;
  });
}

function getMarker(position) {
  let marker;

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  marker = L.marker([lat, lon]);

  return { marker: marker, lat: lat, lon: lon };
}

function displayMap() {
  const mymap = L.map("map").setView([0, 0], 25);

  const attribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  return mymap;
}

function getBase64Image(img, captured) {
  const image = {};

  // convert image data to Base64 Encode
  let data64 = img.elt.src.split(";base64,");

  // from data:image/format, split by :, then take the second argument which should be image/format
  let type = data64[0].split(":")[1];

  // Actual image data
  let imgBase64Data = data64[1];

  let width = img.width;
  let height = img.height;

  if (captured) {
    // check how to optain this data from captured image.
    // Apparently, captured or not, the image when converted to Base64 will practically have the same information. I have to do a few tests to validate this.

    type = type; // type will always be image PNG from captured image
  } else {
    image.type = type;
    image.width = width;
    image.height = height;
    image.image64 = imgBase64Data;
  }

  return image;
}
