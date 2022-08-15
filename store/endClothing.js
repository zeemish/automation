const puppeteerStealth = require("puppeteer-extra-plugin-stealth")();
const proxyChain = require("proxy-chain");
// const puppeteer = require("puppeteer");

const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const proxyStatus =
  "usa.resi.pookyyproxies.com:13763:Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR";
// console.log("---------------------------", Object.values(myProxies)[0]);
let proxy = proxyStatus.split(":")[0];
const username = "Z9i4hjzr";
const password =
  "WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR";

module.exports = {
  async endClothing(data) {
    console.log("endClothing STORE");
    const origURL = `http://Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR@usa.resi.pookyyproxies.com:13763`;
    const newProxyUrl = await proxyChain.anonymizeProxy(origURL);
    console.log("endClothing data===>", data);
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          `--proxy-server=${newProxyUrl}`,
          // proxyStatus.proxy
        ],
      });

      const page = await browser.newPage();
      await page.authenticate({
        username,
        password,
      });

      await page.goto(data.product, {
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
        // waitUntil: 'load',
        timeout: 0,
      });
      await page.waitForTimeout(5000);
      await page.evaluate((eval) => {
        const len = document.getElementsByClassName("sc-1rwf8s7-2").length;
        const dataVal = document.getElementsByClassName("sc-1rwf8s7-2");
        for (let i = 0; i < len; i++) {
          if (dataVal[i].innerHTML.toLowerCase() === eval) {
            // dataVal[i].click();
            dataVal[i].click();
          }
        }
      }, data.sizes);

      await page.waitForTimeout(8000);

      await page.evaluate(() => {
        document.getElementsByClassName("sc-s21dev-0")[0].click();
      });

      await page.waitForTimeout(10000);

      await page.evaluate(() => {
        document
          .getElementsByClassName("sc-e4qf6g-0 gHSMnT sc-1cmi17a-3 fhXNsy")[0]
          .click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((evalEmail) => {
        document.getElementById("email").value = evalEmail;
      }, data.profile.email);

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("sc-s21dev-0 cSYZDz")[2].click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((name) => {
        document.getElementsByClassName("sc-jIAOiI")[0].value = name;
      }, data.profile.name);

      await page.waitForTimeout(2000);

      await page.evaluate((lName) => {
        document.getElementsByClassName("sc-jIAOiI")[1].value = lName;
      }, data.profile.lastname);

      await page.waitForTimeout(2000);

      await page.evaluate((evalNum) => {
        document.getElementsByClassName("sc-jIAOiI")[2].value = evalNum;
      }, data.profile.phone);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("sc-fXynhf JxpBJ")[0].selectedIndex = 1;
      });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("cOXklu")[0];
      });
      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("cjnwjp")[1].value = eval;
      }, data.profile.address);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("gprsly")[2].value = eval;
      }, data.profile.address_2);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("gprsly")[3].value = eval;
      }, data.profile.city);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("gprsly")[4].value = eval;
      }, data.profile.zip);

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName(
          "sc-fXynhf hPmQPE"
        )[0].selectedIndex = 19;
      });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("fVcIbn")[1].click();
      });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("iXahLV")[0].click();
      });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("sc-cUEIKg iXahLV")[0].click();
      });

      await page.waitForTimeout(5000);

      console.log("waiting for iframe with form to be ready.");
      await page.waitForSelector("iframe");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const elementHandle = await page.$(
        'iframe[src="https://assets.braintreegateway.com/web/3.85.3/html/hosted-fields-frame.min.html#ab011877-1b8b-4f65-b3d7-143f34f13d81"]'
      );
      const frame = await elementHandle.contentFrame();

      console.log("filling form in iframe");
      await frame.type("#credit-card-number", "Bob", { delay: 100 });
    } catch (error) {
      console.log("endClothingERROR===>", error);
    }
  },
};
