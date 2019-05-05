// Initializes and adds the map
function initMap() {
  // My location
  const loc = { lat: 18.50962, lng: -69.84365 };

  // Centered map on location
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 14,
    center: loc
  });

  // The marker, positioned at location
  const marker = new google.maps.Marker({ position: loc, map: map });
}
