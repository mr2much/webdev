async function loadData() {
  try {
    const url =
      "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

    const res = await fetch(url);
    console.log(`Data read successfully: ${res.ok}`);
    const json = await res.json();

    return json;
  } catch (err) {
    console.log(`Something went wrong reading from URL ${url}`);
    console.error(err);
  }
}

(async () => {
  const data = await loadData();

  console.log(data[0]);
})();
