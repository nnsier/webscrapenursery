const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
const Plant = require('./models/Plant');

const getPlant = async (id, file) => {
  const secondResponse = await axios.get(`https://www.nearlynativenursery.com/PlantsDetail.cfm?ID=${id}`)
  $ = cheerio.load(secondResponse.data);

  const title = $('body > form:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > u:nth-child(1) > font:nth-child(1) > b:nth-child(1) > font:nth-child(1) > font:nth-child(1)').text().trim()

  let tableLength = $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) tr').length;

  let category = $('body > form:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > font:nth-child(1) > strong:nth-child(1)').text().trim();

  let zone = $('body > form:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > div:nth-child(1) > strong:nth-child(2) > font:nth-child(1)').text().trim();

  let commonName = $('body > form:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > font:nth-child(1) > strong:nth-child(1)').text().trim();

  let variety = $('body > form:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)').text().trim()

  let regionalNames = $('body > form:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim();

  let botanicalName = $('body > form:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()

  let description = $('body > form:nth-child(1) > table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()

  let notes = $('body > form:nth-child(1) > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()

  const soilPH = [];
  let acid = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('acid') : null;
  let neutral = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('neutral') : null;
  let alkaline = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('alkaline') : null;
  const soilType = [];
  let clay = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('clay') : null;
  let average = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('average') : null;
  let sand = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('sand') : null;
  const water = [];
  let dry = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('dry') : null;
  let waterAverage = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('average') : null;
  let wet = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('wet') : null;
  const sunlight = [];
  let full = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('full') : null;
  let partial = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('partial') : null;
  let shade = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('shade') : null;
  const foliage = [];
  let evergreen = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('Evergreen') : null;
  let semiEvergreen = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('semiEvergreen') : null;
  let deciduous = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('deciduous') : null;
  let image = $('body > form:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > div:nth-child(1) > img:nth-child(1)').attr('src');
  let pricesTableLength = $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) tr').length;


  let prices = []
  for (let i = 0; i < pricesTableLength - 1; i++) {
    prices.push({

      quantity: $(`body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(${2 + i}) > td:nth-child(1) > div:nth-child(1) > strong:nth-child(1)`).text().trim(),
      price: $(`body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(${2 + i}) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1)`).text().trim()
    })
  }
  const plantObj = new Plant(id, title, category, zone, commonName, variety, regionalNames, botanicalName, description, notes, soilPH, soilType, water, sunlight, foliage, image, prices)


  let plantJSON = JSON.stringify(plantObj);

  fs.appendFile(file, plantJSON, (err) => { console.log(err) })
}

const scrape = async () => {

  const res = await axios.get('https://www.nearlynativenursery.com/AdvancedSearch.cfm?searchconditions=Yes');
  let $ = cheerio.load(res.data);

  let numOfIds = $('body > table:nth-child(6) tr').length - 1;
  console.log(`Number of ids is ${numOfIds}`);

  const id = $(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim();
  const idArray = []
  for (let i = 0; i < numOfIds; i++) {
    idArray.push($(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(${i + 2}) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim())
  }

  idArray.forEach(id => {
    getPlant(id, 'plants.txt');
  })


}

// getPlant(287, 'plant3.txt');
scrape();

// axios.get('https://www.nearlynativenursery.com/AdvancedSearch.cfm?searchconditions=Yes').then(response => {
//   let $ = cheerio.load(response.data);

//   const id = $(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim();

//   console.log(id);
//   return id;




//   // const idArray = []
//   // for (let i = 0; i < 501; i++) {
//   //   idArray.push($(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(${i + 2}) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim())
//   // }
//   // console.log(idArray);
// }).then(id => {
//   //switching out id for one with an image is 617
//   //gotta figure out lazy-loading for image
//   axios.get(`https://www.nearlynativenursery.com/PlantsDetail.cfm?ID=617`).then(response => {
//     let $ = cheerio.load(response.data);

//     const title = $('body > form:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > u:nth-child(1) > font:nth-child(1) > b:nth-child(1) > font:nth-child(1) > font:nth-child(1)').text().trim()
//     console.log(title);
//     let tableLength = $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) tr').length;
//     console.log(tableLength);
//     let category = $('body > form:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > font:nth-child(1) > strong:nth-child(1)').text().trim();
//     console.log(category);
//     let zone = $('body > form:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4) > div:nth-child(1) > strong:nth-child(2) > font:nth-child(1)').text().trim();
//     console.log(zone);
//     let commonName = $('body > form:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > font:nth-child(1) > strong:nth-child(1)').text().trim();
//     console.log(commonName);
//     let variety = $('body > form:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)').text().trim()
//     console.log(variety);
//     let regionalNames = $('body > form:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim();
//     console.log(regionalNames);
//     let botanicalName = $('body > form:nth-child(1) > table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()
//     console.log(botanicalName);
//     let description = $('body > form:nth-child(1) > table:nth-child(5) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()
//     console.log(description);
//     let notes = $('body > form:nth-child(1) > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > strong:nth-child(1) > font:nth-child(1)').text().trim()
//     console.log(notes);
//     const soilPH = [];
//     let acid = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('acid') : null;
//     let neutral = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('neutral') : null;
//     let alkaline = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilPH.push('alkaline') : null;
//     const soilType = [];
//     let clay = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('clay') : null;
//     let average = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('average') : null;
//     let sand = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(5) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? soilType.push('sand') : null;
//     const water = [];
//     let dry = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('dry') : null;
//     let waterAverage = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('average') : null;
//     let wet = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(8) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? water.push('wet') : null;
//     const sunlight = [];
//     let full = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('full') : null;
//     let partial = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('partial') : null;
//     let shade = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(11) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? sunlight.push('shade') : null;
//     const foliage = [];
//     let evergreen = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('Evergreen') : null;
//     let semiEvergreen = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('semiEvergreen') : null;
//     let deciduous = $('body > form:nth-child(1) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(14) > div:nth-child(1) > strong:nth-child(1) > font:nth-child(1)').text().trim() === 'Y' ? foliage.push('deciduous') : null;
//     let image = $('body > form:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3) > div:nth-child(1) > img:nth-child(1)').attr('src');
//     console.log(image);
//     console.log(soilPH);
//     console.log(soilType);
//     console.log(water);
//     console.log(sunlight);
//     console.log(foliage);
//     let pricesTableLength = $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) tr').length;
//     console.log(pricesTableLength);
//     let prices = []
//     for (let i = 0; i < pricesTableLength - 1; i++) {
//       prices.push({
//         [
//           $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > strong:nth-child(1)').text().trim()
//         ]: $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > div:nth-child(1) > strong:nth-child(1)').text().trim()
//       })
//     }
//     console.log(prices);

//   })
// })

// const id = $(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(${i + 2}) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim();


// axios.get('https://www.nearlynativenursery.com/PlantsDetail.cfm?ID=669').then(response => {
//   let $ = cheerio.load(response.data);
//   let tableLength = $('body > form:nth-child(1) > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) tr').length;
//   console.log(tableLength);

// })

// body > table: nth - child(6) > tbody: nth - child(1) > tr: nth - child(2) > td: nth - child(1) > div: nth - child(1) > b: nth - child(1) > a: nth - child(1)

// const getFull= (id, callback) => {
//   request.get('https://www.nearlynativenursery.com/AdvancedSearch.cfm?searchconditions=Yes'), (
//     error, response, data
//     ) => {
//       const $ = cheerio.load(data);
//       callback(error, {
//         id: $("body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)")
//         .text()
//         .trim()
//       })
//     }
// }


// body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)

// body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)