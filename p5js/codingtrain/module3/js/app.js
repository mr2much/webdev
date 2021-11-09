const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";

// Making map and tiles

const mymap = L.map("issmap").setView([0, 0], 1);
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

const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

async function getISS() {
  const res = await fetch(iss_url);
  const data = await res.json();

  const { latitude, longitude } = data;

  const lat = document.querySelector("#lat");
  const lon = document.querySelector("#lon");

  //   L.marker([latitude, longitude]).addTo(mymap);
  marker.setLatLng([latitude, longitude]);

  lat.textContent = latitude;
  lon.textContent = longitude;
}

getISS();
