const puppeteer = require('puppeteer-extra');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const fs = require('fs');
const { installMouseHelper } = require('./extras/install_mouse_helper');
puppeteer.use(pluginStealth())

const html_path = 'htmls/bot_';
const screenshot_path = 'screenshots/bot_';
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath: 'logs/' + 'bot.log',
        timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    };
let html = '';


// ####################################
// ####################################
// Parameters to set

// user/pass: the email/username for your Nike.com account
const user = 'myname@gmail.com';
const pass = 'mypassword';

// cv_code: 3-digit credit card validation code for the card saved to your Nike.com account
const cv_code = '123';

// size: the shoe size, as you see in the table of sizes on a product page, e.g., 'M 9 / W 10.5'
const size = '7';

// url: url to the shoe page, e.g., 'https://www.nike.com/us/launch/t/kobe-4-protro-wizenard/'
const url = 'https://www.nike.com/t/blazer-mid-77-vintage-mens-shoes-8DTR2j/DO6402-100';

// debug: Use debug/logging features?
// Includes writing updates to log file, writing html snapshots, and taking screenshots
const debug = true;

// buy: ****WARNING**** if you set this to true it *may* actually make a purchase
// you can leave this to false and the bot will not "submit order"
const buy = false;





// ####################################
// ####################################
// main flow

