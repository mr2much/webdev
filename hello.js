const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 625, deviceScaleFactor:2  });
  await page.goto('https://mr2much.github.io/webdev/product/html/index');
  await page.screenshot({path:'example.png'});

  await browser.close();
})();