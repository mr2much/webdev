showMap();

async function showMap() {
  const map = displayLeafletMap();
  const data = await loadAllEntries();

  showMarkers(map, data);
}

function displayLeafletMap() {
  const map = L.map("world-map").setView([0, 0], 3);

  const attribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(map);

  return map;
}

async function loadAllEntries() {
  const res = await fetch("/api");
  const json = await res.json();

  return json;
}

function showMarkers(map, data) {
  for (let entry of data) {
    let lat = entry.lat;
    let lon = entry.lon;
    let marker;

    entry.path = entry.path.replace("public\\", "");

    if (entry.path) {
      marker = getCustomMarker(entry);
    } else {
      marker = L.marker([lat, lon]);
    }

    addMarkerPopup(marker, entry);

    map.addLayer(marker);
  }
}

function getCustomMarker({ path, lat, lon, width, height }) {
  // Set correct dimensions of the icon, according to the dimensions of the image
  let prefWidth = 48;
  let prefHeight = 48;

  const aspectRatio = height / width;

  if (height > width) {
    prefHeight = 48;
    prefWidth = 24;
  } else if (width > height) {
    prefWidth = 48;
    prefHeight = 24;
  }

  const iconWidth = prefWidth * aspectRatio;
  const iconHeight = prefHeight * aspectRatio;

  // All of this is to set the size of the icon

  const icon = L.icon({
    iconUrl: `${path}`,
    iconSize: [iconWidth, iconHeight],
    iconAnchor: [iconWidth / 2, iconHeight / 2],
  });

  return L.marker([lat, lon], { icon: icon });
}

function addMarkerPopup(marker, entry) {
  let dateString = new Date(entry.timestamp).toLocaleString();
  marker.bindPopup(`<strong>Mood:</strong>${entry.mood}<br />
  <strong>Lat:</strong> ${entry.lat}°, <strong>Lon:</strong> ${entry.lon}°<br />
  <img src="${entry.path}" />
  ${dateString}`);
}
