/**
 * Created by toby on 3/28/15.
 */

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

_.extend(Person.prototype, {
   /**
    * @param {Person} otherPerson
    * @returns {number}
    */
   urgency: function(otherPerson) {
      // TODO: check that we aren't looking at self (same person)?
      if (otherPerson.name === this.name) {
         return 0;
      }

      var i = _.findIndex(this.previousMatches, function(m) {
         return m.hasName(otherPerson.name);
      });

      if (i === -1) {
         return Infinity;
      }
      else {
         return this.previousMatches.length - i;
      }
   },

   /**
    * @param {Person[]} people
    * @returns {Contender}
    */
   mostUrgent: function(people) {
      var highest = null;

      _.each(people, function(person) {
         var res = this.urgency(person);

         if (this.name !== person.name && (highest === null || res > highest.urgency)) {
            //highest = {person: person, urgency: res};
            highest = new Contender(person, res);
         }
      }, this);

      //TODO: can this be null?
      return highest;
   },

   pick: function(person) {
      //TODO: remove previous equal matches, pick client/empathiser properly.
      this.previousMatches.push(new Match(this.name, person.name));
   },

   toStr: function() {
      return this.name + ': [' + _.map(this.previousMatches, function(m) { return m.toStr(this); }, this).join(', ') + ']';
   },

   print: function() {
      console.log(this.toStr());
   }
});

//function Person(name, previousMatches, empathiser) {
//  this.name = name;
//  this.previousMatches = previousMatches || [];
//  this.empathiser = empathiser;
//}
//
//Person.prototype.urgency = function(name) {
//  var i = this.previousMatches.indexOf(name);
//
//  if (i === -1) {
//    return Infinity;
//  }
//  else {
//    return this.previousMatches.length - i;
//  }
//};
//
//Person.prototype.highestUrgency = function(names) {
//  var highest = null;
//
//  _.each(names, function(name) {
//    var res = this.urgency(name);
//
//    if (this.name !== name && (highest === null || res > highest.urgency)) {
//      highest = {name: name, urgency: res};
//    }
//  }, this);
//
//  return highest;
//};
//
//Person.prototype.pick = function(name) {
//  if(_.contains(this.previousMatches, name)) {
//    this.previousMatches = _.without(this.previousMatches, name);
//  }
//  this.previousMatches.push(name);
//  this.empathiser = !this.empathiser;
//};
//
//Person.prototype.print = function() {
//  console.log(this.name + ': { ' + this.previousMatches.join(', ') + ' }');
//};
//
//Person.prototype.latest = function() {
//  return this.name + ' : ' + this.previousMatches[this.previousMatches.length-1];
//};
//
//Person.prototype.toStr = function() {
//  return this.name + ', ' + this.previousMatches.join(', ') + ', ' + this.empathiser + ';';
//};
//
//Person.prototype.toTableRow = function() {
//  var match = this.previousMatches[this.previousMatches.length-1];
//
//  var e = '';
//  if (this.empathiser) {
//    e = ' (empathiser)'
//  }
//
//  return '<tr><td>' + this.name + '</td><td>' + match + e + '</td></tr>';
//};
//
//
//function Match(speaker, listener) {
//  this.speaker = speaker;
//  this.listener = listener;
//}
//
//Match.prototype.equals = function(other) {
//  return this.speaker === other.speaker && this.listener === other.listener;
//};
