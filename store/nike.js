const puppeteer = require('puppeteer');
// const puppeteer = require("puppeteer-extra");
// const pluginStealth = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(pluginStealth());


module.exports = {

    async nikeStore(data) {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                ]
            });
            console.log('open nike site')
            
            const page = await browser.newPage();
            await page.setViewport({ width: 1440, height: 900 });
            await page.goto(data.product, {
                // 'networkidle0', 'networkidle2'
                waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
                // waitUntil: 'load',
                timeout: 0
            });
            if (await page.$("[aria-label='Close Menu']") !== null) {
                await page.evaluate(() => {
                    document.querySelector("[class='hf-modal-btn-close']").click()
                    document.querySelector("[aria-label='Close Menu']").click()
                });
            }
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
            console.log('size selected')
            return
            await page.waitForTimeout(15000);
            await page.setDefaultNavigationTimeout(0);
            await page.evaluate(() => {
                document.querySelector('#buyTools .add-to-cart-btn').click();
                // document.querySelector(`[aria-label="Add to Bag"]`).click()
            })
            console.log('add to bag selected')
            await page.waitForTimeout(5000);
            // await page.setDefaultNavigationTimeout(0);
            // await page.waitFor(`[data-test="qa-cart-checkout"]`)
            // page.on('dialog', async dialog => {
            //     console.log(dialog.message());
            //     await dialog.dismiss();
            //     await browser.close();
            // });
            // await page.waitForSelector(`[data-test="qa-cart-checkout"]`)
            // await page.screenshot({ path: screenshot })
            await page.addStyleTag({content: '.css-idbwkv:not(.show){display: block}'})
            await page.evaluate(() => {
                document.querySelector(`[data-test="qa-cart-checkout"]`).click()
            })
            // page.waitForNavigation({ waitUntil: ['load', 'domcontentloaded'], })
            console.log('checkout')
            return

            /*
                await page.waitForTimeout(15000);
                await page.setDefaultNavigationTimeout(0);
                if (await page.$("[class='css-idbwkv']") !== null) {
                    console.log('if')
                    await page.evaluate(() => {
                        document.querySelector("[data-test='qa-cart-checkout']").click()
                    });
                }
                
                await page.waitForTimeout(5000);
                await page.evaluate(() => {
                    document.querySelector(`[data-test="qa-cart-checkout"]`).click()
                })
                page.waitForNavigation({ waitUntil: ['load', 'domcontentloaded'], })
            */
        }
        catch (err) {
            // await page.screenshot({ path: `${data.profile.card_owner_name.replace(/\s/g, "")}.png` });
            console.log('err', err)
        }
    }
}


// const nikeStore = async (data) => {
//     console.log('data')
// }