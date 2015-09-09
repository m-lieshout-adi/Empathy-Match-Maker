/**
 * Created by tsuggate on 9/09/15.
 */

var Person = require('./person');
var _ = require('underscore')._;



/**
 * NOTE: Recursive, mutates people.
 *
 * @param {Person[]} people
 * @returns {void}
 */
function calcMatches(people) {
   if (people.length > 0) {
      var highest = null;

      _.each(people, function (person) {
         /** @type {Contender} */
         var contender = person.mostUrgent(people);

         if (highest === null || contender.urgency > highest.urgency) {
            highest = {person: person, contender: contender};
         }
      });

      highest.person.pick(highest.contender.person);
      highest.contender.person.pick(highest.person);

      // RECURSE
      return calcMatches(_.without(people, highest.person, highest.contender.person));
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

      if (!_.some(matches, function(m) {
            return m.equivalent(lastMatch);
         })) {
         matches.push(lastMatch);
      }
   });

   return matches;
}


module.exports.calcMatches = calcMatches;
module.exports.getMatches = getMatches;