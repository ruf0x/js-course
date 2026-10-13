/*
  Math Object
  Math gives you ready-made math functions and constants (no import needed).
*/

// round(): nearest integer
console.log(Math.round(3.4)); // 3
console.log(Math.round(3.5)); // 4 (0.5 goes up)

// floor(): always rounds DOWN
console.log(Math.floor(3.9)); // 3
console.log(Math.floor(-3.1)); // -4

// ceil(): always rounds UP
console.log(Math.ceil(3.1)); // 4
console.log(Math.ceil(-3.9)); // -3

// min() / max(): smallest / biggest of the values
console.log(Math.min(10, 5, 20, 3)); // 3
console.log(Math.max(10, 5, 20, 3)); // 20

// pow(): base ** exponent
console.log(Math.pow(2, 4)); // 16 (same as 2 ** 4)

// random(): random number from 0 (included) up to 1 (excluded)
console.log(Math.random()); // e.g. 0.7823...

// Common trick: random integer between 1 and max
const randomInt = (max) => Math.floor(Math.random() * max) + 1;
console.log(randomInt(10)); // random 1-10

// trunc() [ES6]: removes the decimal part, no rounding
console.log(Math.trunc(3.9)); // 3
console.log(Math.trunc(-3.9)); // -3 (stays -3, unlike floor which gives -4)