/**
 * Created by toby on 3/28/15.
 *
 */



//function pickMatches(pool) {
//  if(pool.length > 0) {
//    var names = _.map(pool, function(person) { return person.name; });
//    var highest = null;
//
//    _.each(pool, function(person) {
//      var res = person.highestUrgency(names);
//
//      if (highest === null || res.urgency > highest.urgency) {
//        highest = {person: person, match: res};
//      }
//    });
//
//    highest.person.pick(highest.match.name);
//    var otherPerson = findPerson(pool, highest.match.name);
//    otherPerson.pick(highest.person.name);
//
//    return pickMatches(_.without(pool, highest.person, otherPerson));
//  }
//}
//
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

//function getInputData(editor) {
//  //TODO: if num isn't even, create dummy person called no empathy or something
//
//  var values = editor.getValue();
//  var data = values.replace(/(\r\n|\n|\r)/gm,"").split(';');
//
//  var people = mkPeople(data);
//
//  return people;
//}
//
//function mkPeople(data) {
//  if (data[data.length-1] === '') {
//    data.pop();
//  }
//
//
//  var people = _.map(data, function(d) {
//    var array = d.split(',').map(function(e) { return e.trim(); });
//    var name = array[0];
//    var empathiser = (array[array.length-1]) === 'true';
//    array.shift();
//    array.pop();
//
//    return new Person(name, array, empathiser);
//  });
//
//  return people;
//}

//function setupEditor() {
//  var editor = ace.edit("editor");
//  editor.getSession().setMode('ace/mode/haskell');
//  editor.renderer.setShowGutter(false);
//  editor.setTheme("ace/theme/twilight");
//
//  return editor;
//}

function loadPeopleFromServer(callback) {
  $.get('/loadPeople', function(data) {

    //console.log(data);

    if(callback) {
      callback(data);
    }
  });
}

function fillTable(people) {
  $('#table').find('tr').remove();

  _.each(people, function(person) {
    //if (person.empathiser) {
      $('#table').find('> tbody:last').append(person.toTableRow());
    //}
  });
}

function initButtons() {
  $('#save').click(save);

  //$('#calc').click(function() {
  //  var people = getInputData(editor);
  //
  //  console.log($('#inputVal').val());
  //
  //  chooseDay(people, $('#inputVal').val());
  //
  //  fillTable(people);
  //});
}

function save() {
  var people = getKuraNames();
  var p2 = JSON.stringify(people);

  $.post('/savePeople', {people: p2});
}

function main() {
  initButtons();

  //editor = setupEditor();
  //var people = getKuraNames();
  loadPeopleFromServer(function(data) {
    var people = mkPeopleFromJson(data);
    //console.log(people);

    _.each(people, function(p) {p.print();});
    //var p2 = chooseDay(people, 3);

    //fillTable(people);

    pickMatches(people);
    _.each(people, function(p) {p.print();});


    pickMatches(people);
    _.each(people, function(p) {p.print();});


    pickMatches(people);
    _.each(people, function(p) {p.print();});

    //console.log(people);
    //console.log(data);



  });




}
main();
