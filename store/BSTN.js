const puppeteer = require("puppeteer-extra");
const fetch = require("node-fetch");
const fs = require("fs");
const proxyChain = require("proxy-chain");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const myPRoxy =
  "gbr.resi.pookyyproxies.com:7370:Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw";
puppeteer.use(StealthPlugin());
const username = "Z9i4hjzr";
const password =
  "WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw";
const proxy = "pr.oxylabs.io:7777";
module.exports = {
  async BSTNStore(data) {
    console.log("BSTN STORE");
    const origURL = `http://Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-q7o5xVoPvw@gbr.resi.pookyyproxies.com:7370`;

    // Return anonymized version of original URL - looks like http://127.0.0.1:45678
    const newUrl = await proxyChain.anonymizeProxy(origURL);
    console.log("BSTNdata===>", data);
    try {
      var browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          `--proxy-server=${newUrl}`,
        ],
      });

      var page = await browser.newPage();
      await page.authenticate({
        username,
        password,
      });
      await page.waitForTimeout(8000);

      // const location  = "https://bot.sannysoft.com/"

      await page.goto(data.product, {
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
        // waitUntil: 'load',
        timeout: 0,
      });
      await page.waitForTimeout(8000);

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
      // await page.waitForTimeout(8000);

      updateTasks(data.id, "selecting size...", "product page");

      await page.waitForTimeout(2000);

      //   var dataSizes = data.sizes;
      await page.evaluate((dataEval) => {
        const productLength = document.getElementsByClassName("text").length;
        const productLengthData = document.getElementsByClassName("text");
        for (let i = 0; i < productLength; i++) {
          if (productLengthData[i].innerHTML == dataEval) {
            productLengthData[i].click();
          }
        }
      }, data.sizes);

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.getElementById("product-addtocart-button").click();
      });

      updateTasks(data.id, "Checkout Process...", "checkout page");
      await page.waitForTimeout(10000);

      await page.evaluate(() => {
        document.getElementsByClassName("cf2Lf6")[0].click();
      });
      await page.waitForTimeout(10000);

      await page.evaluate(() => {
        document
          .getElementsByClassName(
            "action checkout button button--filled--secondary"
          )[0]
          .click();
      });
      updateTasks(data.id, "Filling Form...", "checkout page");

      await page.waitForTimeout(15000);

      await page.evaluate((evalEmail) => {
        document.getElementsByClassName("input-text")[2].value = evalEmail;
        // document.getElementById("customer-email").value = evalEmail;
      }, data.profile.email);
      await page.waitForTimeout(11000);

      await page.evaluate(() => {
        document.getElementsByClassName("admin__field-label")[2].click();
      });

      await page.waitForTimeout(2000);

      await page.evaluate((evalName) => {
        document.getElementsByClassName("admin__control-text")[0].value =
          evalName;
        // await page.keyboard.type(".input-field", data.profile.name, { delay: 100 });
      }, data.profile.name);

      await page.waitForTimeout(2000);

      await page.evaluate((evalLastName) => {
        document.getElementsByClassName("admin__control-text")[1].value =
          evalLastName;
      }, data.profile.lastname);

      await page.waitForTimeout(2000);
      await page.evaluate((evalStreet) => {
        document.getElementsByClassName("admin__control-text")[2].value =
          evalStreet;
      }, data.profile.address);

      const addressSpilt = data.profile.address;

      const splitData = addressSpilt.split(" ");

      await page.waitForTimeout(2000);
      await page.evaluate((evalHome) => {
        document.getElementsByClassName("admin__control-text")[3].value =
          evalHome;
      }, splitData[0]);

      await page.waitForTimeout(2000);
      await page.evaluate((evalZip) => {
        document.getElementsByClassName("admin__control-text")[6].value =
          evalZip;
      }, data.profile.zip);

      await page.waitForTimeout(2000);
      await page.evaluate((evalCity) => {
        document.getElementsByClassName("admin__control-text")[7].value =
          evalCity;
      }, data.profile.city);

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.getElementsByClassName("select")[0].value = "US";
      });

      await page.waitForTimeout(2000);
      await page.evaluate((evalPhoneNumber) => {
        document.getElementsByClassName("admin__control-text")[9].value =
          evalPhoneNumber;
      }, data.profile.phone);

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.getElementsByClassName("radio")[1].click();
      });

      console.log("waiting for iframe with form to be ready.");
      await page.waitForSelector("iframe");
      console.log("iframe is ready. Loading iframe content");

      // const handle = await page.waitForSelector('')

      const elementHandle = await page.$(
        'iframe[src="https://checkoutshopper-live.adyen.com/checkoutshopper/securedfields/live_YCN5QJ4BXJHSTL24DUQMIHO4JQP2XDLK/3.7.1/securedFields.html?type=card&d=aHR0cHM6Ly93d3cuYnN0bi5jb20="]'
      );
      // await page.waitForSelector('#CheckoutData_BillingFirstName')

      const frame = await elementHandle.contentFrame();

      console.log("filling form in iframe");
      // await page.evaluate((evalPhoneNumber) => {
      //   document.getElementsByClassName('input-field')[0].value = evalPhoneNumber;
      // },data.profile.card_no);

      const expiryDateSplit = data.profile.expire.split("/");
      const expiryMonth = expiryDateSplit[0];
      const expiryYear = expiryDateSplit[1].substring(2, 4);
      await page.waitForSelector("iframe");
      await frame.type(".input-field", data.profile.card_no, { delay: 100 });
      await page.waitForTimeout(2000);
      console.log("waiting for iframe with expiry month to be ready.");
      // await page.waitForSelector(".js-iframe[1]");
      console.log("iframe is ready. Loading iframe content");
      // const handle = await page.waitForSelector('')
      const expMonth = await page.$(
        'iframe[title="Iframe for secured card expiry date"]'
      );
      const frame2 = await expMonth.contentFrame();
      await frame2.waitForSelector(".input-field");
      await frame2.type(".input-field", `${expiryMonth}${expiryYear}`, {
        delay: 100,
      });

      await page.waitForTimeout(2000);
      const cvv = await page.$(
        'iframe[title="Iframe for secured card security code"]'
      );
      const frame3 = await cvv.contentFrame();
      await frame3.waitForSelector(".input-field");
      await frame3.type(".input-field", data.profile.cvv, { delay: 100 });

      await page.waitForTimeout(2000);
      await page.evaluate((evalCardName) => {
        const div = document.getElementsByClassName(
          "adyen-checkout__input-wrapper"
        )[3];
        div.click();
        // div.getElementsByTagName("input")[0].value = evalCardName;
      }, data.profile.card_owner_name);

      await page.waitForTimeout(2000);
      await page.evaluate((evalCardName) => {
        const div = document.getElementsByClassName(
          "adyen-checkout__input-wrapper"
        )[3];
        // div.click();
        div.getElementsByTagName("input")[0].value = evalCardName;
      }, data.profile.card_owner_name);

      await page.waitForTimeout(2000);
      const cvv2 = await page.$(
        'iframe[title="Iframe for secured card security code"]'
      );
      const frame4 = await cvv2.contentFrame();
      await frame4.waitForSelector(".input-field");
      await frame4.type(".input-field", data.profile.cvv, { delay: 100 });

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.getElementsByClassName("required-entry")[0].click();
      });

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        const div = document.getElementsByClassName("actions-toolbar")[7];
        document.getElementsByClassName("checkout")[4].click();
      });

      // await page.waitForTimeout(2000);
      // await page.evaluate(() => {
      //   document.getElementsByClassName('checkout')[4].click()
      // },);

      // await page.waitForTimeout(2000);
      // await page.evaluate(() => {
      //   document.getElementsByClassName('checkout')[4].click()
      // },);

      //   await page.waitForTimeout(2000);
      //   await page.evaluate((evalName) => {
      // document.getElementsByClassName('adyen-checkout__card__holderName__input')[0] = evalName
      //   },data.profile.card_owner_name);

      // await page.waitForTimeout(2000);
      // const cardName = await page.$(
      //   'iframe[title="Security code field"]'
      // );
      // const frame4 = await cardName.contentFrame();
      // await frame4.waitForSelector(".input-field");
      // await frame4.type(".input-field", data.profile.cvv, { delay: 100 });
    } catch (err) {
      console.log("BSTNerror =====>", err);
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
      const path = `${data.profile.card_owner_name}-${Math.floor(
        Math.random() * 100
      )}.png`;
      // updateTasks(data.id,'task cancel','product page');
      await page.screenshot({ path: path });
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
      urlencodedstore.append("task_id", "54");
      urlencodedstore.append("order_id", "55");
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

      await browser.close();
    }
  },
};
