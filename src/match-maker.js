/**
 * Created by tsuggate on 9/09/15.
 */

var Person = require('./person');
var _ = require('underscore')._;



var _lowestUrgency = Infinity;

/**
 * NOTE: Recursive, mutates people.
 *
 * @param {Person[]} people
 * @param {number} numOfPeople
 * @returns {void}
 */
function calcMatches(people, numOfPeople) {
   if (people.length > 0) {
      var highest = null;

      _.each(people, function (person) {
         /** @type {Contender} */
         var contender = person.mostUrgent(people);

         if (highest === null || contender.urgency > highest.urgency) {
            highest = {person: person, contender: contender};
         }
      });

      console.log(highest.contender.urgency);

      if (highest.contender.urgency < _lowestUrgency) {
         _lowestUrgency = highest.contender.urgency;
      }

      highest.person.pick(highest.contender.person, numOfPeople);
      highest.contender.person.pick(highest.person, numOfPeople);

      // RECURSE
      return calcMatches(_.without(people, highest.person, highest.contender.person), numOfPeople);
   }
}

/**
 * @param {Person[]} people
 * @returns {Match[]}
 */
function getMatches(people) {
   var matches = [];

   _.each(people, function(p) {
      var lastMatch = _.last(p.previousMatches);

      if (lastMatch && !_.some(matches, function(m) {
            return m.equivalent(lastMatch);
         })) {
         matches.push(lastMatch);
      }
   });

   return matches;
}

function getLowestUrgency() {
   return _lowestUrgency;
}

function resetLowestUrgency() {
   _lowestUrgency = Infinity;
}


module.exports.calcMatches = calcMatches;
module.exports.getMatches = getMatches;
module.exports.getLowestUrgency = getLowestUrgency;
module.exports.resetLowestUrgency = resetLowestUrgency;
