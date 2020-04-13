const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto('https://www.google.com/imghp');
  await page.type(".gLFyf","BANANA",{delay:100})
  await page.click(".Tg7LZd")
  await page.waitForNavigation()
  
  await page.tap(".ssfWCe")
  await page.waitFor(1000)
  const example = await page.$$('.xFo9P');
  await example[2].click();
  const btn2= await page.$$(".igM9Le")
  await btn2[2].click();
  await page.waitForNavigation()
  const imagesTag=await page.$$('.rg_i');

    
  console.log(imagesTag.length)
//   const imagesUrl=await page.$$(".")

  await page.waitFor(5000)
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();