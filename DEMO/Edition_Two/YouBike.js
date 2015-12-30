var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YouBike = new Schema({
  sno: String,
  sna: String,
  tot: String,
  sbi: String,
  sarea: String,
  mday: String,
  lat: String,
  lng: String,
  ar: String,
  sareaen: String,
  snaen: String,
  aren: String,
  bemp: String,
  act: String
}, {
  versionKey: false
});


YouBike.statics.addNewData = function(NewData) {

  var youbike_per_minute = JSON.parse(NewData);
  var length = Object.keys(youbike_per_minute.retVal).length;
  var one_item = 0;
  var that = this;
  // Check if the NewData is really new
  this.findOne({mday: youbike_per_minute.retVal["0001"].mday}, function(err, youbike_data) {
    if (!youbike_data) {

      for (var i = 1; i <= length; i++) {
        one_item = youbike_per_minute.retVal[addZero(i, 4)];
        //===========================Store into Database===========================
        var new_bike = new that(one_item);
        new_bike.save();
        //===========================Store into Database===========================
      }
    }
  });

}


YouBike.statics.removeAllData = function() {
  this.remove({}, function(){});
}

YouBike.statics.removeBySno = function(sno) {
  if (typeof sno != 'string'){
    sno = sno.toString();
  }
  this.remove({"sno"=sno}, function(){});
}

function addZero(num, n) {
  var len = num.toString().length;
  while (len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}


module.exports = mongoose.model('YouBike', YouBike);
