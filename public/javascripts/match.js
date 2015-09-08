/**
 * Created by tsuggate on 8/09/15.
 */
/**
 * @param {string} empathiser
 * @param {string} client
 * @constructor
 */
function Match(empathiser, client) {
   /** @type string */
   this.empathiser = empathiser;

   /** @type string */
   this.client = client;
}

_.extend(Match.prototype, {
   hasName: function(name) {
      return this.client === name || this.empathiser === name;
   },

   toStr: function(person) {
      return person.name === this.empathiser ? this.client : this.empathiser;
   }
});


/**
 *
 * @param {Person} person
 * @param {number} urgency
 * @constructor
 */
function Contender(person, urgency) {
   /** @type {Person} */
   this.person = person;

   /** @type {number} */
   this.urgency = urgency;
}