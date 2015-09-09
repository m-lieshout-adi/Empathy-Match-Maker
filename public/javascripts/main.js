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
   $('#calc').click(function () {
      nextDay();
   });
}

function nextDay() {
   $.get('/nextDay', function(data) {
      var matches = JSON.parse(data);

      console.log(matches);

      fillTable(matches);
   });
}

function main() {
   initButtons();

   loadPeopleFromServer(function (data) {
      var matches = JSON.parse(data);

      console.log(matches);

      fillTable(matches);


   });

}
main();
