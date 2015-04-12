
function pickMatches(pool) {
  if(pool.length > 0) {
    var names = _.map(pool, function(person) { return person.name; });
    var highest = null;

    _.each(pool, function(person) {
      var res = person.highestUrgency(names);

      if (highest === null || res.urgency > highest.urgency) {
        highest = {person: person, match: res};
      }
    });

    highest.person.pick(highest.match.name);
    var otherPerson = findPerson(pool, highest.match.name);
    otherPerson.pick(highest.person.name);

    return pickMatches(_.without(pool, highest.person, otherPerson));
  }
}

function findPerson(people, name) {
  return _.find(people, function(person) {
    return person.name === name;
  });
}

function chooseDay(people, num) {
  for (var i = 0; i < num; i++) {
    pickMatches(people.slice(0));
  }

  return _.map(people, function(person) {
    return person.latest();
  });
}


