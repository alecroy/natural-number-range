'use strict';

var chai = require('chai');
var expect = chai.expect;

var Range = require('..');
expect(Range).to.not.be.null;

describe('the natural-number-range module (as \'Range\')', function() {
  it('Range.inclusive(1, 10) lists the numbers [1 .. 10]', function() {
    expect(Range.inclusive(1, 10).range.length).to.equal(10);
    expect(Range.inclusive(1, 10).range[0]).to.equal(1);
    expect(Range.inclusive(1, 10).range[9]).to.equal(10);
  });

  it('Range.exclusive(1, 9) lists the numbers [1 .. 9]', function() {
    expect(Range.exclusive(1, 10).range.length).to.equal(9);
    expect(Range.exclusive(1, 10).range[0]).to.equal(1);
    expect(Range.exclusive(1, 10).range[8]).to.equal(9);
  });

  it('Range.below(10) lists the numbers [1 .. 9]', function() {
    expect(Range.below(10).range.length).to.equal(9);
    expect(Range.below(10).range[0]).to.equal(1);
    expect(Range.below(10).range[8]).to.equal(9);
  });
});

