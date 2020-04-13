const Scraper=require('./scrap')
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("out.csv");
 //change product name according to your need
 //we can also add country name along with productname for more accurate results.
let productName="kulfi";

//No of images you want 
let noOfImages=5;
const google = new Scraper({
  puppeteer: {
      //if yout want to check what is happening behind the script then just change the value of headless -> false.
    headless: true,
  }
});



let data=[]
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    if(Object.keys(data).length>=1)results.push(data)
  })
  .on('end', async() => {
      console.log(results)
     let res=await get(results)
     console.log(results)
     for(let i=0;i<results.length-1;i++){
         let temp=await results[i]
         temp.url1=await res[i][0];
         temp.url2= await res[i][1];
         temp.url3=await res[i][2];
         console.log(temp)
         data.push(temp)

     }
     console.log("why????")
    fastcsv
    .write(data,{ headers: true })
    .pipe(ws);
  });
 
 async function get(arr){
  let res2=[]
  for (const e1 of arr) {
    let e=e1.NAME

  async function res(){
    console.log(e)
    let res1=[]
 try {  
   if(String(e)==undefined) return
   const results = await google.scrape(String(e), noOfImages);
  
     results.forEach(imgUrl=>{
        res1.push(imgUrl.url)
    })}catch(e){
            console.log(e)
    }
    
  return res1;
  };
  let p=await res();
  res2.push(p);
 }
 return res2;
}

