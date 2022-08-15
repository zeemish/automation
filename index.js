const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const moment = require("moment");
var CronJob = require("cron").CronJob;
const fs = require("fs");
const Nike = require("./store/nike");
const Kith = require("./store/kith");
const NikeStealth = require("./store/nike-stealth");
const FootLocker = require("./store/foot-locker");
const BSTN = require("./store/BSTN");
const { SupremeStore } = require("./store/supreme");
const { naked } = require("./store/naked");
const { endClothing } = require("./store/endClothing");

// var job = new CronJob('00 */5 * * * *', async () => {
//     console.log('You will see this message every second');
//     await fetch("http://jesse.oreostudios.com/api/v1/tasks", requestOptions)
//         .then(response => response.text())
//         .then(result => checkout(JSON.parse(result).data))
//         .catch(error => console.log('error', error));
// }, null, true, 'America/Los_Angeles');
// job.start();

fetch("http://jesse.oreostudios.com/api/v1/usertasks", requestOptions)
  .then((response) => response.text())
  .then((result) => checkout(JSON.parse(result).data)) //checkout(JSON.parse(result).data)
  .catch((error) => console.log("error", error));

var myHeaders = new fetch.Headers();
myHeaders.append(
  "Cookie",
  "XSRF-TOKEN=eyJpdiI6IklPTVJqQVVGelJaa1dJZnJPQ2t2TkE9PSIsInZhbHVlIjoiQWFDZDhEeDhoTFIxMmZXblc2NUEvNE9BOVl0UUs1aVJNcm5sV21ka292ZXlUeEdWcTlNdnhQU3F2OTNCM0VXbDljY1NrSStReTVMNVE1SHZuWS9WUXVEcTBMNzhlQmhXK21DR3ZsNGNyblo1bjJZV1VyWnRiNVZZekNoQjB4am0iLCJtYWMiOiJjNDFkMTBmMDE4NmNmOTkzMjUwM2NkMTQ2NjQ2YTBmMzEyZDFjNDI3OTFlYTU0MGU3YjkxMWU0ZmYwZjZlMDIwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IitvMXpJM1NaRmxxYkdGZDBaYnEyWWc9PSIsInZhbHVlIjoibVhKcVpkLzhYMU92Q21VMW9HZ0plZUI2Y2I5enlQMC9hRUhseERqbGtyOHZmVjZBSWl5VGJhd2JFZTUyS3ZjMUhtNDRnRHMzT2lDZ1hqV3pKS3BMZkh3Y0ExRkhienRoUDZUSHRiYmZTM2Jzemp4WlJLT3FxT2NXZ3ZLUWVPVUYiLCJtYWMiOiIyMzMwNWY0ZTU3ZTlkYzQ1ZGE5NGY4YWY1YzhhNGRiNWMxZmRiZWRkZDNkMzA4NmI5NTgxNzA2MjYxM2UwNzYxIiwidGFnIjoiIn0%3D"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// const checkout = async(data) => {
//     var date = new Date();
//     var todayDate = moment(date).format("YYYY-MM-DD HH:mm:ss")

//     let promises = data.map(async (element, i) => {
//         if(element.start_time < todayDate && todayDate < element.end_time) {
//             if (element.store.name === 'kith') {
//                 console.log('i', i++)
//                 // kithStore(element)
//             }
//         }
//             // return { file: imageLocatison, type: document.type, detail: document.detail, id: witnessDocumentId };
//     })

//    await Promise.all(promises);
// }

const checkout = async (data) => {
  var date = new Date();
  var todayDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
  await Promise.all(
    data.map(async (element, i) => {
      console.log(element, "element");
      if (element.start_time < todayDate && todayDate < element.end_time) {
        if (element.store.name === "footlocker") {
          await FootLocker.footLockerStore(element);
        } else if (element.store.name === "nike") {
          // await Nike.nikeStore(element)
          // await NikeStealth.nikeStore(element)
        } else if (element.store.name === "kith") {
          await Kith.kithStore(element);
        } else if (element.store.name === "bstn") {
          await BSTN.BSTNStore(element);
        } else if (element.store.name === "supreme") {
          await SupremeStore(element);
        } else if (element.store.name === "naked") {
          await naked(element);
        } else if (element.store.name === "end") {
          await endClothing(element);
        }
        // else if(element.store.name ===)
      }
      // return { file: imageLocation, type: document.type, detail: document.detail, id: witnessDocumentId };
    })
  );
};

// Continue to shop
// const kithStore = async (data) => {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             args: [
//                 "--no-sandbox",
//                 "--disable-setuid-sandbox",
//             ]
//         });

//         console.log('open')

//         const page = await browser.newPage();
//         // product 'https://kith.com/collections/mens-apparel/products/aauts0288fa01'

//         await page.goto(data.product, {
//             waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
//             // waitUntil: 'load',
//             timeout: 0
//         });
//         await page.waitForTimeout(5000);
//         // popup remove
//         if (await page.$("[data-key='continueShop']") !== null) {
//             await page.evaluate(() => {
//                 document.querySelector("[data-key='continueShop']").click()
//             });
//         }

//         page.click(`[class=product-swatch__input][value=${data.sizes}]`);
//         console.log('select size')
//         // document.querySelector(`.product-swatch__input[value=${size}]`).click();

//         await page.waitForTimeout(2000);
//         console.log('click add to cart')

//         // add to cart
//         page.click(`[name='add']`);
//         // await page.evaluate(() => {
//         //     document.querySelector("[name='add']").click()
//         // })

//         await page.waitForTimeout(2000);
//         // quantity
//         let quantity = data.quantity
//         console.log('quantity', data.quantity)
//         if (data.quantity > 1) {
//             for (let i = 1; i <= quantity; i++) {
//                 page.click('.ajaxcart__qty--plus')
//                 // page.click(`[aria-label="QTY Plus"]`);
//                 // document.querySelector('[aria-label="QTY Plus"]').click();
//             }
//         }
//         else {
//             console.log('not click')
//         }

//         await page.waitForTimeout(2000);
//         // checkout
//         // await page.evaluate(() => {
//         //     document.querySelector('[name="checkout"]').click();
//         // })
//         await page.setDefaultNavigationTimeout(0);
//         await Promise.all([
//             page.click('[name="checkout"]'),
//             page.waitForNavigation({ waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'], })
//         ]);
//         console.log('checkout')

//         await page.waitForTimeout(10000);
//         await page.type('#checkout_email', data.profile.email);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_first_name', data.profile.name);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_last_name', data.profile.lastname);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_address1', data.profile.address);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_address1', data.profile.address);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_address2', data.profile.address_2);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_zip', data.profile.zip);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_phone', data.profile.phone);
//         await page.waitForTimeout(500);
//         await page.type('#checkout_shipping_address_city', data.profile.city);
//         await page.waitForTimeout(500);
//         await page.select('#checkout_shipping_address_province', 'AL');

//         console.log('form fill', data.profile.card_owner_name)

//         // await page.evaluate(() => {
//         //     const email = document.getElementById('checkout_email');
//         //     email.value = data.profile.email;
//         //     const firstName = document.getElementById('checkout_shipping_address_first_name');
//         //     firstName.value = 'Daniyal';
//         //     const lastName = document.getElementById('checkout_shipping_address_last_name');
//         //     lastName.value = 'Amjad';
//         //     const address = document.getElementById('checkout_shipping_address_address1');
//         //     address.value = 'Pakistan';
//         //     const address2 = document.getElementById('checkout_shipping_address_address2');
//         //     address2.value = 'Karachi';
//         //     const city = document.getElementById('checkout_shipping_address_city');
//         //     city.value = 'Karachi';
//         //     const zip = document.getElementById('checkout_shipping_address_zip');
//         //     zip.value = '35242';
//         //     const phone = document.getElementById('checkout_shipping_address_phone');
//         //     phone.value = '3471234567';
//         // })

//         await page.waitForTimeout(2000);
//         // await page.evaluate(() => {
//         //     document.querySelector('#continue_button').click();
//         // })
//         await page.setDefaultNavigationTimeout(0);
//         await Promise.all([
//             page.click('#continue_button'),
//             page.waitForNavigation({ waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'], })
//         ]);
//         console.log('form submit', data.profile.card_owner_name)

//         await page.waitForTimeout(20000);
//         // await page.evaluate(() => {
//         //     document.querySelector('#continue_button').click();
//         // })
//         await page.setDefaultNavigationTimeout(0);
//         await Promise.all([
//             page.click('#continue_button'),
//             page.waitForNavigation({ waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'], })
//         ]);

//         await page.setDefaultNavigationTimeout(0);
//         await page.waitForTimeout(10000);
//         console.log('payment', data.profile.card_owner_name)

//         const iframe1 = await page.waitForSelector('.field:nth-child(2) iframe.card-fields-iframe')
//         const frame1 = await iframe1.contentFrame();
//         await frame1.type('input[name="number"]', data.profile.card_no, { delay: 50 });
//         console.log('put value of card number ', data.profile.card_owner_name)

//         await page.waitForTimeout(1000);
//         const iframe2 = await page.waitForSelector('.field:nth-child(3) iframe.card-fields-iframe')
//         const frame2 = await iframe2.contentFrame();
//         await frame2.type('input[name="name"]', data.profile.card_owner_name, { delay: 50 });
//         console.log('put value of card name', data.profile.card_owner_name)

//         await page.waitForTimeout(1000);
//         const iframe3 = await page.waitForSelector('.field:nth-child(4) iframe.card-fields-iframe')
//         const frame3 = await iframe3.contentFrame();
//         await frame3.type('input[name="expiry"]', data.profile.expire, { delay: 50 });
//         console.log('put value of expiry', data.profile.card_owner_name)

//         await page.waitForTimeout(1000);
//         const iframe4 = await page.waitForSelector('.field:nth-child(5) iframe.card-fields-iframe')
//         const frame4 = await iframe4.contentFrame();
//         await frame4.type('input[name="verification_value"]', data.profile.cvv, { delay: 50 });
//         console.log('put value of cvv', data.profile.card_owner_name)

//         await page.screenshot({ path: `${data.profile.card_owner_name.replace(/\s/g, "")}.png` });
//         console.log('taking screen shot of ', data.profile.card_owner_name)
//         await page.waitForTimeout(5000);
//         console.log('base 64 before')
//         const contents = fs.readFileSync(`./${data.profile.card_owner_name.replace(/\s/g, "")}.png`, { encoding: 'base64' });
//         console.log('base 64 after', contents)

//         await page.waitForTimeout(2000);
//         await page.evaluate(() => {
//             document.querySelector('#continue_button').click();
//         })

//         var myHeadersStore = new fetch.Headers();
//         myHeadersStore.append("Content-Type", "application/x-www-form-urlencoded");
//         myHeadersStore.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkRFSWVSOXRwL2dFdGQ4OWFlN3l0SFE9PSIsInZhbHVlIjoiM2crSGgrTjZMOVBCWkk2aGpqMGRBbmsvaEtuMThuc280S0lMSDQzcWdHcU1xVXM3VGlKMTZMay95VkRGUm5WaHh4NjdGNXQ2OU40c01XaTJKYVgzTjFpMHYyVXFWcHhkUUFyL1pjZGV5Uy9uL2ViSm9LM1lnNkplWEtaVjd4cUoiLCJtYWMiOiJkYmYyNDNmNGQ0ZGVlZjUxZDcwMWRlYTdkZjkyYjhiYjkwYWIxMDcwMGIyMDhjMTU0YzkyMDQzODYzNjM5NjhiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFvU01KVUpCWkFybmoxdFFPNXlsNEE9PSIsInZhbHVlIjoiTDZDdHA3NDM5SHZqUVpSUTF2b3J0MmRSNkhDYjlQdk0zWlBqSWZZVkZMNmNyTHpNZFdsY2lDVWtsK0lLT0FORU1OSjZaYy9PSGozeXFwZEJjSDNHNTJ2NFJpMXQwZjJteWNWOGlMMUZ6R3VMU2RVSTlYOFg5bElJV2crK21sS1IiLCJtYWMiOiI3YTRiYWFjZjQwM2IzNjQ3MjE0ODdkMTMyZTAyNTIwZDU5N2FjOTk5MWYzZGFiODEyNTA1NzU4OTVkYjU5YjE2IiwidGFnIjoiIn0%3D");

//         console.log('data update')

//         var updateUrlencodedStote = new URLSearchParams()
//         updateUrlencodedStote.append("status", '0');
//         updateUrlencodedStote.append("_method", 'PATCH');

//         console.log('updateUrl', updateUrlencodedStote)

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeadersStore,
//             body: urlencodedstore,
//             redirect: 'follow'
//         };

//         fetch(`http://jesse.oreostudios.com/api/v1/tasks/${data.id}`, requestOptions)
//             .then(response => response.text())
//             .then(result => console.log(JSON.parse(result).data))
//             .catch(error => console.log('error', error));

//         return

//         var urlencodedstore = new URLSearchParams();
//         urlencodedstore.append("product_name", data.product_name);
//         urlencodedstore.append("product_price", "100");
//         urlencodedstore.append("product_qty", data.quantity);
//         urlencodedstore.append("product_description", "Testing Purpose");
//         urlencodedstore.append("task_id", data.id);
//         urlencodedstore.append("order_id", '123');
//         urlencodedstore.append("order_image", contents);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeadersStore,
//             body: urlencodedstore,
//             redirect: 'follow'
//         };

//         fetch("http://jesse.oreostudios.com/api/v1/orders", requestOptions)
//             .then(response => response.text())
//             .then(result => console.log(JSON.parse(result).data))
//             .catch(error => console.log('error', error));

//         await browser.close();
//         console.log('close')
//     }
//     catch (err) {
//         await page.screenshot({ path: `${data.profile.card_owner_name.replace(/\s/g, "")}.png` });
//         console.log('err', err)
//     }
// }
