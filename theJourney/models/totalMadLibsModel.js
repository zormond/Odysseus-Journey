var mongoose = require('mongoose');

var totalMadLibSchema = mongoose.Schema({
  _id: Date,
  user: String,
  totalMadLib: String,
});

exports.totalMadLib = mongoose.model('totalMadLib', totalMadLibSchema);