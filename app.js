'use strict';

var range = require('./');

console.dir(range(1000, 1000000, {scale: Math.sqrt(10)}));
// [ 1000, 3162, 10000, 31622, 100000, 316227, 1000000 ]

console.dir(range(1000, 1, {scale: Math.sqrt(10)}));

console.dir(range(-5, -1, {scale: 2}));
console.dir(range(-5, 5, {scale: 2}));
