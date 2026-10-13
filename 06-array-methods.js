/*
  Array Methods
  - Methods that modify: push, pop, shift, unshift, splice, sort, reverse.
  - Methods that DON'T modify: slice, concat, indexOf, includes.
  - Loop/map methods: forEach, map, filter, reduce (they run a function on each item).
*/

// --- Add / remove items ---
const nums = [1, 2, 3];
nums.push(4); // add to the end    => [1, 2, 3, 4]
nums.pop(); // remove from the end => [1, 2, 3]
nums.unshift(0); // add to the start => [0, 1, 2, 3]
nums.shift(); // remove from the start => [1, 2, 3]
console.log(nums);

// splice(start, count): remove OR insert items in the middle
const letters = ["a", "b", "c", "d", "e"];
letters.splice(1, 2, "X"); // at index 1, remove 2 items, insert "X"
console.log(letters); // ["a", "X", "e"]

// --- Search ---
const fruits = ["apple", "banana", "apple"];
console.log(fruits.indexOf("apple")); // 0 (first match)
console.log(fruits.lastIndexOf("apple")); // 2
console.log(fruits.includes("banana")); // true
console.log(fruits.find((f) => f.length > 5)); // "banana" (first item that passes the test)
console.log(fruits.findIndex((f) => f === "apple")); // 0

// --- Copy without modifying ---
const sliceCopy = fruits.slice(0, 2); // ["apple", "banana"]
console.log(sliceCopy);
const joined = fruits.join(" - "); // "apple - banana - apple"
console.log(joined);
const copied = [...fruits]; // copy with spread
console.log(copied);

// --- Order ---
const mix = [3, 1, 2];
console.log(mix.sort()); // [1, 2, 3]
console.log(mix.reverse()); // [3, 2, 1]
const scores = [10, 200, 5];
console.log(scores.sort((a, b) => a - b)); // [5, 10, 200] (numeric sort)

// --- Loop methods (run a function on each item) ---
const numbers = [1, 2, 3, 4];

// forEach: do something for each item (returns nothing)
let sum = 0;
numbers.forEach((n) => (sum += n));
console.log(sum); // 10

// map: transform each item into a new array
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]

// filter: keep only items that pass the test
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [2, 4]

// reduce: take all items and reduce them to one value
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(total); // 10

// some / every: test the items
console.log(numbers.some((n) => n > 3)); // true (at least one)
console.log(numbers.every((n) => n > 0)); // true (all)

// find existing objects
const users = [
  { id: 1, name: "Osama" },
  { id: 2, name: "Ismail" },
];
console.log(users.find((u) => u.id === 2)); // { id: 2, name: "Ismail" }