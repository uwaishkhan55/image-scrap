const Scraper=require('./scrap')
 //change product name according to your need
 //we can also add country name along with productname for more accurate results.
let productName="kulfi";

//No of images you want 
let noOfImages=5;
const google = new Scraper({
  puppeteer: {
      //if yout want to check what is happening behind the script then just change the value of headless -> false.
    headless: false,
  }
});
 
(async () => {
  const results = await google.scrape(productName, noOfImages);
  let i=1;
  results.forEach(imgUrl=>{
      console.log(i++ +". "+imgUrl.url)
  })
})();