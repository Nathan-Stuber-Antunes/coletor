const puppeteer = require("puppeteer");
(async () => {
  let url = "https://www.airbnb.com.br/rooms/29032498?adults=1&children=0&infants=0&pets=0&check_in=2023-01-22&check_out=2023-01-27&source_impression_id=p3_1671996931_5awRn5eHQ5NpSuek";
  const browser = await puppeteer.launch(url);
  const page = await browser.newPage();
  await page.goto(url);
  data = await page.evaluate(() => {
    root = Array.from(document.querySelectorAll("#FMP-target [itemprop='itemListElement']"));
    hotels = root.map(hotel => ({
      Name: hotel.querySelector('ol').parentElement.nextElementSibling.textContent,
      Photo: hotel.querySelector("img").getAttribute("src")
    }));
    return hotels;
  });
  console.log(data);
  await browser.close();
})();