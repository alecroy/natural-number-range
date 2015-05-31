'use strict';

var chai = require('chai');
var expect = chai.expect;

var range = require('..');
expect(range).to.not.be.null;

describe('the natural-number-range module (as \'range\')', function() {
  it('range.inclusive(1, 10) lists the numbers [1 .. 10]', function() {
    expect(range.inclusive(1, 10).length).to.equal(10);
    expect(range.inclusive(1, 10)[0]).to.equal(1);
    expect(range.inclusive(1, 10)[9]).to.equal(10);
  });

  it('range.exclusive(1, 9) lists the numbers [1 .. 9]', function() {
    expect(range.exclusive(1, 10).length).to.equal(9);
    expect(range.exclusive(1, 10)[0]).to.equal(1);
    expect(range.exclusive(1, 10)[8]).to.equal(9);
  });

  it('range.below(10) lists the numbers [1 .. 9]', function() {
    expect(range.below(10).length).to.equal(9);
    expect(range.below(10)[0]).to.equal(1);
    expect(range.below(10)[8]).to.equal(9);
  });
});

