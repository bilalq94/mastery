// app/models/users.js

// grab the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  facebookId: String,
  email: String,
  password: String,
  experience: [{
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity'
    }
    hours: {
      type: Number,
      default: 0
    },
    start: Date,
    end: Date
  }],
  accomplishments: [{
    type: Schema.Types.ObjectId,
    ref: 'Accomplishment'
  }],
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

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var user = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = user;