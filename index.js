'use strict';

function Range(from, upto) {
  this.range = [];

  if (from !== undefined) {
    if (upto !== undefined) {
      this.range = Range.inclusive(from, upto).range;
    } else {
      this.range = Range.upto(from).range;
    }
  }
}

Range.inclusive = function(from, upto) {
  var r = new Range();
  for (; upto >= from; upto--) {
    r.range.unshift(upto);
  }
  return r;
};

Range.exclusive = function(from, upto) {
  var r = new Range();
  for (upto--; upto >= from; upto--) {
    r.range.unshift(upto);
  }
  return r;
};

Range.upto = function(upto) {
  return Range.inclusive(1, upto);
};

Range.below = function(below) {
  return Range.exclusive(1, below);
};

Range.prototype.toString = function() {
  return '[' + this.range.join(', ') + ']';
};

module.exports = Range;
