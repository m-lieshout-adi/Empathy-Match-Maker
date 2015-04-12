/**
 * Created by toby on 3/28/15.
 *
 */

function getKuraNames() {

  var ns = {
    samPaulin: 'Sam Paulin',
    rick: 'Rick',
    james: 'James',
    john: 'John',
    peterSuggate: 'Peter Suggate',
    peterBromley: 'Peter Bromley',
    samPayton: 'Sam Payton',
    sarah: 'Sarah',
    phil: 'Phil',
    toby: 'Toby',
    markSharma: 'Mark Sharma',
    aidan: 'Aidan',
    aaron: 'Aaron',
    morgan: 'Morgan',
    matt: 'Matt',
    rua: 'Rua'
  };

  //TODO: order is backwards?
  var people = [
    new Person(ns.samPaulin, [ns.matt, ns.morgan], false),
    new Person(ns.rick, [ns.rua, ns.matt], false),
    new Person(ns.james, [ns.phil, ns.rua], false),
    new Person(ns.john, [ns.toby, ns.phil], false),
    new Person(ns.peterSuggate, [ns.markSharma, ns.toby], false),
    new Person(ns.peterBromley, [ns.aidan, ns.markSharma], false),
    new Person(ns.samPayton, [ns.aaron, ns.aidan], false),
    new Person(ns.sarah, [ns.morgan, ns.aaron], false),
    new Person(ns.phil, [ns.james, ns.john], true),
    new Person(ns.toby, [ns.john, ns.peterSuggate], true),
    new Person(ns.markSharma, [ns.peterSuggate, ns.peterBromley], true),
    new Person(ns.aidan, [ns.peterBromley, ns.samPayton], true),
    new Person(ns.aaron, [ns.samPayton, ns.sarah], true),
    new Person(ns.morgan, [ns.sarah, ns.samPaulin], true),
    new Person(ns.matt, [ns.samPaulin, ns.rick], true),
    new Person(ns.rua, [ns.rick, ns.james], true)
  ];

  return people;
}



