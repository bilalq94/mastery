// seed.js

// Import functionalities
var mongoose = require('mongoose');
var async = require('async');

// Import models/seed values
var seed = require('./data/seed');
var Accomplishment = require('./app/models/accomplishments');
var Activity = require('./app/models/activitys');
var Milestone = require('./app/models/milestones');
var Skill = require('./app/models/skills');

module.exports = {
  seedAccomplishment: function(accomplishment, callback) {
    var a = new Accomplishment(accomplishment);

    a.save(function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },

  seedActivity: function(activity, callback) {
    var a = new Activity(activity);

    a.save(function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },

  seedMilestone: function(milestone, callback) {
    var m = new Milestone(milestone);

    m.save(function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },

  seedSkill: function(skill, callback) {
    var s = new Skill(skill);

    s.save(function(err) {
      if(err) {
        callback(err);
      }

      callback(null);
    });
  },

  seedItems: function(seed_arr, model, seedItem, callback) {
    var items = seed_arr;

    model.count({}, function(err, num) {
      if(num == 0) {
        console.log('seeding items into DB...');
        console.log(items);

        async.each(items, seedItem, function(err) {
          if(err) {
            callback(err);
          }
          callback(null);
        });
      } else {
        callback(null);
      }
    });
  },

  seedDB: function() {
    var start = Date.now();

    async.waterfall([
      function(callback) {
        module.exports.seedItems(
          seed.seedValues.accomplishments,
          Accomplishment,
          module.exports.seedAccomplishment,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seed.seedValues.skills,
          Skill,
          module.exports.seedSkill,
          callback
        );
      },
      function(callback) {
        module.exports.seedItems(
          seed.seedValues.milestones,
          Milestone,
          module.exports.seedMilestone,
          callback
        );
      }
      function(callback) {
        module.exports.seedItems(
          seed.seedValues.activitys,
          Activity,
          module.exports.seedActivity,
          callback
        );
      }
    ], function(err) {
      if(err) {
        console.log(err);
      }
      console.log('\nSync has completed in ' + (Date.now()-start)/1000 + 's.\n');
    });
  }
};