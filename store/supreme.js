const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const jQuery = require("jquery");
const fs = require("fs");
const myProxies = require("../proxies/proxies");
const proxyChain = require("proxy-chain");

// sup.solar.spaceproxies.com:18766:mPvrvWma:75q5gDLb-AzG6lJovNk
// const proxy = "sup.solar.spaceproxies.com:18766";
// const username = "mPvrvWma";
// const password = "75q5gDLb-AzG6lJovNk";

// usa.solar.spaceproxies.com:5080:sF81i152:QQeqobXO-pBRQMj3RiJ
// const proxy = "sup.solar.spaceproxies.com:18689";
// const username = "sF81i152";
// const password = "QQeqobXO-kjsJOqq3va";

// const proxyStatus = Object.values(myProxies)[0].find(
//   (val) => (val.status = 200)
// );
const proxyStatus =
  "usa.resi.pookyyproxies.com:13763:Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR";
// console.log("---------------------------", Object.values(myProxies)[0]);
let proxy = proxyStatus.split(":")[0];
const username = "Z9i4hjzr";
const password =
  "WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR";

console.log("proxyStatus====>", username);
console.log("proxyStatus====>", password);
proxy = proxy + ":7777";
console.log("proxyStatus====>", proxy);

// const proxyStatus = splitProxy[0].find((val) => (val.status = 200));
// const username = proxyStatus.splitProxy[2];
// const password = proxyStatus.splitProxy[3];
// console.log("proxyStatus====>", proxyStatus);

module.exports = {
  async SupremeStore(data) {
    console.log("Supreme Store");
    // var proxyData = 'us-prime.resdleafproxies.com:7000:z9mzk2vow4guisdkpkzu3o+MXFaeRVP:ljx8wusarw';

    // ------------ PROXIES NOT WORKING WITH THis METHOD
    const username = "test4971";
    const password = "Testing@321??";
    const proxy = "pr.oxylabs.io:7777";

    const origURL = `http://Z9i4hjzr:WobQEr0FvreJqjWpXPQcvZLOjSdIAGGGwhJcJF8dq24TBRNkWymWYie7GGEyDscOZpk2U-Pwu8rNiRPR@usa.resi.pookyyproxies.com:13763`;
    const newProxyUrl = await proxyChain.anonymizeProxy(origURL);

    try {
      var browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          // `--proxy-server=${proxyStatus}`,
          `--proxy-server=${newProxyUrl}`,
          // `--proxy-server=pr.oxylabs.io:7777`,
          // dataVal[1]
          // "us-prime.resdleafproxies.com:7000:z9mzk2vow4guisdkpkzu3o+JaptWhon:ljx8wusarw",
        ],
      });

      console.log("Supreme Store open");

      console.log("Supreme Store data ==>", data);

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

        // urlencodedstore.append("order_id",localStorage.getItem('order_item'));

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
      updateTasks(data.id, "processing...", "product page");

      await page.waitForTimeout(3000);
      await page.evaluate((data) => {
        jQuery(`size option:contains(${data.sizes})`).attr("selected", true);
      }, data);

      updateTasks(data.id, "selecting size...", "product page");

      await page.waitForTimeout(3000);
      await page.evaluate(() => {
        // if(data.sizes === 'small'){
        document.getElementsByClassName("button")[2].click();
        // }
      });

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.getElementsByClassName("checkout")[0].click();
      });
      updateTasks(data.id, "flling form...", "checkout page");

      await page.waitForTimeout(5000);

      await page.type(
        "#order_billing_name",
        `${data.profile.name} ${data.profile.lastname}`,
        { delay: 100 }
      );

      await page.type("#order_email", data.profile.email, { delay: 100 });

      await page.type("#order_tel", data.profile.phone, { delay: 100 });

      await page.type("#order_billing_address", data.profile.address, {
        delay: 100,
      });

      await page.type("#order_billing_zip", data.profile.zip, { delay: 100 });

      await page.type("#order_billing_city", data.profile.city, { delay: 100 });

      await page.type("#order_billing_state", data.profile.state, {
        delay: 100,
      });

      await page.type("#credit_card_number", data.profile.card_no, {
        delay: 100,
      });

      let cardValue = data.profile.expire;
      console.log("card_no===> ", cardValue);

      let cardValueSplit = cardValue.split("/");

      console.log("cardValueSplit===>", cardValueSplit);

      await page.select("select#credit_card_month", cardValueSplit[0]);
      await page.select("select#credit_card_year", cardValueSplit[1]);

      // const myValue = 08;
      // await page.$eval('credit_card[month]', (element, myValue) => {
      //    element.value = myValue;
      //        const event = new Event('change');
      //  element.dispatchEvent(event);
      //     }, myValue);

      // await page.select('#credit_card_month', '12', { delay: 100 });

      // await page.select('#credit_card_year', '2024', { delay: 100 });

      await page.type("#credit_card_verification_value", data.profile.cvv, {
        delay: 100,
      });

      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        document.querySelector("#order_terms").parentElement.click();
      });

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.querySelector(".button").click();
      });
      // await page.evaluate(() => {
      //     const cardValue = data.profile.card_no;

      //     const cardValueSplit = cardValue.split('/');

      //         document.querySelector('#credit_card_month').value = cardValueSplit[0];

      //         document.querySelector('#credit_card_year').value = cardValueSplit[0];
      // });
    } catch (err) {
      console.log("error =====>", err);
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
      console.log("taking screen shot of ", data.profile.card_owner_name);
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
      urlencodedstore.append("order_id", data.id);
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
