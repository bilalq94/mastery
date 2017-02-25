// app/models/accomplishments.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var accomplishmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
accomplishmentSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var accomplishment = mongoose.model('Accomplishment', accomplishmentSchema);

// make this available to our accomplishment in our Node applications
module.exports = accomplishment;