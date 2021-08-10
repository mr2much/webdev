const url =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

// With Promise.all();

//   We can chain together reading from multiple pages in parallel
(async () => {
  const cities = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(`There was an error reading from URL: ${url}`);
      console.error(err);
    });

  console.log(cities);
})();
