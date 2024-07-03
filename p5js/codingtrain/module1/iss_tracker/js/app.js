const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";

// Making map and tiles

const mymap = L.map("issmap", {
  zoomControl: false,
  scrollWheelZoom: false,
}).setView([0, 0], 6);

const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const myIcon = L.icon({
  iconUrl: "res/img/iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

let marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

let firstRun = true;
async function getISS() {
  const res = await fetch(iss_url);
  const data = await res.json();

  const { latitude, longitude, altitude } = data;

  const aspect = 1.5625;
  const w = (altitude * aspect) / 5;
  const h = altitude / 5;

  myIcon.options.iconSize = [w, h];
  myIcon.options.iconAnchor = [w / 2, h / 2];

  marker.setIcon(myIcon);

  const lat = document.querySelector("#lat");
  const lon = document.querySelector("#lon");

  // Set the view the first time this is run
  if (firstRun) {
    mymap.setView([latitude, longitude], mymap.getZoom());
    firstRun = false;
  }

  marker.setLatLng([latitude, longitude]);
  mymap.panTo(marker.getLatLng(), {
    animate: true,
    duration: 1.0,
    easeLinearity: 0.9,
  });

  lat.textContent = latitude.toFixed(2);
  lon.textContent = longitude.toFixed(2);
  document.querySelector("#altitude").textContent = altitude.toFixed(2);
}

getISS();

setInterval(getISS, 1000);
