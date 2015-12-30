var fs = require('fs');
var YouBike = require('./YouBike');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demoDB');

fs.readFile('./youbike.json', {encoding: 'utf-8'}, function(err, data) {
  if (!err) {

    var youbike_per_minute = JSON.parse(data);
    var length = Object.keys(youbike_per_minute.retVal).length;
    var one_item = 0;

    YouBike.findOne({mday: youbike_per_minute.retVal["0001"].mday}, function(err, youbike_data) {
      if (!youbike_data) {

        for (var i = 1; i <= length; i++) {
          one_item = youbike_per_minute.retVal[addZero(i, 4)];
          //===========================Store into Database===========================
          var new_bike = new YouBike(one_item);
          new_bike.save();
          //===========================Store into Database===========================
        }
      }
    });

  } else {
    console.log(err);
  }
});


function addZero(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}
