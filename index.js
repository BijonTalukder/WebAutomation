const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();


    await page.goto('https://www.google.com', { waitUntil: 'load', timeout: 0 });


    await page.waitForSelector('#APjFqb', { visible: true });


    await page.type('#APjFqb', 'puppeteer');


    await page.keyboard.press('Enter');


    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });


    const results = await page.evaluate(() => {
        let items = document.querySelectorAll('h3');
        let results = [];
        items.forEach(item => {
            let linkElement = item.closest('a');
            if (linkElement) {
                results.push({
                    title: item.innerText,
                    link: linkElement.href
                });
            }
        });
        return results;
    });


    console.log(results);

    // await browser.close();
}

main();
