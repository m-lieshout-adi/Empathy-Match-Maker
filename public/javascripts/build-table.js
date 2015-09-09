/**
 * Created by tsuggate on 9/09/15.
 */



function fillTable(matches) {
   $('#table').find('tr').remove();

   _.each(matches, function(m) {
      $('#table').find('> tbody:last').append(makeRow(m));
   });
}

function makeRow(match) {
   return '<tr><td>' + match.empathiser + '</td><td>' + match.client + '</td></tr>';
}