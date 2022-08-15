const puppeteer = require("puppeteer");
const proxiesData = require("../proxies/index.js");
// const puppeteerExtra = require('puppeteer-extra')

module.exports = {
  async kithStore(data) {
    console.log("kith");
    console.log("proxiesData ====>", proxiesData);

    // await page.waitForResponse(response => response.status() === 200)

    const proxyStatus = Object.values(proxiesData)[0].find(
      (val) => (val.status = 200)
    );

    console.log("proxyStatus====>", proxyStatus);
    // const proxyData =  data.proxy.proxy;
    // const dataVal =  proxyData.split(',');
    // console.log('dataVal===>',dataVal[2])
    try {
      const browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox", proxyStatus.proxy],
      });

      console.log("open");

      console.log("data ==>", data);

      const page = await browser.newPage();

      const userName = proxyStatus.userName;

      const password = proxyStatus.password;

      console.log("userName====>", userName);
      console.log("password====>", password);

      await page.authenticate({ userName, password });
      // product 'https://kith.com/collections/mens-apparel/products/aauts0288fa01'

      await page.goto(data.product, {
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
        // waitUntil: 'load',
        timeout: 0,
      });
      await page.waitForTimeout(5000);
      // popup remove
      if ((await page.$("[data-key='continueShop']")) !== null) {
        await page.evaluate(() => {
          document.querySelector("[data-key='continueShop']").click();
        });
      }

      await page.waitForTimeout(3000);
      // popup remove

      await page.evaluate(() => {
        document.querySelector(".klaviyo-close-form").click();
      });

      // await page.waitForTimeout(3000);

      //      await page.evaluate(() => {
      //         document.getElementsByClassName('product-swatch__input')[0].click()
      //       });

      await page.waitForTimeout(5000);
      //addtocart

      await page.evaluate(() => {
        document.querySelector(".product-form__add-to-cart").click();
      });

      await page.waitForTimeout(3000);
      //selecting size for t-shirt

      if (data.product_name === "t-shirt") {
        await page.evaluate(() => {
          document.getElementsByClassName("product-swatch__input")[0].click();
        });
      } else if (
        data.product_name === "cap" ||
        data.product_name === "sandles" ||
        data.product_name === "shoes" ||
        data.product_name === "socks"
      ) {
        // await page.evaluate(() => {
        //     document.querySelector('.product__swatch-select').selectedIndex = 4
        //     });
        // await  page.select("#SingleOptionSelector-0")
        //   await page.evaluate(() => {
        //   document.querySelector('.product__swatch-select').selectedIndex = 3
        //   });
        //               const myValue = 8;
        //   await page.$eval('#SingleOptionSelector-0', (element, myValue) => {
        //      element.value = myValue;
        //          const event = new Event('change');
        //    element.dispatchEvent(event);
        //       }, myValue);
      }

      // log
      // page.click(`[class=product__swatch-select][value=${data.sizes}]`);

      // page.click(`[class=product__swatch-select][value='']`);
      // await page.evaluate(() => {
      //  document.getElementsByClassName("product-swatch__input")[0].click()
      // console.log('productsize ====>',productSize)

      // productSize.onclick();
      // });

      // await page.waitForTimeout(5000);

      // await page.evaluate(()=>{
      //     document.querySelector('.klaviyo-close-form').click()
      // })

      console.log("select size");
      // document.querySelector(`.product-swatch__input[value=${size}]`).click();

      await page.waitForTimeout(4000);
      console.log("click add to cart");

      // add to cart
      // page.click(`[name='add']`);
      await page.evaluate(() => {
        document.getElementsByClassName("btn ajaxcart__checkout")[0].click();
      });

      // await page.evaluate(() => {
      //     document.querySelector("[name='add']").click()
      // })

      await page.waitForTimeout(3000);
      // quantity
      let quantity = data.quantity;

      console.log("quantity", data.quantity);
      if (data.quantity > 1) {
        for (let i = 1; i <= quantity; i++) {
          await page.click(".ajaxcart__qty--plus");

          // page.click(`[aria-label="QTY Plus"]`);
          // document.querySelector('[aria-label="QTY Plus"]').click();
        }
      } else {
        console.log("not click");
        await page.click(".ajaxcart__qty--plus");
      }

      await page.waitForTimeout(2000);
      // checkout
      // await page.evaluate(() => {
      //     document.querySelector('[name="checkout"]').click();
      // })
      await page.setDefaultNavigationTimeout(0);
      await Promise.all([
        page.click('[name="checkout"]'),
        page.waitForNavigation({
          waitUntil: [
            "load",
            "domcontentloaded",
            "networkidle0",
            "networkidle2",
          ],
        }),
      ]);
      console.log("checkout");

      // const StealthPlugin = require('puppeteer-extra-plugin-stealth')
      // puppeteerExtra.use(StealthPlugin())

      // puppeteerExtra.launch({ headless: true }).then(async browser => {
      //   console.log('Running tests..')
      //   const page = await browser.newPage()
      //   await page.goto('https://bot.sannysoft.com')
      //   await page.waitForTimeout(5000)
      //   await page.screenshot({ path: 'testresult.png', fullPage: true })
      //   await browser.close()
      //   console.log(`All done, check the screenshot. ✨`)
      // })

      // await page.waitForTimeout(5000);
      // document.querySelector('[name="CheckoutData.BillingFirstName"]').value='jesse';

      // await page.waitForTimeout(5000);

      // document.querySelector('#CheckoutData_BillingLastName').value = page.profile.lastname;

      // await page.waitForTimeout(5000);

      // document.querySelector('[name="CheckoutData.Email"]').value=page.profile.email;
      // await page.waitForTimeout(5000);

      // await page.type('#checkout_shipping_address_address1', data.profile.address);
      // await page.waitForTimeout(5000);
      // await page.type('#checkout_shipping_address_address1', data.profile.address);
      // await page.waitForTimeout(5000);
      // await page.type('#checkout_shipping_address_address2', data.profile.address_2);
      // await page.waitForTimeout(5000);
      // await page.type('#checkout_shipping_address_zip', data.profile.zip);
      // await page.waitForTimeout(5000);
      // await page.type('#checkout_shipping_address_phone', data.profile.phone);
      // await page.waitForTimeout(5000);
      // await page.type('#checkout_shipping_address_city', data.profile.city);
      // await page.waitForTimeout(5000);
      // await page.select('#checkout_shipping_address_province', 'AL');

      // console.log('form fill', data.profile.card_owner_name)

      // await page.waitForTimeout(5000);
      // await page.evaluate(() => {
      //     document.querySelector("#CheckoutData_BillingFirstName").value= 'jesse'

      // });

      // working on input fields

      //   const myValue = 17;
      //   await page.$eval('#CheckoutData_BillingFirstName', (element, myValue) => {
      //       element.value = myValue;
      //       const event = new Event('change');
      //       element.dispatchEvent(event);
      //   }, myValue);

      console.log("waiting for iframe with form to be ready.");
      await page.waitForSelector("#Intrnl_CO_Container");
      console.log("iframe is ready. Loading iframe content");

      // const handle = await page.waitForSelector('')

      const elementHandle = await page.$('iframe[id="Intrnl_CO_Container"]');
      // await page.waitForSelector('#CheckoutData_BillingFirstName')

      const frame = await elementHandle.contentFrame();

      console.log("filling form in iframe");
      await frame.type("#CheckoutData_BillingFirstName", data.profile.name, {
        delay: 100,
      });
      await frame.type("#CheckoutData_BillingLastName", data.profile.lastname, {
        delay: 100,
      });
      await frame.type("#CheckoutData_Email", data.profile.email, {
        delay: 100,
      });
      await frame.type("#CheckoutData_BillingAddress1", data.profile.address, {
        delay: 100,
      });
      await frame.type(
        "#CheckoutData_BillingAddress2",
        data.profile.address_2,
        { delay: 100 }
      );
      await frame.type("#BillingCity", data.profile.city, { delay: 100 });
      await frame.type("#BillingZIP", data.profile.zip, { delay: 100 });
      await frame.type("#CheckoutData_BillingPhone", data.profile.phone, {
        delay: 100,
      });
      // await page.evaluate(() => {
      //     document.getElementById('CheckoutData_OffersFromMerchant').click()
      //   });

      // await page.evaluate(() => {
      //     const email = document.getElementById('checkout_email');
      //     email.value = data.profile.email;
      //     const firstName = document.getElementById('checkout_shipping_address_first_name');
      //     firstName.value = 'Daniyal';
      //     const lastName = document.getElementById('checkout_shipping_address_last_name');
      //     lastName.value = 'Amjad';
      //     const address = document.getElementById('checkout_shipping_address_address1');
      //     address.value = 'Pakistan';
      //     const address2 = document.getElementById('checkout_shipping_address_address2');
      //     address2.value = 'Karachi';
      //     const city = document.getElementById('checkout_shipping_address_city');
      //     city.value = 'Karachi';
      //     const zip = document.getElementById('checkout_shipping_address_zip');
      //     zip.value = '35242';
      //     const phone = document.getElementById('checkout_shipping_address_phone');
      //     phone.value = '3471234567';
      // })

      await page.waitForTimeout(2000);
      // await page.evaluate(() => {
      //     document.querySelector('#continue_button').click();
      // })
      await page.setDefaultNavigationTimeout(0);
      await Promise.all([
        page.click("#continue_button"),
        page.waitForNavigation({
          waitUntil: [
            "load",
            "domcontentloaded",
            "networkidle0",
            "networkidle2",
          ],
        }),
      ]);
      console.log("form submit", data.profile.card_owner_name);

      await page.waitForTimeout(20000);
      // await page.evaluate(() => {
      //     document.querySelector('#continue_button').click();
      // })
      await page.setDefaultNavigationTimeout(0);
      await Promise.all([
        page.click("#continue_button"),
        page.waitForNavigation({
          waitUntil: [
            "load",
            "domcontentloaded",
            "networkidle0",
            "networkidle2",
          ],
        }),
      ]);

      await page.setDefaultNavigationTimeout(0);
      await page.waitForTimeout(10000);
      console.log("payment", data.profile.card_owner_name);

      const iframe1 = await page.waitForSelector(
        ".field:nth-child(2) iframe.card-fields-iframe"
      );
      const frame1 = await iframe1.contentFrame();
      await frame1.type('input[name="number"]', data.profile.card_no, {
        delay: 50,
      });
      console.log("put value of card number ", data.profile.card_owner_name);

      await page.waitForTimeout(1000);
      const iframe2 = await page.waitForSelector(
        ".field:nth-child(3) iframe.card-fields-iframe"
      );
      const frame2 = await iframe2.contentFrame();
      await frame2.type('input[name="name"]', data.profile.card_owner_name, {
        delay: 50,
      });
      console.log("put value of card name", data.profile.card_owner_name);

      await page.waitForTimeout(1000);
      const iframe3 = await page.waitForSelector(
        ".field:nth-child(4) iframe.card-fields-iframe"
      );
      const frame3 = await iframe3.contentFrame();
      await frame3.type('input[name="expiry"]', data.profile.expire, {
        delay: 50,
      });
      console.log("put value of expiry", data.profile.card_owner_name);

      await page.waitForTimeout(1000);
      const iframe4 = await page.waitForSelector(
        ".field:nth-child(5) iframe.card-fields-iframe"
      );
      const frame4 = await iframe4.contentFrame();
      await frame4.type('input[name="verification_value"]', data.profile.cvv, {
        delay: 50,
      });
      console.log("put value of cvv", data.profile.card_owner_name);

      await page.screenshot({
        path: `${data.profile.card_owner_name.replace(/\s/g, "")}.png`,
      });
      console.log("taking screen shot of ", data.profile.card_owner_name);
      await page.waitForTimeout(5000);
      console.log("base 64 before");
      const contents = fs.readFileSync(
        `./${data.profile.card_owner_name.replace(/\s/g, "")}.png`,
        { encoding: "base64" }
      );
      console.log("base 64 after", contents);

      await page.waitForTimeout(2000);
      await page.evaluate(() => {
        document.querySelector("#continue_button").click();
      });

      var myHeadersStore = new fetch.Headers();
      myHeadersStore.append(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      myHeadersStore.append(
        "Cookie",
        "XSRF-TOKEN=eyJpdiI6IkRFSWVSOXRwL2dFdGQ4OWFlN3l0SFE9PSIsInZhbHVlIjoiM2crSGgrTjZMOVBCWkk2aGpqMGRBbmsvaEtuMThuc280S0lMSDQzcWdHcU1xVXM3VGlKMTZMay95VkRGUm5WaHh4NjdGNXQ2OU40c01XaTJKYVgzTjFpMHYyVXFWcHhkUUFyL1pjZGV5Uy9uL2ViSm9LM1lnNkplWEtaVjd4cUoiLCJtYWMiOiJkYmYyNDNmNGQ0ZGVlZjUxZDcwMWRlYTdkZjkyYjhiYjkwYWIxMDcwMGIyMDhjMTU0YzkyMDQzODYzNjM5NjhiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFvU01KVUpCWkFybmoxdFFPNXlsNEE9PSIsInZhbHVlIjoiTDZDdHA3NDM5SHZqUVpSUTF2b3J0MmRSNkhDYjlQdk0zWlBqSWZZVkZMNmNyTHpNZFdsY2lDVWtsK0lLT0FORU1OSjZaYy9PSGozeXFwZEJjSDNHNTJ2NFJpMXQwZjJteWNWOGlMMUZ6R3VMU2RVSTlYOFg5bElJV2crK21sS1IiLCJtYWMiOiI3YTRiYWFjZjQwM2IzNjQ3MjE0ODdkMTMyZTAyNTIwZDU5N2FjOTk5MWYzZGFiODEyNTA1NzU4OTVkYjU5YjE2IiwidGFnIjoiIn0%3D"
      );

      console.log("data update");

      var updateUrlencodedStote = new URLSearchParams();
      updateUrlencodedStote.append("status", "0");
      updateUrlencodedStote.append("_method", "PATCH");

      console.log("updateUrl", updateUrlencodedStote);

      var requestOptions = {
        method: "POST",
        headers: myHeadersStore,
        body: urlencodedstore,
        redirect: "follow",
      };

      fetch(
        `http://jesse.oreostudios.com/api/v1/tasks/${data.id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(JSON.parse(result).data))
        .catch((error) => console.log("error", error));

      return;

      var urlencodedstore = new URLSearchParams();
      urlencodedstore.append("product_name", data.product_name);
      urlencodedstore.append("product_price", "100");
      urlencodedstore.append("product_qty", data.quantity);
      urlencodedstore.append("product_description", "Testing Purpose");
      urlencodedstore.append("task_id", data.id);
      urlencodedstore.append("order_id", "123");
      urlencodedstore.append("order_image", contents);

      var requestOptions = {
        method: "POST",
        headers: myHeadersStore,
        body: urlencodedstore,
        redirect: "follow",
      };

      fetch("http://jesse.oreostudios.com/api/v1/orders", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(JSON.parse(result).data))
        .catch((error) => console.log("error", error));

      await browser.close();
      console.log("close");
    } catch (err) {
      // await page.screenshot({ path: `${data.profile.card_owner_name.replace(/\s/g, "")}.png` });
      console.log("err", err);
    }
  },
};

// const nikeStore = async (data) => {
//     console.log('data')
// }
