/*
  Higher-Order Functions (HOF)
  - A function that takes another function as an argument (or returns one).
  - That "inner" function is a callback, called once per item.
  - Your code says WHAT to do with each item, the HOF handles the looping.
*/

const numbers = [1, 2, 3, 4, 5, 6];

// ============================================
// forEach: run a function for each item (no return, no new array)
// ============================================
let total = 0;
numbers.forEach((n) => (total += n));
console.log(total); // 21

// ============================================
// map: transform EVERY item, returns a NEW array (same length)
// ============================================
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]

// map DOES NOT touch the original array
console.log(numbers); // still [1, 2, 3, 4, 5, 6]

// real example: array of users -> array of names only
const users = [
  { name: "Osama", age: 38 },
  { name: "Sara", age: 21 },
  { name: "Ahmed", age: 26 },
];
const names = users.map((user) => user.name);
console.log(names); // ["Osama", "Sara", "Ahmed"]

// ============================================
// filter: keep ONLY items that pass the test, returns a NEW array
// ============================================
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [2, 4, 6]

const older = users.filter((user) => user.age > 25);
console.log(older); // Osama and Ahmed

// ============================================
// reduce: fold ALL items into ONE value
// ============================================
// reduce(callback, initialValue). callback gets (accumulator, current).
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 21

// count how many items match
const countEven = numbers.reduce((acc, n) => (n % 2 === 0 ? acc + 1 : acc), 0);
console.log(countEven); // 3

// build an object: group by key
const grouped = users.reduce((acc, user) => {
  const key = user.age > 25 ? "seniors" : "juniors";
  if (!acc[key]) acc[key] = [];
  acc[key].push(user.name);
  return acc;
}, {});
console.log(grouped); // { seniors: ["Osama", "Ahmed"], juniors: ["Sara"] }

// ============================================
// some / every: just answer true/false about the items
// ============================================
console.log(numbers.some((n) => n > 4)); // true (at least one)
console.log(numbers.every((n) => n < 10)); // true (all)

// ============================================
// find / findIndex: find the FIRST item that matches
// ============================================
console.log(numbers.find((n) => n > 4)); // 5
console.log(numbers.findIndex((n) => n > 4)); // 4 (its position)

// ============================================
// sort: order items (modifies the original array!)
// ============================================
const arr = [3, 10, 1];
// default sort is by string, so 10 comes before 3
console.log([...arr].sort()); // [1, 10, 3]
// correct numeric sort
console.log([...arr].sort((a, b) => a - b)); // [1, 3, 10] ascending
console.log([...arr].sort((a, b) => b - a)); // [10, 3, 1] descending

// ============================================
// Chaining (compose HOFs together)
// ============================================
// Get the sum of all even numbers squared.
const result = numbers
  .filter((n) => n % 2 === 0) //   [2, 4, 6]
  .map((n) => n * n) //         [4, 16, 36]
  .reduce((acc, n) => acc + n, 0); // 56
console.log(result); // 56

// ============================================
// Converting to HOFs (example: from for loop to HOF)
// ============================================
// The old way
const olds = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) olds.push(numbers[i]);
}
console.log(olds); // [2, 4, 6]

// The HOF way (same result, one line)
console.log(numbers.filter((n) => n % 2 === 0)); // [2, 4, 6]