'use strict';

var chai = require('chai');
var expect = chai.expect;

var Range = require('..');
expect(Range).to.not.be.null;

describe('the natural-number-range module (as \'Range\')', function() {
  it('new Range() is an empty list', function() {
    expect(new Range().range.length).to.equal(0);
    expect(new Range().range).to.eql([]);
  });

  it('new Range(10) is a list of 10 numbers [1 .. 10]', function() {
    expect(new Range(10).range.length).to.equal(10);
    expect(new Range(10).range).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('new Range(7, 9) is a list of 3 numbers [7 .. 9]', function() {
    expect(new Range(7, 9).range.length).to.equal(3);
    expect(new Range(7, 9).range).to.eql([7, 8, 9]);
  });

  it('new Range(1, 10, 2) is a list of 5 numbers [1, 3, 5, 7, 9]', function() {
    expect(new Range(1, 10, 2).range.length).to.equal(5);
    expect(new Range(1, 10, 2).range).to.eql([1, 3, 5, 7, 9]);
  });

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

  it('Range.upto(10) lists the numbers [1 .. 10]', function() {
    expect(Range.upto(10).range.length).to.equal(10);
    expect(Range.upto(10).range[0]).to.equal(1);
    expect(Range.upto(10).range[9]).to.equal(10);
  });

  it('Range.below(10) lists the numbers [1 .. 9]', function() {
    expect(Range.below(10).range.length).to.equal(9);
    expect(Range.below(10).range[0]).to.equal(1);
    expect(Range.below(10).range[8]).to.equal(9);
  });

  it('Range.upto(10).by(2) lists the 5 numbers [1, 3, 5, 7, 9]', function() {
    expect(Range.upto(10).by(2).range.length).to.equal(5);
    expect(Range.upto(10).by(2).range).to.eql([1, 3, 5, 7, 9]);
  });

  it('Range.below(10).by(2) lists the 5 numbers [1, 3, 5, 7, 9]', function() {
    expect(Range.below(10).by(2).range.length).to.equal(5);
    expect(Range.below(10).by(2).range).to.eql([1, 3, 5, 7, 9]);
  });
});

