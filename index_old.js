const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
// home page, wait for 5 seconds and simply close the browser

// async function main() {
//     const browser = await puppeteer.launch({
//         headless: true
//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.scrapingbee.com/');
//     await page.waitForTimeout(5000); // wait for 5 seconds
//     await browser.close();
// }

//The first example is going to be super simple. We will navigate to yelp.com website and search for pizza delivery near Toronto, Canada.

// async function main() {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.yelp.com/');
//     await page.type('#find_desc', 'Pizza Delivery');
//     await page.type('#dropperText_Mast', 'Toronto, ON');
//     await page.click('#header-search-submit');
//     await page.waitForTimeout(10000); // wait for 5 seconds
//     await page.screenshot({ path: 'example.png' });
//     await browser.close();
// }

// main();

var myHeaders = new fetch.Headers();
myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IklPTVJqQVVGelJaa1dJZnJPQ2t2TkE9PSIsInZhbHVlIjoiQWFDZDhEeDhoTFIxMmZXblc2NUEvNE9BOVl0UUs1aVJNcm5sV21ka292ZXlUeEdWcTlNdnhQU3F2OTNCM0VXbDljY1NrSStReTVMNVE1SHZuWS9WUXVEcTBMNzhlQmhXK21DR3ZsNGNyblo1bjJZV1VyWnRiNVZZekNoQjB4am0iLCJtYWMiOiJjNDFkMTBmMDE4NmNmOTkzMjUwM2NkMTQ2NjQ2YTBmMzEyZDFjNDI3OTFlYTU0MGU3YjkxMWU0ZmYwZjZlMDIwIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IitvMXpJM1NaRmxxYkdGZDBaYnEyWWc9PSIsInZhbHVlIjoibVhKcVpkLzhYMU92Q21VMW9HZ0plZUI2Y2I5enlQMC9hRUhseERqbGtyOHZmVjZBSWl5VGJhd2JFZTUyS3ZjMUhtNDRnRHMzT2lDZ1hqV3pKS3BMZkh3Y0ExRkhienRoUDZUSHRiYmZTM2Jzemp4WlJLT3FxT2NXZ3ZLUWVPVUYiLCJtYWMiOiIyMzMwNWY0ZTU3ZTlkYzQ1ZGE5NGY4YWY1YzhhNGRiNWMxZmRiZWRkZDNkMzA4NmI5NTgxNzA2MjYxM2UwNzYxIiwidGFnIjoiIn0%3D");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://jesse.oreostudios.com/api/v1/tasks", requestOptions)
    .then(response => response.text())
    .then(result => checkout(JSON.parse(result).data))
    .catch(error => console.log('error', error));

//Checkout Process Start
async function checkout(data) {

    var date = new Date();
    var now_date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" +
        date.getSeconds()).slice(-2);

    console.log(data);
    // return;

    data.forEach((element, i) => {

        // console.log(element.start_time,element.end_time,now_date);

        // if (element.start_time < now_date && now_date < element.end_time) {
        //     console.log(element.start_time+'start');
        //     return;
        // } else {
        //     console.log(element.end_time+'end');
        //     return;
        // }

        if (element.start_time < now_date && now_date < element.end_time) {
            console.log('tdsff');
            if (element.store.name == 'developer') {
                console.log('t');
                console.log('element', element)
                jesseStore(element)
                // jesseStore(element, "https://b17e-2400-adc1-120-ae00-c54-c676-5bbf-4051.ngrok.io/jesse/", "https://b17e-2400-adc1-120-ae00-c54-c676-5bbf-4051.ngrok.io/jesse/product/shoe/");
            } else {
                //other( data , page );
                console.log('f');
            }
        }
    });
}
//Checkout Process End

