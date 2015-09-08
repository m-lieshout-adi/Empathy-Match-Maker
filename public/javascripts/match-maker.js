

/*

TODO: handle odd numbers of people:

Add nobody person when there's an odd number of people. check for and remove if
numbers become even.



 */

function pickMatches(people) {
  if (people.length > 0) {
    var highest = null;

    _.each(people, function(person) {
      /** @type {Contender} */
      var contender = person.mostUrgent(people);

      if (highest === null || contender.urgency > highest.urgency) {
        highest = {person: person, contender: contender};
      }
    });

    highest.person.pick(highest.contender.person);
    highest.contender.person.pick(highest.person);

    // RECURSE
    return pickMatches(_.without(people, highest.person, highest.contender.person));
  }

}


function mkPeopleFromJson(data) {
  return _.map(JSON.parse(data), function(e) {
    return new Person(e.name, e.matches);
  });
}

