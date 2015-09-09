/**
 * Created by toby on 3/28/15.
 *
 */


function loadPeopleFromServer(callback) {
   $.get('/loadMatches', function (data) {

      if (callback) {
         callback(data);
      }
   });
}

function initButtons() {
   $('#nextDay').click(nextDay);
   $('#prevDay').click(prevDay);
}

function nextDay() {
   $.get('/nextDay', function(data) {
      var matches = JSON.parse(data);
      fillTable(matches);
   });
}

function prevDay() {
   $.get('/prevDay', function(data) {
      var matches = JSON.parse(data);
      fillTable(matches);
   });
}

function main() {
   initButtons();

   loadPeopleFromServer(function (data) {
      var matches = JSON.parse(data);
      fillTable(matches);
   });

}
main();
