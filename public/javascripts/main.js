/**
 * Created by toby on 3/28/15.
 *
 */


function loadPeopleFromServer(callback) {
  $.get('/loadPeople', function(data) {

    if(callback) {
      callback(data);
    }
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
  //var people = getKuraNames();
  //var p2 = JSON.stringify(people);

  //$.post('/savePeople', {people: p2});
}

function main() {
  initButtons();

  loadPeopleFromServer(function(data) {
    var matches = JSON.parse(data);

    console.log(matches);

    fillTable(matches);


  });

}
main();
