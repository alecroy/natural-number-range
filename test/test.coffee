'use strict'

chai = require 'chai'
expect = chai.expect

range = require '..'
expect(range).to.not.be.null

describe 'range = require(\'natural-number-range\')', ->
  it 'range(..) returns an Array', ->
    expect(Array.prototype.isPrototypeOf range()).to.be.true
  it 'range() is an empty array, []', ->
    expect(range()).to.eql []

  describe 'it counts standard additive ranges: N, N+d, N+2d, ..', ->
    it 'range(5) is [1, 2, 3, 4, 5]', ->
      expect(range 5).to.eql [1, 2, 3, 4, 5]
    it 'range(7, 9) is [7, 8, 9]', ->
      expect(range 7, 9).to.eql [7, 8, 9]
    it 'range(1, 10, {step: 2}) is [1, 3, 5, 7, 9]', ->
      expect(range 1, 10, step: 2).to.eql [1, 3, 5, 7, 9]

    describe 'it rounds fractions below the unrounded upper bound', ->
      it 'range(1, 3.1) is [1, 2, 3]: round(2 + 1) <= 3.1', ->
        expect(range 1, 3.1).to.eql [1, 2, 3]
      it 'range(1, 2.9) is [1, 2]: round(2 + 1) > 2.9', ->
        expect(range 1, 2.9).to.eql [1, 2]
      it 'range(1.0, 2.0, {step: 0.5}) is [1, 2, 2]: (1.0, 1.5, 2.0)', ->
        expect(range 1, 2, step: 0.5).to.eql [1, 2, 2]
      it 'range(1.0, 1.9, {step: 0.5}) is [1]: round(1.5) > 1.9', ->
        expect(range 1, 1.9, step: 0.5).to.eql [1]
      it 'range(0.7, 2, 0.5) is [1, 1, 2, 2]: (0.7.. 1.7 2.2)', ->
        expect(range 0.7, 2, step: 0.5).to.eql [1, 1, 2, 2]
      it 'range(0.7, 1.9, {step: 0.5}) is [1, 1]: round(1.7) > 1.9', ->
        expect(range 0.7, 1.9, step: 0.5).to.eql [1, 1]

  describe 'it counts logarithmic ranges: N, s*N, s^2*N, s^3*N..', ->
    it 'range(1, 10, {scale: 2}) is [1, 2, 4, 8]', ->
      expect(range 1, 10, scale: 2).to.eql [1, 2, 4, 8]
    it 'range(1, 10, {scale: sqrt(10)}) is [1, 3, 10]', ->
      expect(range 1, 10, scale: Math.sqrt 10).to.eql [1, 3, 10]
    it 'range(1, 1000000, {scale: sqrt(10)}) is [1 .. 1,000,000]', ->
      oneToMillion = [1, 3, 10, 31, 100, 316, 1000, 3162,
                      10000, 31622, 100000, 316227, 1000000]
      expect(range 1, 1000000, scale: Math.sqrt 10).to.eql oneToMillion

    describe 'it rounds fractions below the unrounded upper bound', ->
      it 'range(1, 9.9, {scale: sqrt(10)}) is [1, 3]', ->
        expect(range 1, 9.9, scale: Math.sqrt 10).to.eql [1, 3]
      it 'range(1, 10.1, {scale: sqrt(10)}) is [1, 3, 10]', ->
        expect(range 1, 10.2, scale: Math.sqrt 10).to.eql [1, 3, 10]