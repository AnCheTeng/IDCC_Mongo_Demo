var fs = require('fs');
var YouBike = require('./YouBike');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demoDB');

fs.readFile('./youbike.json', {encoding: 'utf-8'}, function(err, data) {
  if (!err) {
    YouBike.addNewData(data);
  } else {
    console.log(err);
  }
});
