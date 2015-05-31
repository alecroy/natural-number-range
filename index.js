'use strict';

function Range(from, upto, skip) {
  this.range = [];

  if (from !== undefined) {
    if (upto !== undefined) {
      if (skip !== undefined) {
        this.range = Range.inclusive(from, upto, skip).range;
      } else {
        this.range = Range.inclusive(from, upto).range;
      }
    } else {
      this.range = Range.upto(from).range;
    }
  }
}

Range.inclusive = function(from, upto, skip) {
  var r = new Range();
  skip = skip || 1;
  upto -= (upto - from) % skip; // Adjust upper bound down to fit
  for (; upto >= from; upto -= skip) {
    r.range.unshift(upto);
  }
  return r;
};

Range.exclusive = function(from, upto, skip) {
  return Range.inclusive(from, upto - 1, skip);
};

Range.upto = function(upto) {
  return Range.inclusive(1, upto);
};

Range.below = function(below) {
  return Range.exclusive(1, below);
};

Range.prototype.by = function(skip) {
  return new Range(this.range[0], this.range[this.range.length - 1], skip);
};

Range.prototype.toString = function() {
  return '[' + this.range.join(', ') + ']';
};

module.exports = Range;
