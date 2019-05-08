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

// Navbar menu background
window.addEventListener("scroll", function() {
  if (window.scrollY > 150) {
    document.querySelector("#navbar").style.opacity = 0.9;
  } else {
    document.querySelector("#navbar").style.opacity = 1;
  }
});

// Smooth scrolling
$("#navbar a, .btn").on("click", function(event) {
  if (this.hash !== "") {
    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});
