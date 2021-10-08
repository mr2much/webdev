const URL_Reservas = "https://www.banreservas.com/tubnco-personas";

const { Builder, By, Key, until, Listener } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

require("chromedriver");

const alert = require("alert");
const { SeleniumServer } = require("selenium-webdriver/remote");

(async function example() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .headless()
        .addArguments("--disable-extensions", "--disable-gpu")
    )
    .build();

  try {
    // Navigate to Url
    await driver.get(URL_Reservas);

    // Enter text "cheese" and perform keyboard action "Enter"
    // await driver.findElement(By.name("q")).sendKeys("cheese", Key.RETURN);

    let firstResult = await driver.wait(
      until.elementLocated(By.className("currency-nav")),
      10000
    );

    let lis = await firstResult.findElements(By.css("li > span"));

    let msg = "Tasa correcta";
    for (let li of lis) {
      let tasa = await li.getAttribute("textContent");

      if (tasa === "0.00") {
        msg = "Tasa Inválida";
      }
    }
    alert(msg);
  } catch (e) {
    console.error(e);
  } finally {
    driver.quit();
  }
})();
