/*
  Loops
  - for: when you know how many times (most common)
  - while: when you don't know, but have a condition to stop
  - do while: runs at least once, then checks the condition
  - for...of: loop over array/string items
  - for...in: loop over object keys
*/

// --- for: 3 parts: start; condition; step ---
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

// counting down
for (let i = 5; i > 0; i--) {
  console.log(i); // 5 4 3 2 1
}

// skip with continue, stop with break
for (let i = 0; i < 10; i++) {
  if (i === 5) continue; // skip 5
  if (i === 8) break; // stop at 8
  console.log(i); // 0 1 2 3 4 6 7
}

// sum of 1..100
let total = 0;
for (let i = 1; i <= 100; i++) {
  total += i;
}
console.log(total); // 5050

// loop over an array by index
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`);
}

// --- while: check condition BEFORE each round ---
let count = 0;
while (count < 3) {
  console.log("while", count);
  count++;
}
// use a flag to stop instead of counting
let running = true;
let tries = 0;
while (running) {
  tries++;
  console.log(`try #${tries}`);
  if (tries >= 3) running = false; // stop condition
}

// --- do while: runs ONCE first, then checks ---
let n = 0;
do {
  console.log("do while always runs once", n);
  n++;
} while (n < 2);

// --- for...of: loop directly over items of an array/string ---
for (const fruit of fruits) {
  console.log(fruit);
}
for (const char of "JS") {
  console.log(char); // "J" then "S"
}

// --- for...in: loop over object keys ---
const user = { name: "Osama", age: 17, country: "EG" };
for (const key in user) {
  console.log(`${key} => ${user[key]}`);
}

// --- Nested loops ---
// inner loop completes fully for EACH round of the outer loop
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i}x${j} = ${i * j}`);
  }
  // prints a row, then moves to next i
}

// nested loops with arrays (matrix)
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
];
for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`[${row}][${col}] = ${matrix[row][col]}`);
  }
}

// nested while inside for
for (let i = 1; i <= 3; i++) {
  let stars = "";
  while (stars.length < i) {
    stars += "*";
  }
  console.log(stars); // builds a triangle: *, **, ***
}

// ============================================
// Recursion (a function that calls itself instead of looping)
// ============================================
/*
  Every recursion needs:
  - Base case: when to STOP (the loop's exit condition)
  - Recursive case: call itself with a smaller/simpler input
  Without a base case -> infinite recursion -> "Maximum call stack" error.
*/

// countdown using a loop
for (let i = 3; i > 0; i--) console.log(i);

// same thing with recursion
function countdown(n) {
  if (n === 0) return; // base case: stop
  console.log(n);
  countdown(n - 1); // recursive case: smaller input
}
countdown(3); // 3 2 1

// factorial: n! = n * (n-1) * ... * 1   (classic recursion example)
function factorial(n) {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120

// sum of numbers 1..n
function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1);
}
console.log(sumTo(100)); // 5050 (same as the loop version)

// reverse a string
function reverse(str) {
  if (str === "") return "";
  return reverse(str.slice(1)) + str[0];
}
console.log(reverse("hello")); // "olleh"

// flatten a nested array (hard without recursion)
function flatten(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item)); // recurse into the nested array
    } else {
      result.push(item);
    }
  }
  return result;
}
console.log(flatten([1, [2, [3, [4, 5]], 6]])); // [1, 2, 3, 4, 5, 6]

// Fibonacci: 0, 1, 1, 2, 3, 5, 8...
function fib(n) {
  if (n <= 1) return n; // base case
  return fib(n - 1) + fib(n - 2); // two recursive calls
}
console.log(fib(7)); // 13

/*
  Loop vs Recursion
  - Loops are usually faster and use less memory.
  - Recursion is cleaner for nested/tree structures (files, menus, JSON...).
  - Deep recursion can overflow the call stack; use a loop if it goes too deep.
*/

