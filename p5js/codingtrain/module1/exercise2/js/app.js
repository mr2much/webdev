const info = document.querySelector("#info");

readTextFile();

async function readTextFile() {
  const res = await fetch("res/data/r3-html-log.md");
  const text = await await res.text();

  info.textContent = text;
}
