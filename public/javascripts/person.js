/**
 * Created by toby on 3/28/15.
 *
 */

function Person(name, previousMatches, empathiser) {
  this.name = name;
  this.previousMatches = previousMatches || [];
  this.empathiser = empathiser;
}

Person.prototype.urgency = function(name) {
  var i = this.previousMatches.indexOf(name);

  if (i === -1) {
    return Infinity;
  }
  else {
    return this.previousMatches.length - i;
  }
};

Person.prototype.highestUrgency = function(names) {
  var highest = null;

  _.each(names, function(name) {
    var res = this.urgency(name);

    if (this.name !== name && (highest === null || res > highest.urgency)) {
      highest = {name: name, urgency: res};
    }
  }, this);

  return highest;
};

Person.prototype.pick = function(name) {
  if(_.contains(this.previousMatches, name)) {
    this.previousMatches = _.without(this.previousMatches, name);
  }
  this.previousMatches.push(name);
  this.empathiser = !this.empathiser;
};

Person.prototype.print = function() {
  console.log(this.name + ': { ' + this.previousMatches.join(', ') + ' }');
};

Person.prototype.latest = function() {
  return this.name + ' : ' + this.previousMatches[this.previousMatches.length-1];
};

Person.prototype.toStr = function() {
  return this.name + ', ' + this.previousMatches.join(', ') + ', ' + this.empathiser + ';';
};

Person.prototype.toTableRow = function() {
  var match = this.previousMatches[this.previousMatches.length-1];

  var e = '';
  if (this.empathiser) {
    e = ' (empathiser)'
  }

  return '<tr><td>' + this.name + '</td><td>' + match + e + '</td></tr>';
};


function Match(speaker, listener) {
  this.speaker = speaker;
  this.listener = listener;
}

Match.prototype.equals = function(other) {
  return this.speaker === other.speaker && this.listener === other.listener;
};
