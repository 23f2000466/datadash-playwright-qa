const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 59 + i);
const baseUrl = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `${baseUrl}${seed}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', cells =>
      cells.map(cell => parseFloat(cell.textContent.trim())).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((acc, val) => acc + val, 0);
    console.log(`Sum for seed ${seed}: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`TOTAL SUM: ${totalSum}`);
  await browser.close();
})();
