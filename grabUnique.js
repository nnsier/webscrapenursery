const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
const Plant = require('./models/Plant');

const scrape = async () => {
    const res = await axios.get('https://www.nearlynativenursery.com/AdvancedSearch.cfm?searchconditions=Yes')

    let $ = cheerio.load(res.data);

    let numOfIds = $('body > table:nth-child(6) tr').length - 1;
    console.log(`Number of ids is ${numOfIds}`);

    const idArray = [];

    for (let i = 0; i< numOfIds; i++) {
        idArray.push($(`body > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(${i + 2}) > td:nth-child(1) > div:nth-child(1) > b:nth-child(1) > a:nth-child(1)`).text().trim())
    }

    fs.appendFile('plantIds.txt', idArray, (err) => {console.log(err)})
}

scrape();