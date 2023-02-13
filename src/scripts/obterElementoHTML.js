const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://map.projectzomboid.com/");
    let title = await page.evaluate(() => {
        return document.querySelector('.navbar-brand').textContent.trim();
    });

    console.log(title);

    await browser.close();
})();
