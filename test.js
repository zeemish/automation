const puppeteerStealth = require("puppeteer-extra-plugin-stealth")();

// const puppeteer = require("puppeteer");

const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

module.exports = {
  async nakedStore(data) {
    console.log("Naked STORE");

    console.log("NakedData===>", data);
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
      await page.waitForTimeout(1000);
      await page.evaluate(() => {
        document.getElementsByClassName("coi-banner__accept")[0].click();
      });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("dropdown-toggle")[0].click();
      });
      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        const dropdown = document.getElementsByClassName("dropdown-item");
        for (let i = 0; i < dropdown.length; i++) {
          if (dropdown[i].innerText == eval) {
            dropdown[i].click();
          }
        }
      }, data.sizes);
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("product-form-submit")[0].click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("btn-primary")[4].click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("custom-select")[0].value = "US";
      });

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("custom-select")[2].value = 466;
      });

      await page.waitForTimeout(2000);

      await page.evaluate((evalEmail) => {
        document.getElementsByClassName("form-control")[1].value = evalEmail;
      }, data.profile.email);

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementsByClassName("continue-btn")[0].click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[3].value = eval;
      }, data.profile.name);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[4].value = eval;
      }, data.profile.lastname);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[5].value = eval;
      }, data.profile.address);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[6].value = eval;
      }, data.profile.address_2);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[7].value = eval;
      }, data.profile.zip);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[8].value = eval;
      }, data.profile.city);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("form-control")[9].value = eval;
      }, data.profile.phone);

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document
          .getElementsByClassName("continue-btn--finalize-step")[0]
          .click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document
          .getElementsByClassName("continue-btn--finalize-step")[1]
          .click();
      });

      await page.waitForTimeout(5000);

      console.log("waiting for iframe with card to be ready.");
      await page.waitForSelector(".js-iframe");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const cardNumber = await page.$(
        'iframe[src="https://checkoutshopper-live.adyen.com/checkoutshopper/securedfields/live_T3APBLIRINA6VPQU7A2BMIS2IQXMTV5K/3.3.1/securedFields.html?type=card&d=aHR0cHM6Ly93d3cubmFrZWRjcGguY29t"]'
      );
      // await page.waitForSelector('#CheckoutData_BillingFirstName')
      const frame = await cardNumber.contentFrame();
      console.log("filling form in iframe");
      await frame.type("#encryptedCardNumber", data.profile.card_no, {
        delay: 100,
      });

      const expiryDate = data.profile.expire;
      const expirtDteSplit = expiryDate.split("/");
      const month = expirtDteSplit[0];
      const year = expirtDteSplit[1].substring(2, 4);
      const monthYear = `${month}${year}`;

      console.log("waiting for iframe with expiry month to be ready.");
      // await page.waitForSelector(".js-iframe[1]");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')

      const frames = await page.frames();
      const myframe = frames.find((f) =>
        f
          .url()
          .indexOf(
            'iframe[src="https://checkoutshopper-live.adyen.com/checkoutshopper/securedfields/live_T3APBLIRINA6VPQU7A2BMIS2IQXMTV5K/3.3.1/securedFields.html?type=card&d=aHR0cHM6Ly93d3cubmFrZWRjcGguY29t"]'
          )
      );
      const expMonth = await myframe.$("encryptedExpiryMonth");
      await myframe.type("#encryptedExpiryMonth", month, { delay: 100 });

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document
          .getElementsByClassName("custom-control custom-checkbox mb-4")[1]
          .click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((eval) => {
        document.getElementsByClassName("checkout-btn")[0].click();
      });

      await page.waitForTimeout(5000);
    } catch (error) {
      console.log("NakedERROR===>", error);
    }
  },
};
