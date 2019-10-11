const mongoose = require('mongoose');

const plantsArray = require('./plantArray2');

console.log(plantsArray);

plantsArray.forEach(plant => console.log(plant.id));