const fsPromises = require('fs').promises;
const mongoose = require('mongoose');
const Plant = require('./mongoose/Plant');

mongoose.connect("mongodb://localhost/nearlyNative", { useNewUrlParser: true });

const file = process.argv[2];

const lireFile = async (file) => {
  const readFile = await fsPromises.readFile(file, { encoding: 'utf8' });
  const plantObj = JSON.parse(readFile);
  console.log(plantObj);
  await Plant.create(plantObj, (err) => {
    if (err) { console.log(err) }
  })
}


// lireFile('plant3.txt');