/**
 * Created by tsuggate on 9/09/15.
 */

var fs = require('fs.extra');
var Person = require('./person');
var Match = require('./match');
var _ = require('underscore')._;
var matchMaker = require('./match-maker');

var _people = null;
var _names = null;

var historyFile = '/../_state/history.json';
var namesFile = '/../_state/names.json';

function copyTemplateDataIfNeeded() {
   fs.readFile(__dirname + historyFile, function(err, data) {
      if (err) {
         console.log('no historyFile; copying template');
         fs.copy(__dirname + '/../public/default_state/history.json', __dirname + historyFile);
      }
   });
   fs.readFile(__dirname + namesFile, function(err, data) {
      if (err) {
         console.log('no namesFile; copying template');
         fs.copy(__dirname + '/../public/default_state/names.json', __dirname + namesFile);
      }
   });
}

function load(callback) {
   fs.readFile(__dirname + historyFile, function(err, data) {
      if (err) {
         throw err;
      }
      _people = mkPeopleFromJson(data.toString());

      loadNames(function() {
         syncNamesAndHistory(function() {
            callback(_people);
         });
      });
   });
}

function getLastModifiedDate(callback) {
   fs.stat(__dirname + historyFile, function(err, data) {
      if (err) {
         throw err;
      }
      callback(data);
   });
}

function loadNames(callback) {
   fs.readFile(__dirname + namesFile, function(err, data) {
      if (err) {
         throw err;
      }
      _names = JSON.parse(data.toString());

      callback(_names);
   });
}

function syncNamesAndHistory(callback) {
   deleteHistoryOfRemovedNames();
   addNewNamesToHistory();

   save();
   callback();
}

function deleteHistoryOfRemovedNames() {
   _people = _.filter(_people, function(p) {
      return _.some(_names, function(n) {
         return p.name === n;
      });
   });
}

function addNewNamesToHistory() {
   _.each(_names, function(n) {
      if (!_.some(_people, function(p) {
            return p.name === n;
         })) {
         _people.push(new Person(n, []));
      }
   });
}

function save() {
   if (!_people)
      return;

   fs.writeFile(__dirname + historyFile, JSON.stringify(_people, null, 3), function (err) {
      if (err) {
         throw err;
      }
      console.log('saved to history.json');
   });

   printPeople();
}

function makeMatches () {
   _people = _.shuffle(_people);
   matchMaker.resetLowestUrgency();
   matchMaker.calcMatches(_people, _people.length);
}

function nextDay() {
   makeMatches();
   console.log('lowestUrgency: ', matchMaker.getLowestUrgency());

   var numAttempts = 0;

   // Algorithm can still produce bad results sometimes, if so, try again.
   while (matchMaker.getLowestUrgency() < 2 && numAttempts < 20) {
      console.log('remaking matches for day');
      prevDay();

      makeMatches();
      numAttempts++;
   }
}

function prevDay() {
   _.each(_people, function(p) {
      p.removeLastMatch();
   });
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

module.exports.copyTemplateDataIfNeeded = copyTemplateDataIfNeeded;
module.exports.load = load;
module.exports.save = save;
module.exports.nextDay = nextDay;
module.exports.prevDay = prevDay;
module.exports.getMatches = getMatches;
module.exports.getLastModifiedDate = getLastModifiedDate;
