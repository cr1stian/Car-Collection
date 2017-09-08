const mongoose = require('mongoose');


const newCar = new mongoose.Schema({
  make: {type: String},
  model: {type: String},
  year: {type: Number},
  image: {type: String},
  engine: {type: String}
})

const Car = mongoose.model('Car', newCar);

module.exports = Car;
