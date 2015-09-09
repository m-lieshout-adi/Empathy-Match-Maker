/**
 * Created by tsuggate on 9/09/15.
 */

var _ = require('underscore')._;
var Contender = require('./contender');
var Match = require('./match');

/**
 *
 * @param {string} name
 * @param {Match[]} previousMatches
 * @constructor
 */
function Person(name, previousMatches) {
   /** @type {string} */
   this.name = name;

   /** @type {Match[]} */
   this.previousMatches = previousMatches;
}

/**
 * @param {Person} otherPerson
 * @returns {number}
 */
Person.prototype.urgency = function(otherPerson) {
   if (otherPerson.name === this.name) {
      return 0;
   }

   var i = _.findLastIndex(this.previousMatches, function(m) {
      return m.hasName(otherPerson.name);
   });

   if (i === -1) {
      return Infinity;
   }
   else {
      return this.previousMatches.length - i;
   }
};

/**
 * @param {Person[]} people
 * @returns {Contender}
 */
Person.prototype.mostUrgent = function(people) {
   var highest = null;

   _.each(people, function(person) {
      var res = this.urgency(person);

      if (this.name !== person.name && (highest === null || res > highest.urgency)) {
         highest = new Contender(person, res);
      }
   }, this);

   return highest;
};

/**
 * @param {Person} person
 * @param {number} numOfPeople
 * @returns {void}
 */
Person.prototype.pick = function(person, numOfPeople) {
   var match = new Match(this.name, person.name);

   this.previousMatches.push(match);

   if (this.previousMatches.length > numOfPeople) {
      this.previousMatches.shift();
   }
};

/**
 * @returns {void}
 */
Person.prototype.removeLastMatch = function() {
   this.previousMatches.pop();
};

/**
 * @returns {string}
 */
Person.prototype.toStr = function() {
   return this.name + ': [' + _.map(this.previousMatches, function(m) { return m.toStr(this); }, this).join(', ') + ']';
};

Person.prototype.print = function() {
   console.log(this.toStr());
};

module.exports = Person;
