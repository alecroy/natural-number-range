'use strict';

exports.inclusive = function(from, upto) {
  var l = [];
  for (; upto >= from; upto--) {
    l.unshift(upto);
  }
  return l;
};

exports.exclusive = function(from, upto) {
  var l = [];
  for (upto--; upto >= from; upto--) {
    l.unshift(upto);
  }
  return l;
};

exports.below = function(below) {
  return exports.exclusive(1, below);
};