module.exports = {
    // Debugging stuff

    async nikeStore(data) {

        const browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false
        });

        const page = await browser.newPage();

        if (debug == true) {
            await installMouseHelper(page); // Makes mouse visible

            var dir = './htmls';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            dir = './screenshots';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            dir = './logs';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            log = SimpleNodeLogger.createSimpleFileLogger(opts);
            log.setLevel('info');

        }

        await page.goto(url);
        page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for page to finish loading

        console.log('1st step break')

        // ##################################################
        // ##################################################
        // ################################## ROUND 1
        // BEGIN

        // #### LOG / DEBUG
        if (debug == true) {
            log.info('1. Page loaded');
            html = await page.content();
            fs.writeFileSync(html_path + "_1_loaded_" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_1_loaded_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitForTimeout(1500);

        console.log('2nd step break')



        // ##################################################
        // ##################################################
        // ################################## ROUND 2	
        // Wait for size selector to appear, then scroll to it

        // const tweets = await page.$$('label.css-xf3ahq');

        // for (let i = 0; i < tweets.length; i++) {
        //     const tweet = await (await tweets[i].getProperty('innerText')).jsonValue()
        //     var value = await page.$eval(`div.css-hzulvp div:nth-child(${++i}) input`, element => element.value)
        //     const splitValue = value.split(':')
        //     if (parseInt(splitValue[1]) === parseInt(data.sizes)) {
        //         let sizeId = `#skuAndSize__${splitValue[0]}`.toString()
        //         await page.evaluate((sizeId) => {
        //             document.querySelector(`${sizeId}`).click();
        //         }, sizeId)
        //         break
        //     }
        // }
        // console.log('size selected')

        page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for page to finish loading


        await page.waitForSelector('.css-xf3ahq');
        await page.evaluate(() =>
            document.querySelectorAll(".css-hzulvp div input")[0].scrollIntoView()
        );

        console.log('debug before')
        // #### LOG / DEBUG
        if (debug == true) {
            log.info('2. Selectors appeared');
            html = await page.content();
            fs.writeFileSync(html_path + "_2_selectors_" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_2_selectors_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END
        console.log('debug after')


        await page.waitForTimeout(1500);






        // ##################################################
        // ##################################################
        // ################################## ROUND 3
        // Pick my size from the options

        const size = '7';

        // console.log('size', size)

        // const selector = '#buyTools div fieldset div.css-hzulvps';
        // const element = await page.$(selector);
        // const children = await page.evaluateHandle(e => e.children, element);

        // console.log('children', children.toString());

        // const elements = await page.$$('#buyTools div fieldset div.css-hzulvps');
        // console.log('elements', elements)

        const text = await page.evaluate(() => Array.from(document.querySelectorAll('#buyTools div fieldset div.mt2-sm div'), element => element.innerHTML));
        console.log(text[0]);
        console.log(text[1]);
        console.log(text[2]);

        console.log('length', text.length)

        let sizeIndex = text.map(async (value, index) => {
            var values = await page.$eval(`input`, element => element.value)
            console.log('values', values)
            // const splitValue = value.split(':')
            // value.innerHTML === data.sizes ? index : false
            // const name = await page.$eval("#usernameInput", (input) => {
            //     return input.getAttribute("value")
            // })
        })//.filter(Boolean)[0]

        console.log('sizeIndex', sizeIndex)

        // let sizeIndex = text
        //     .map((s, i) => (s.innerHTML === size ? i : false))
        //     .filter(Boolean)[0];
        return
        let list = await page.evaluate(() => {
            return Promise.resolve(Array.from(document.querySelectorAll('#buyTools div fieldset div.mt2-sm div')));
        });

        console.log(JSON.stringify(list))

        // console.log('services', JSON.stringify(services))
        // console.log('services', services)

        return
        // const services = await page.evaluate(() => Array.from(document.querySelectorAll('#buyTools div fieldset div.mt2-sm div').innerHTML));
        // console.log('services', services)

        // let sizes = await page.evaluate(() => Array.from(document.querySelectorAll("#buyTools div fieldset div.mt2-sm div")));
        // let sizes = await page.evaluate(() => document.querySelectorAll("#buyTools div fieldset div.mt2-sm div").innerHTML);
        // console.log('sizes', sizes)

        return
        // let sizeIndex = services.map((s, i) => console.log('s', s))
        // console.log('sizeIndex', sizeIndex)
        const tweets = await page.$$('label.css-xf3ahq');

        for (let i = 0; i < tweets.length; i++) {
            const tweet = await (await tweets[i].getProperty('innerText')).jsonValue()
            var value = await page.$eval(`div.css-hzulvp div:nth-child(${++i}) input`, element => element.value)
            const splitValue = value.split(':')
            if (parseInt(splitValue[1]) === parseInt(data.sizes)) {
                let sizeId = `#skuAndSize__${splitValue[0]}`.toString()
                await page.evaluate((sizeId) => {
                    document.querySelector(`${sizeId}`).click();
                }, sizeId)
                break
            }
        }
        //#### LOG / DEBUG
        if (debug == true) {
            log.info('3. Found and clicked on size');
            html = await page.content();
            fs.writeFileSync(html_path + "_3_size_clicked__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_3_size_clicked_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        // await page.waitFor(500);
        await page.waitForTimeout(1500);

        console.log('204')
        // ##################################################
        // ##################################################
        // ################################## ROUND 4	
        // Wait for add to cart button, then scroll into view


        await page.waitForSelector('button[aria-label="Add to Bag"]');
        await page.evaluate(() =>
            document.querySelector('button[aria-label="Add to Bag"]').click()
            // document.querySelectorAll('button[aria-label="Add to Bag"]')[0].scrollIntoView()
        );
        await page.waitForTimeout(1500);

        page.waitForNavigation({ waitUntil: 'networkidle0' }); // Wait for page to finish loading
        console.log('click')

        return

        await page.waitForSelector('button[data-test="qa-cart-checkout"]');
        await page.evaluate(() =>
            document.querySelector('button[data-test="qa-cart-checkout"]').click()
            // document.querySelectorAll('button[aria-label="check out"]')[0].scrollIntoView()
        );


        console.log('taken screen shot')

        return

        //#### LOG / DEBUG
        if (debug == true) {
            log.info('4. Scrolled to add button');
            html = await page.content();
            fs.writeFileSync(html_path + "_4_scroll_to_add_button__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_4_scroll_to_add_button_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitFor(500);




        // ##################################################
        // ##################################################
        // ################################## ROUND 5	
        // Click the add to cart button

        await page.evaluate(() =>
            document.querySelectorAll("button[data-qa=feed-buy-cta]")[0].click()
        );


        //#### LOG / DEBUG
        if (debug == true) {
            log.info('5. Clicked add button');
            html = await page.content();
            fs.writeFileSync(html_path + "_5_clicked_add_button__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_5_clicked_add_button_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitFor(500);




        // ##################################################
        // ##################################################
        // ################################## ROUND 6
        // Login

        await page.waitForSelector('.emailAddress');
        await page.waitFor(500);

        // Username
        await page.focus('.emailAddress > input');
        await page.keyboard.type(user);
        await page.waitFor(200);

        // Password
        await page.focus('.password > input')
        await page.keyboard.type(pass);
        await page.waitFor(200);

        // Submit
        await page.evaluate(() =>
            document.querySelectorAll(".loginSubmit > input")[0].click()
        );

        //#### LOG / DEBUG
        if (debug == true) {
            log.info('6. Logged in');
            html = await page.content();
            fs.writeFileSync(html_path + "_6_logged_in__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_6_logged_in_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitFor(500);




        // ##################################################
        // ##################################################
        // ################################## ROUND 7
        // Enter credit card info

        await page.waitForSelector('.credit-card-iframe');
        await page.waitForSelector('.credit-card-iframe');

        await page.evaluate(() =>
            document.querySelectorAll(".credit-card-iframe")[0].scrollIntoView()
        );
        await page.waitFor(200);

        const target_frame = page.frames().find(frame => frame.url().includes('paymentcc.nike.com'));

        await target_frame.evaluate(
            () => (document.getElementById("cvNumber").focus())
        );
        await target_frame.waitFor(1000);
        await page.keyboard.type(cv_code, { delay: 10 });


        //#### LOG / DEBUG
        if (debug == true) {
            log.info('7. Entered CV');
            html = await page.content();
            fs.writeFileSync(html_path + "_7_entered_cv__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_7_entered_cv_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitFor(500);



        // ##################################################
        // ##################################################
        // ################################## ROUND 8
        // Click "Save & Continue"

        await page.waitForSelector('.save-button');
        const buttons = await page.$$('.save-button');

        await buttons[1].click();

        //#### LOG / DEBUG
        if (debug == true) {
            log.info('8. Clicked Save & Continue');
            html = await page.content();
            fs.writeFileSync(html_path + "_8_save_continue__" + Math.floor(new Date() / 1000) + ".html", html);
            page.screenshot({ path: screenshot_path + "_8_save_continue_" + Math.floor(new Date() / 1000) + '.png' });
        }
        //#### LOG / DEBUG END

        await page.waitFor(500);





        // ##################################################
        // ##################################################
        // ################################## ROUND 9
        // Click "Submit Order"

        if (buy == true) {
            await buttons[2].click();

            //#### LOG / DEBUG
            if (debug == true) {
                log.info('9. Submitted Order');
                html = await page.content();
                fs.writeFileSync(html_path + "_9_submitted_order__" + Math.floor(new Date() / 1000) + ".html", html);
                page.screenshot({ path: screenshot_path + "_9_submitted_order_" + Math.floor(new Date() / 1000) + '.png' });
            }
            //#### LOG / DEBUG END

            await page.waitFor(500);

        }




        //await browser.close();
    }
}
