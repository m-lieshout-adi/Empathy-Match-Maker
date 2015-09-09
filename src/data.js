/**
 * Created by tsuggate on 9/09/15.
 */

var fs = require('fs');
var Person = require('./person');
var Match = require('./match');
var _ = require('underscore')._;
var matchMaker = require('./match-maker');

var _people = null;
var _names = null;

function load(callback) {
   fs.readFile(__dirname + '/../public/history.json', function(err, data) {
      if (err) {
         throw err;
      }
      _people = mkPeopleFromJson(data.toString());
      loadNames(syncNamesAndHistory);

      callback(_people);
   });
}

function loadNames(callback) {
   fs.readFile(__dirname + '/../public/names.json', function(err, data) {
      if (err) {
         throw err;
      }
      _names = data.toString();

      callback(_names);
   });
}

function syncNamesAndHistory() {
   console.log('before: ', _people.length);

   _people = _.filter(_people, function(p) {
      return _.some(_names, function(n) {
         return p.name === n;
      });
   });

   console.log('after: ', _people.length);

   //_.each(_names, function(n) {
   //   if (!_.some())
   //});
}

//function makeNames() {
//   var names = ["a", "b", "c", "d", "e", "f", "g", "h"];
//
//   fs.writeFile(__dirname + '/../public/names.json', JSON.stringify(names, null, 3), function (err) {
//      if (err) {
//         throw err;
//      }
//      console.log('saved to names.json');
//   });
//}
//makeNames();

function save() {
   fs.writeFile(__dirname + '/../public/history.json', JSON.stringify(_people, null, 3), function (err) {
      if (err) {
         throw err;
      }
      console.log('saved to history.json');
   });
}

function nextDay() {
   matchMaker.calcMatches(_people);
   save();
}

function prevDay() {
   _.each(_people, function(p) {
      p.removeLastMatch();
   });
   save();
}

function getMatches() {
   if (noMatches()) {
      nextDay();
   }

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
module.exports.prevDay = prevDay;
module.exports.getMatches = getMatches;