const details = document.querySelector("details");

const summ = details.querySelector("summary");
const content = details.querySelector(".inner");

summ.addEventListener("click", function (e) {
  e.preventDefault();
  if ("open" in details.dataset) {
    delete details.dataset.open;
  } else {
    details.dataset.open = "open";
    details.open = true;
  }

  content.ontransitionend = (e) => {
    if (!("open" in details.dataset)) {
      details.open = false;
    }
  };
});
