const fsPromises = require('fs').promises;
const fs = require('fs');
const mongoose = require('mongoose');
const Plant = require('./mongoose/Plant');

mongoose.connect("mongodb://localhost/nearlyNative", { useNewUrlParser: true });

const argument = process.argv[2];
let file;

if (!argument) {
  file = 'plantArray.js';
} else {
  file = argument;
}


const lireFile = async (file) => {
  const readFile = await fsPromises.readFile(file, { encoding: 'utf8' });
  const plantArray = readFile.replace(/ \\n         /g, '');
  fs.appendFile('plantArray2.js', plantArray, (err) => {
    if (err) throw err;
    console.log('the data was appended');
  })
  // const plantObj = JSON.parse(readFile);
  // console.log(plantObj);
  // await Plant.create(plantObj, (err) => {
  //   if (err) { console.log(err) }
  // })
}


lireFile(file);