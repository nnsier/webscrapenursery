const mongoose = require('mongoose');

const plantsArray = require('./plantArray2');
const plantIds = require('./plantIds');

console.log(plantsArray);

const smallerPlantIds = plantsArray.map(plant => parseInt(plant.id));

const largePlantArray = [...plantIds, ...smallerPlantIds];

// console.log(largePlantArray);

// console.log(smallerPlantIds);

console.log([ ...new Set(largePlantArray)]);