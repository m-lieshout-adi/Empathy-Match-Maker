/**
 * Created by tsuggate on 9/09/15.
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

/**
 * @param {string} name
 * @returns {boolean}
 */
Match.prototype.hasName = function(name) {
   return this.client === name || this.empathiser === name;
};


/**
 * @param {Match} other
 * @returns {boolean}
 */
Match.prototype.equivalent = function(other) {
   return this.empathiser === other.empathiser && this.client === other.client
      || this.empathiser === other.client && this.client === other.empathiser;
};

/**
 * @param {Person} person
 * @returns {string}
 */
Match.prototype.toStr = function(person) {
   return person.name === this.empathiser ? this.client : this.empathiser;
};


module.exports = Match;