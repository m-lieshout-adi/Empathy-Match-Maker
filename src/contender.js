/**
 * Created by tsuggate on 9/09/15.
 */

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

module.exports = Contender;