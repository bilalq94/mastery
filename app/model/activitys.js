// app/models/activitys.js

// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var activitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'Skill'
  },
  description: String,
  created_at: Date,
  modified_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the modified_at field to current date
  this.modified_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var activity = mongoose.model('Activity', activitySchema);

// make this available to our activity in our Node applications
module.exports = activity;