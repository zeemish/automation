const puppeteer = require("puppeteer");

(async () => {
  //
  const parsedProxy = new URL(
    "http://test4971:Testing@321??@pr.oxylabs.io:7777"
  );

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-web-security",
      "--ignore-certificate-errors",
      `--proxy-server=pr.oxylabs.io:7777`,
    ],
  });
  const page = await browser.newPage();

  await page.authenticate({
    username: "test4971",
    password: "Testing@321??",
  });

  await page.goto("https://whatismyipaddress.com/");
  await page.screenshot({ path: "example.png" });

  //await browser.close();
})();
