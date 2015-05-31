var Range = require('./range');

console.log('' + new Range(1, 10));
console.log('' + new Range.inclusive(1, 10));
console.log('' + new Range.exclusive(1, 10));
console.log('' + new Range.upto(5));
console.log('' + new Range.below(5));
