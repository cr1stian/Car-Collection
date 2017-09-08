const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cars = require('./carSchema');

//pulling in middleware
app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/cars');

//grabbing and Sorting Database by year
app.get('/', function(request, response) {
  Cars.find().sort('year').then(function(cars) {
    response.render('index', {
      cars: cars
    })
  })
})

//grabbing input values from form
app.post('/collection', function(request, response){
  var car = new Cars()
    car.make = request.body.make
    car.model = request.body.model
    car.year = request.body.year
    car.image = request.body.image
    car.engine = request.body.engine

//saving values to Database
    car.save().then(function(car){ //then function to keep user on same page
        response.redirect('/')
      }).then(function(cars){ //then function to display updated Database
      response.render('/', {
        cars: cars
      })
    })
})
// destroying database
app.post('/delete', function(request, response){
  Cars.deleteOne({
    '_id': request.body.id
  }).then(function(cars){
    response.redirect('/')
  }).catch(function(err){
    throw err
  })

})




app.listen(3000, function(){
  console.log("I'm up and Running")
})