//Store Process Start
// async function jesseStore(data,site,product) {
async function jesseStore(data) {

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox",
                "--disable-setuid-sandbox"]
            // product: 'firefox'
            // executablePath: "/usr/bin/chromium-browser",
            // args: [
            //     '--disable-setuid-sandbox',
            //     '--no-sandbox',
            //     '--disable-gpu',
            //     //'--no-first-run' 
            // ]
            // executablePath: '/opt/google/chrome/google-chrome',
            // executablePath: '/path/to/Chrome',
            // slowMo: 250,
            // devtools: true
        });

        const page = await browser.newPage();
        const qty = data.quantity;

        await page.goto('https://www.google.com.pk/?gws_rd=ssl',  {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });

        // await page.goto(data.product,  {
        //     waitUntil: 'load',
        //     // Remove the timeout
        //     timeout: 0
        // });

        // await page.goto(product, {
        //     waitUntil: 'load',
        //     // Remove the timeout
        //     timeout: 0
        // });

        await page.evaluate((qty) => {
            const quantity = document.querySelector('[name="quantity"]');
            quantity.value = '10';
        });

        await page.click('[name="add-to-cart"]');
        await page.waitForTimeout(2000); // wait for 5 seconds

        await page.goto('https://www.google.com.pk/?gws_rd=ssl',  {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });

        await page.screenshot({ path: `error-${now}.png`, fullPage: true });
        await browser.close();

        return

        // await page.goto(`${data.site}/checkout`, {
        //     waitUntil: 'load',
        //     // Remove the timeout
        //     timeout: 0
        // });

        // await page.goto(`${site}/checkout`,  {
        //     waitUntil: 'load',
        //     // Remove the timeout
        //     timeout: 0
        // });

        await page.type('#billing_first_name', data.profile.nick_name);
        await page.type('#billing_last_name', data.profile.name);
        await page.type('#billing_company', 'C Company');
        await page.type('#billing_address_1', data.profile.address);
        await page.type('#billing_address_2', data.profile.address_2);

        // await page.type('#billing_state', 'CA');
        await page.type('#billing_postcode', data.profile.zip);
        await page.type('#billing_phone', data.profile.phone);
        await page.type('#billing_email', data.profile.email);
        await page.type('#order_comments', 'Testing Purpose');

        await page.evaluate(() => {
            const country = document.getElementById('billing_country');
            country.value = 'US';
        });
        await page.evaluate(() => {
            const state = document.getElementById('billing_state');
            state.value = 'AK';
        });
        await page.waitForTimeout(1000);
        await page.type('#billing_city', 'California');
        await page.waitForTimeout(2000); // wait for 2 seconds

        await page.evaluate(() => {
            document.getElementById("payment_method_stripe").click();
        });
        const iframe1 = await page.waitForSelector('#stripe-card-element iframe')
        const frame1 = await iframe1.contentFrame();
        await frame1.type('input[name="cardnumber"]', data.card_no, { delay: 50 });

        const iframe2 = await page.waitForSelector('#stripe-exp-element iframe')
        const frame2 = await iframe2.contentFrame();
        await frame2.type('input[name="exp-date"]', data.expire, { delay: 50 });

        const iframe3 = await page.waitForSelector('#stripe-cvc-element iframe')
        const frame3 = await iframe3.contentFrame();
        await frame3.type('input[name="cvc"]', data.cvv, { delay: 50 });


        //await page.waitForTimeout(2000);
        //setInterval(function(){ await page.click('#place_order'); }, 3000);

        await page.evaluate(() => {
            document.getElementById('place_order').click();
        });


        // await page.waitForTimeout(2000);

        // var error = await page.evaluate(() => {

        //     //document.body.classList.contains('woocommerce-error')
        //     var err = document.getElementsByClassName('woocommerce-error');
        //     if (err.length > 0) {
        //         return true;
        //     }
        //     else{
        //         return false;
        //     }
        // });
        // console.log(error);

        // if (error) {
        //     await page.screenshot({ path: 'error.png' });
        // } else {
        //     await page.screenshot({ path: 'order.png' });
        // }

        //await page.click('#place_order');


        // await page.evaluate((e,page) => {
        //     if (document.body.classList.contains('woocommerce-NoticeGroup-checkout')) {
        //         page.screenshot({ path: 'error.png' });
        //     }
        //     else{
        //         page.click('#place_order');
        //         page.screenshot({ path: 'order.png' });
        //     }
        // });

        await page.waitForTimeout(20000); // wait for 10 seconds

        let producttype;
        let entry_title = await page.$('h1.entry-title');
        entry_title = (entry_title !== null) ? await page.evaluate(el => el.textContent, entry_title) : 'null';

        if (entry_title !== 'null' && entry_title == 'Order received') {
            // do things with its content

            console.log(page.$('h1.entry-title'));

            await page.waitForSelector('.woocommerce-order-overview__order.order')
            await page.waitForSelector('li.woocommerce-order-overview__order strong');
            var element = await page.$('li.woocommerce-order-overview__order strong');

            await page.waitForTimeout(5000);

            var order_id = await page.evaluate(el => el.textContent, element);
            console.log(order_id);

            producttype = await page.evaluate(el => el.innerText, await page.$('h1.entry-title'))

            var myHeadersStore = new fetch.Headers();
            myHeadersStore.append("Content-Type", "application/x-www-form-urlencoded");
            myHeadersStore.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkRFSWVSOXRwL2dFdGQ4OWFlN3l0SFE9PSIsInZhbHVlIjoiM2crSGgrTjZMOVBCWkk2aGpqMGRBbmsvaEtuMThuc280S0lMSDQzcWdHcU1xVXM3VGlKMTZMay95VkRGUm5WaHh4NjdGNXQ2OU40c01XaTJKYVgzTjFpMHYyVXFWcHhkUUFyL1pjZGV5Uy9uL2ViSm9LM1lnNkplWEtaVjd4cUoiLCJtYWMiOiJkYmYyNDNmNGQ0ZGVlZjUxZDcwMWRlYTdkZjkyYjhiYjkwYWIxMDcwMGIyMDhjMTU0YzkyMDQzODYzNjM5NjhiIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlFvU01KVUpCWkFybmoxdFFPNXlsNEE9PSIsInZhbHVlIjoiTDZDdHA3NDM5SHZqUVpSUTF2b3J0MmRSNkhDYjlQdk0zWlBqSWZZVkZMNmNyTHpNZFdsY2lDVWtsK0lLT0FORU1OSjZaYy9PSGozeXFwZEJjSDNHNTJ2NFJpMXQwZjJteWNWOGlMMUZ6R3VMU2RVSTlYOFg5bElJV2crK21sS1IiLCJtYWMiOiI3YTRiYWFjZjQwM2IzNjQ3MjE0ODdkMTMyZTAyNTIwZDU5N2FjOTk5MWYzZGFiODEyNTA1NzU4OTVkYjU5YjE2IiwidGFnIjoiIn0%3D");

            var urlencodedstore = new URLSearchParams();
            urlencodedstore.append("product_name", data.product_name);
            urlencodedstore.append("product_price", "100");
            urlencodedstore.append("product_qty", data.quantity);
            urlencodedstore.append("product_description", "Testing Purpose");
            urlencodedstore.append("task_id", data.id);
            urlencodedstore.append("order_id", order_id);
            urlencodedstore.append("order_image", `${data.store.name}-order-${order_id}.png`);

            var requestOptions = {
                method: 'POST',
                headers: myHeadersStore,
                body: urlencodedstore,
                redirect: 'follow'
            };

            fetch("http://jesse.oreostudios.com/api/v1/orders", requestOptions)
                .then(response => response.text())
                .then(result => console.log(JSON.parse(result).data))
                .catch(error => console.log('error', error));

            await page.screenshot({ path: `order-${order_id}.png`, fullPage: true });
            await browser.close();
        }
        else {

            var d = new Date();
            var now = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
                d.getFullYear() + "-" + ("0" + d.getHours()).slice(-2) + "-" + ("0" + d.getMinutes()).slice(-2);

            // var now = new Date();
            // now = now.toISOString();
            //now.getFullYear() +'-'+ now.getMonth() +'-'+ now.getDate() +' '+ now.getHours() +':'+ now.getMinutes() +':'+ now.getSeconds();
            //return console.log(now);    

            await page.screenshot({ path: `error-${now}.png`, fullPage: true });
            await browser.close();
        }
    }
    catch (err) {
        console.log('err', err)
    }

    // console.log(producttype);

    // var order_id = await page.evaluate(el => el.textContent, element);
    // console.log(order_id);

    // await page.waitForTimeout(10000);

    // var now = new Date().toISOString().slice(0, 10);
    //return console.log(now);    

    // await page.screenshot({ path: `order-${order_id}.png`, fullPage: true });
    //await page.screenshot({ path: `error-${now}.png`, fullPage: true });
    //await browser.close();
}
//Store Process End