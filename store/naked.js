const puppeteerStealth = require("puppeteer-extra-plugin-stealth")();
const fetch = require("node-fetch");
const fs = require("fs");
// const puppeteer = require("puppeteer");
const myProxies = require("../proxies/proxies");
const proxyChain = require("proxy-chain");

const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const proxyStatus =
  "usa.resi.pookyyproxies.com:6122:Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-8UMxpxmZ5p";
// console.log("---------------------------", Object.values(myProxies)[0]);
let proxy = proxyStatus.split(":")[0];
const username = proxyStatus.split(":")[2];
const password = proxyStatus.split(":")[3];

console.log("proxyStatus====>", username);
console.log("proxyStatus====>", password);
proxy = proxy + ":7777";
console.log("proxyStatus====>", proxy);

module.exports = {
  async naked(data) {
    console.log("Naked STORE");

    console.log("NakedData===>", data);
    try {
      // const oldProxyUrl = "pr.oxylabs.io:7777:test4971:Testing@321??";
      // const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

      // ------------ PROXIES ERROR BAD GATEWAY
      const username = "Z9i4hjzr";
      const password =
        "WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw";
      const proxy = "pr.oxylabs.io:7777";
      const proxies =
        "gbr.resi.pookyyproxies.com:7370:Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw";
      const originalUrl = `http://${username}:${password}@${proxy}`;
      const newProxyUrl = await proxyChain.anonymizeProxy(originalUrl);

      const origURL = `http://Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw@gbr.resi.pookyyproxies.com:7370`;

      // Return anonymized version of original URL - looks like http://127.0.0.1:45678
      const newUrl = await proxyChain.anonymizeProxy(origURL);

      var browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
          // `--proxy-server=${proxy}`,
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // `--proxy-server=${proxyStatus}`,
          // `--proxy-server=http://pr.oxylabs.io:7777`,
          // `--proxy-server=${newProxyUrl}`,
          `--proxy-server=${newUrl}`,
        ],
      });

      var page = await browser.newPage();
      await page.authenticate({
        username,
        password,
      });
      await page.goto(data.product, {
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
        // waitUntil: 'load',
        timeout: 0,
      });

      function updateTasks(taskid, task_status, status) {
        var myHeadersStore = new fetch.Headers();
        myHeadersStore.append(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        myHeadersStore.append(
          "Cookie",
          "XSRF-TOKEN=eyJpdiI6IkRFSWVSOXRwL2dFdGQ4OWFlN3l0SFE9PSIsInZhbHVlIjoiM2crSGgrTjZMOVBCWkk2aGpqMGRBbmsvaEtuMThuc280S0lMSDQzcWdHcU1xVXM3VGlKMTZMay95VkRGUm5WaHh4NjdGNXQ2OU40c01XaTJKYVgzTjFpMHYyVXFWcHhkUUFyL1pjZGV5Uy9uL2ViSm9LM1lnNkplWEtaVjd4cUoiLCJtYWMiOiJkYmYyNDNmNGQ0ZGVlZjUxZDcwMWRlYTdkZjkyYjhiYjkwYWIxMDcwMGIyMDhjMTU0YzkyMDQzODYzNjM5NjhiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFvU01KVUpCWkFybmoxdFFPNXlsNEE9PSIsInZhbHVlIjoiTDZDdHA3NDM5SHZqUVpSUTF2b3J0MmRSNkhDYjlQdk0zWlBqSWZZVkZMNmNyTHpNZFdsY2lDVWtsK0lLT0FORU1OSjZaYy9PSGozeXFwZEJjSDNHNTJ2NFJpMXQwZjJteWNWOGlMMUZ6R3VMU2RVSTlYOFg5bElJV2crK21sS1IiLCJtYWMiOiI3YTRiYWFjZjQwM2IzNjQ3MjE0ODdkMTMyZTAyNTIwZDU5N2FjOTk5MWYzZGFiODEyNTA1NzU4OTVkYjU5YjE2IiwidGFnIjoiIn0%3D"
        );
        var urlencodedstore = new URLSearchParams();
        urlencodedstore.append("task_status", task_status);
        urlencodedstore.append("status", status);
        var requestOptions = {
          method: "PATCH",
          headers: myHeadersStore,
          body: urlencodedstore,
          redirect: "follow",
        };
        fetch(
          "https://jesse.oreostudios.com/api/v1/tasks/" + taskid,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
      updateTasks(data.id, "selecting size...", "product page");

      await page.waitForTimeout(8000);
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

      await page.waitForTimeout(5000);

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

      updateTasks(data.id, "filling form...", "user data page");

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
      updateTasks(data.id, "filling card data", "checkout page");
      // #######################################
      console.log("############## CARD NUM ###############");
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
      const expirtDateSplit = expiryDate.split("/");
      const month = expirtDateSplit[0];
      const year = expirtDateSplit[1].substring(2, 4);
      const monthYear = `${month}${year}`;

      // #######################################
      console.log("############## EXPIRY MONTH ###############");
      console.log("waiting for iframe with expiry month to be ready.");
      // await page.waitForSelector(".js-iframe[1]");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const expMonth = await page.$(
        'iframe[title="Iframe for secured card expiry month"]'
      );
      const frame2 = await expMonth.contentFrame();
      await frame2.waitForSelector("#encryptedExpiryMonth");
      await frame2.type("#encryptedExpiryMonth", month, { delay: 100 });

      // #######################################
      console.log("############## EXPIRY YEAR ###############");
      console.log("waiting for iframe with expiry Year to be ready.");
      // await page.waitForSelector(".js-iframe[1]");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const expYear = await page.$(
        'iframe[title="Iframe for secured card expiry year"]'
      );
      const frame3 = await expYear.contentFrame();
      await frame3.waitForSelector("#encryptedExpiryYear");
      await frame3.type("#encryptedExpiryYear", year, { delay: 100 });

      // #######################################
      console.log("############## CVC ###############");
      console.log("waiting for iframe with cvc to be ready.");
      // await page.waitForSelector(".js-iframe[1]");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const cvc = await page.$(
        'iframe[title="Iframe for secured card security code"]'
      );
      const frame4 = await cvc.contentFrame();
      await frame4.waitForSelector("#encryptedSecurityCode");
      await frame4.type("#encryptedSecurityCode", data.profile.cvv, {
        delay: 100,
      });
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

      updateTasks(data.id, "Completed", "checkout page");

      await page.waitForTimeout(2000);
    } catch (error) {
      console.log("error =====>", error);
      console.log("error occur");
      console.log("data ==>", data);
      const browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // dataVal[1]
        ],
      });
      updateTasks(data.id, "task cancel", "product page");
      const path = `${data.profile.card_owner_name}-${Math.floor(
        Math.random() * 100
      )}.png`;
      await page.screenshot({
        path: path,
      });
      // console.log('taking screen shot of ', data.profile.card_owner_name)
      await page.waitForTimeout(5000);
      console.log("base 64 before");
      const contents = fs.readFileSync(path, {
        encoding: "base64",
      });
      // console.log('base 64 after',  `data:image/png;base64,${contents}`);
      var myHeadersStore = new fetch.Headers();
      myHeadersStore.append(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      myHeadersStore.append(
        "Cookie",
        "XSRF-TOKEN=eyJpdiI6IkRFSWVSOXRwL2dFdGQ4OWFlN3l0SFE9PSIsInZhbHVlIjoiM2crSGgrTjZMOVBCWkk2aGpqMGRBbmsvaEtuMThuc280S0lMSDQzcWdHcU1xVXM3VGlKMTZMay95VkRGUm5WaHh4NjdGNXQ2OU40c01XaTJKYVgzTjFpMHYyVXFWcHhkUUFyL1pjZGV5Uy9uL2ViSm9LM1lnNkplWEtaVjd4cUoiLCJtYWMiOiJkYmYyNDNmNGQ0ZGVlZjUxZDcwMWRlYTdkZjkyYjhiYjkwYWIxMDcwMGIyMDhjMTU0YzkyMDQzODYzNjM5NjhiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFvU01KVUpCWkFybmoxdFFPNXlsNEE9PSIsInZhbHVlIjoiTDZDdHA3NDM5SHZqUVpSUTF2b3J0MmRSNkhDYjlQdk0zWlBqSWZZVkZMNmNyTHpNZFdsY2lDVWtsK0lLT0FORU1OSjZaYy9PSGozeXFwZEJjSDNHNTJ2NFJpMXQwZjJteWNWOGlMMUZ6R3VMU2RVSTlYOFg5bElJV2crK21sS1IiLCJtYWMiOiI3YTRiYWFjZjQwM2IzNjQ3MjE0ODdkMTMyZTAyNTIwZDU5N2FjOTk5MWYzZGFiODEyNTA1NzU4OTVkYjU5YjE2IiwidGFnIjoiIn0%3D"
      );
      var urlencodedstore = new URLSearchParams();
      urlencodedstore.append("user_id", data.user_id);
      urlencodedstore.append("product_name", data.product_name);
      urlencodedstore.append("product_price", "100");
      urlencodedstore.append("product_qty", data.quantity);
      urlencodedstore.append("product_description", "order failed");
      urlencodedstore.append("task_id", data.id);
      urlencodedstore.append("order_id", "132");
      urlencodedstore.append(
        "order_image",
        `data:image/png;base64,${contents}`
      );
      // urlencodedstore.append("order_id",localStorage.getItem('order_item'));
      var requestOptions = {
        method: "POST",
        headers: myHeadersStore,
        body: urlencodedstore,
        redirect: "follow",
      };
      fetch("http://jesse.oreostudios.com/api/v1/orders", requestOptions)
        .then((response) => response.text())
        .then(
          (result) => {}
          // console.log(result)
        )
        .catch((error) => console.log("error", error));
    }
    await browser.close();
  },
};
