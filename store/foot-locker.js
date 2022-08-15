const puppeteerStealth = require("puppeteer-extra-plugin-stealth")();

// const puppeteer = require("puppeteer");

const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

module.exports = {
  async footLockerStore(data) {
    console.log("FootLocker  STORE");

    console.log("FootLocker data===>", data);
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // proxyStatus.proxy
        ],
      });

      const page = await browser.newPage();

      await page.goto(data.product, {
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
        // waitUntil: 'load',
        timeout: 0,
      });

      await page.waitForTimeout(5000);
      await page.evaluate(() => {
        document.getElementsByClassName("geetest_radar_tip")[0].click();
      });

      await page.waitForTimeout(5000);
      await page.evaluate(() => {
        document.getElementById(
          "ProductDetails_select_sizeChart"
        ).selectedIndex = 1;
      });

      await page.waitForTimeout(5000);
      await page.evaluate(() => {
        document.getElementsByClassName(
          "c-form-field c-form-field--radio ProductSize ProductSize--europe"
        )[1].innerHTML.value = 6.5;
      });
    } catch (error) {
      console.log("FootLocker ERROR===>", error);
    }
  },
};
