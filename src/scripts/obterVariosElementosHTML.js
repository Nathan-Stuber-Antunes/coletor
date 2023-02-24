const puppeteer = require("puppeteer");
let titles, elements, elementsArray;

module.exports = async function getHTMLElements() {
  const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://en.wikipedia.org/wiki/Web_scraping");
    titles = await page.evaluate(() => {
      elements = document.querySelectorAll('h2 .mw-headline');
      elementsArray = Array.from(elements);
      return elementsArray.map(element => element.textContent)
    });

    console.log(titles);
    await browser.close();
}