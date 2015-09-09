/**
 * Created by tsuggate on 9/09/15.
 */

var fs = require('fs');
var Person = require('./person');
var Match = require('./match');
var _ = require('underscore')._;
var matchMaker = require('./match-maker');

var _people = null;

function load(callback) {
   fs.readFile(__dirname + '/../public/people.json', function(err, data) {
      if (err) {
         throw err;
      }
      _people = mkPeopleFromJson(data.toString());

      if (noMatches()) {
         nextDay();
      }

      callback(_people);
   });
}

function save() {
   fs.writeFile(__dirname + '/../public/people.json', JSON.stringify(_people, null, 3), function (err) {
      if (err) {
         throw err;
      }
      console.log('saved to people.json');
   });
}

function nextDay() {
   matchMaker.calcMatches(_people);
   save();
}

function getMatches() {
   return matchMaker.getMatches(_people);
}

function mkPeopleFromJson(data) {
   return _.map(JSON.parse(data), function(e) {
      var matches = _.map(e.previousMatches, function(m) {
         return new Match(m.empathiser, m.client);
      });

      return new Person(e.name, matches);
   });
}

function printPeople() {
   _.each(_people, function(p) {p.print();});
}

function noMatches() {
   return _people && _people[0].previousMatches.length === 0;
}

module.exports.load = load;
module.exports.save = save;
module.exports.nextDay = nextDay;
module.exports.getMatches = getMatches;