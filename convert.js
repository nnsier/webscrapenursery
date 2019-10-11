const fsPromises = require('fs').promises;
const fs = require('fs');
const mongoose = require('mongoose');
const Plant = require('./mongoose/Plant');

mongoose.connect("mongodb://localhost/nearlyNative", { useNewUrlParser: true });

const argument = process.argv[2];
let file;

if (!argument) {
  file = 'plantArray2.js';
} else {
  file = argument;
}


const lireFile = async (file) => {
  const readFile = await fsPromises.readFile(file, { encoding: 'utf8' });
  console.log(typeof readFile);
  
  // await readFile.forEach(element => console.log(element.id));
  // const plantObj = JSON.parse(readFile);
  // console.log(plantObj);
  // await Plant.create(plantObj, (err) => {
  //   if (err) { console.log(err) }
  // })
}


lireFile(file);