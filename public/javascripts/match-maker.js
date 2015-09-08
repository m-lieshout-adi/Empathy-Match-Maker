

/*

TODO: handle odd numbers of people


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


  //if(pool.length > 0) {
  //  var names = _.map(pool, function(person) { return person.name; });
  //  var highest = null;
  //
  //  _.each(pool, function(person) {
  //    var res = person.highestUrgency(names);
  //
  //    if (highest === null || res.urgency > highest.urgency) {
  //      highest = {person: person, match: res};
  //    }
  //  });
  //
  //  highest.person.pick(highest.match.name);
  //  var otherPerson = findPerson(pool, highest.match.name);
  //  otherPerson.pick(highest.person.name);
  //
  //  return pickMatches(_.without(pool, highest.person, otherPerson));
  //}


}

//function findPerson(people, name) {
//  return _.find(people, function(person) {
//    return person.name === name;
//  });
//}
//
//function chooseDay(people, num) {
//  for (var i = 0; i < num; i++) {
//    pickMatches(people.slice(0));
//  }
//
//  return _.map(people, function(person) {
//    return person.latest();
//  });
//}


function mkPeopleFromJson(data) {
  return _.map(JSON.parse(data), function(e) {
    return new Person(e.name, e.matches);
  });
}

