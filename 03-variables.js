/*
  Variables: var / let / const
  A variable is a named box that stores a value.
*/

// --- Declaring ---
var a = 1; // old way
let b = 2; // modern way
const c = 3; // constant, cannot be reassigned

// You can declare without a value (undefined until you set it).
let later;
later = 5;
console.log(a, b, c, later);

// --- Reassign vs Redeclare ---
var x = 1;
var x = 2; // var CAN be redeclared (can cause bugs)

let y = 1;
// let y = 2; // Error: let CANNOT be redeclared
y = 3; // but CAN be reassigned

const z = 1;
// z = 2; // Error: const CANNOT be reassigned
// const z = 2; // Error: const CANNOT be redeclared

// --- Scope ---
// var is function-scoped, let/const are block-scoped (block = { }).
if (true) {
  var leaked = "var leaks out";
  let blocked = "stays inside";
}
console.log(leaked); // "var leaks out"
// console.log(blocked); // Error: blocked is not defined

// --- Note ---
// const objects/arrays can still be changed inside, only the variable can't be reassigned.
const user = { name: "Osama" };
user.name = "Ismail"; // allowed
// user = {}; // Error

// Rule of thumb: use const by default, let only when the value changes, avoid var.

/*
  Data Types
  A variable's type is decided by its value.
*/
console.log(typeof "Osama"); // string
console.log(typeof 5000); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined

/*
  Arrays
  - A list of values, indexed from 0.
  - Can hold mixed types: strings, numbers, objects, even arrays.
  - typeof an array is "object" (arrays are a special kind of object).
*/
const fruits = ["apple", "banana", "orange"];

console.log(fruits); // the whole array
console.log(fruits[0]); // first item: "apple"
console.log(fruits[2]); // third item: "orange"
console.log(fruits.length); // number of items: 3
console.log(fruits[fruits.length - 1]); // last item: "orange"

// Useful way to build arrays: add/remove from the end or start.
const numbers = [1, 2, 3];
numbers.push(4); // add to the end   => [1, 2, 3, 4]
numbers.pop(); // remove from the end  => [1, 2, 3]
numbers.unshift(0); // add to the start => [0, 1, 2, 3]
numbers.shift(); // remove from the start => [1, 2, 3]

// Search inside an array.
console.log(numbers.includes(2)); // true
console.log(numbers.indexOf(2)); // position 1 (-1 if not found)

// Mixed array example.
const mixed = ["Osama", 17, true, { city: "Cairo" }, [1, 2]];
console.log(mixed[3].city); // "Cairo"
console.log(mixed[4][0]); // 1

/*
  Objects
  - Store data as key: value pairs.
  - Useful to describe a real thing (user, product, car...).
  - typeof an object is "object".
*/
const user2 = {
  name: "Osama",
  age: 17,
  country: "EG",
};

// Access values with dot notation or bracket notation.
console.log(user2.name); // "Osama"
console.log(user2["age"]); // 17

// The key can be a variable in bracket notation.
const key = "country";
console.log(user2[key]); // "EG"

// Change or add keys.
user2.age = 18; // change
user2.city = "Cairo"; // add
console.log(user2);

// Objects can hold functions and other objects.
const car = {
  brand: "Toyota",
  specs: { hp: 130, color: "red" },
  start: () => "Engine on",
};
console.log(car.specs.hp); // 130
console.log(car.start()); // "Engine on"

// --- Dynamic typing ---
// In JS, the same variable can change type over time. First it's a number, then a string, etc.
let value = 42; // number
value = "hello"; // now a string
value = true; // now a boolean
value = [1, 2]; // now an array

/*
  This sounds flexible, but it's not as good as it sounds:
  - Bugs appear at runtime, not when you write the code.
  - A function can receive the wrong type and only fail later (or worse, silently misbehave).
  - Example: adding is supposed to work with numbers, but a string slips in and you get "1020" instead of 30.
*/
const total = (a, b) => a + b;
console.log(total(10, 20)); // 30, good
console.log(total(10, "20")); // "1020", wrong, no error was given

/*
  For safety, JS has strict checks you can use at runtime:
  - typeof  -> tells you the type of a value
  - Number.isInteger / Array.isArray -> specific checks
*/
console.log(typeof "hi" === "string"); // true
console.log(Array.isArray(value)); // true

// That's also why TypeScript exists: it protects types at write-time so mistakes
// are caught before the code runs.
