/**
 * Created by tsuggate on 9/09/15.
 */

var Person = require('./person');
//var Match = require('./match');
//var Contender = require('./contender');
var _ = require('underscore')._;


function pickMatches(dataStr) {
   var people = mkPeopleFromJson(dataStr);


   for (var i = 0; i < 19; i++) {
      calcMatches(people);
   }

   _.each(people, function(p) {p.print();});
}

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


function mkPeopleFromJson(data) {
   return _.map(JSON.parse(data), function(e) {
      return new Person(e.name, e.matches);
   });
}


module.exports.pickMatches = pickMatches;