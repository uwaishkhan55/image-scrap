const Scraper = require("./scrap");
const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const fastcsv = require("fast-csv");

//change product name according to your need
//we can also add country name along with productname for more accurate results.
let productName = "kulfi";

//No of images you want
let noOfImages = 3;
const google = new Scraper({
  puppeteer: {
    //if yout want to check what is happening behind the script then just change the value of headless -> false.
    headless: false,
  },
});
if (process.argv[2] === undefined) {
  console.log(
    "**************************Enter valid csv>*****************************"
  );
  process.exit();
}
let in_file_csv = process.argv[2];

let data = [];
fs.createReadStream(in_file_csv)
  .pipe(csv())
  .on("data", (data) => {
    if (Object.keys(data).length >= 1) results.push(data);
  })
  .on("end", async () => {
    console.log(results);
    let res = await get(results);
    // console.log("***********************************************************");
    // console.log(res);
    // console.log("***********************************************************");
    for (let i = 0; i < results.length; i++) {
      let temp = await results[i];
      temp.URL1 = await res[i][0];
      temp.URL2 = await res[i][1];
      temp.URL3 = await res[i][2];

      console.log(temp);
      data.push(temp);
    }
    // console.log("***********************************************************");
    // console.log(data);
    // console.log("***********************************************************");
    // put hash here
    const out_put_file = fs.createWriteStream(in_file_csv);
    fastcsv.write(data, { headers: true }).pipe(out_put_file);
  });

async function get(arr_of_row_in_CSV) {
  let All_images_url_in_2D_array = [];
  for (const row of arr_of_row_in_CSV) {
    let dish_name = row.dish_name;
    // if (String(row.URL1) !== "") continue;
    async function res() {
      console.log(dish_name);
      let result_from_google = [];
      try {
        const reposnseFromGoogle = await google.scrape(
          String(dish_name),
          noOfImages
        );

        reposnseFromGoogle.forEach((imgUrl) => {
          result_from_google.push(imgUrl.url);
        });
      } catch (err) {
        try {
          const reposnseFromGoogle = await google.scrape(
            String(dish_name),
            noOfImages
          );

          reposnseFromGoogle.forEach((imgUrl) => {
            result_from_google.push(imgUrl.url);
          });
        } catch (err) {
          console.log(err);
        }
      }

      return result_from_google;
    }

    let p = await res();
    All_images_url_in_2D_array.push(p);
  }
  return All_images_url_in_2D_array;
}
