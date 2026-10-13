/*
  FUNCTIONS
  - What Is a Function?
  - User-Defined vs Built In
  - Syntax + Basic Usage
  - Example From Real Life
  - Parameter + Argument
  - Arrow Functions
  - Return
  - Automatic Semicolon Insertion
  - Interrupting a Function
  - Default Parameters
  - Old Strategies
  - ES6 Method Syntax
  - Rest Parameters
  - Random Argument Challenge
  - Anonymous Functions
  - Callbacks
  - setTimeout
  - Function Inside Function / Returning Function
  - Scope
  - Importing / Exporting
*/

// ============================================
// What Is a Function?
// ============================================
/* A function is a reusable block of code that runs only when you call it.
   Write once, use many times. It helps avoid repeating the same code. */

// ============================================
// User-Defined vs Built-In
// ============================================
/* Built-in: already exists in JS (Math.round, console.log, parseInt...).
   User-defined: you create them yourself. */

// ============================================
// Syntax + Basic Usage
// ============================================
function sayHello() {
  console.log("Hello");
}
sayHello(); // call it (without () it would just be the function itself)
sayHello();

// ============================================
// Example From Real Life
// ============================================
// A pizza order might always follow the same steps -> a function for it.
function makePizza() {
  console.log("1. Prepare dough");
  console.log("2. Add sauce and cheese");
  console.log("3. Bake at 220c for 12 min");
}
makePizza();

// ============================================
// Parameter + Argument
// ============================================
/* Parameter: the "slot" written in the definition (num1, num2).
   Argument: the real value you pass when calling (5, 3). */
function add(num1, num2) {
  console.log(num1 + num2);
}
add(5, 3); // 5 and 3 are the arguments

// ============================================
// Practical Example
// ============================================
function greet(name) {
  console.log(`Welcome ${name}`);
}
greet("Osama");
greet("Ismail");

// formatting the net price of a product
function netPrice(price, taxRate = 0.2) {
  return price + price * taxRate;
}
console.log(netPrice(100)); // 120

// ============================================
// Arrow Functions
// ============================================
// Normal function
function normal(x) {
  return x * 2;
}

// Arrow function (the modern way). Replace "function (..) {}" with "(..) =>".
const arrow = (x) => {
  return x * 2;
};

// If a single expression, you can skip {} and return.
const shortArrow = (x) => x * 2;

// One parameter => parentheses can be dropped.
const oneParam = (x) => x * 2;

// Zero parameters => empty parentheses required.
const noParam = () => "hi";

// Arrow with multiple params (parentheses required).
const multiply = (a, b) => a * b;

console.log(normal(3), arrow(3), shortArrow(3), oneParam(3), noParam(), multiply(2, 3));

// Arrow is often passed directly to array methods.
const nums = [1, 2, 3, 4];
console.log(nums.filter((n) => n % 2 === 0)); // [2, 4]

// ============================================
// Return
// ============================================
/* return sends a value back to whoever called the function.
   Code after return inside the same block will never run. */
function getSum(a, b) {
  return a + b;
  console.log("never runs"); // unreachable
}
console.log(getSum(2, 3)); // 5

// ============================================
// Automatic Semicolon Insertion (No Line Terminator Allowed)
// ============================================
/* JS adds a ; automatically at the end of lines.
   So be careful: "return" and its value MUST stay on the same line. */
function broken() {
  return;
  42; // JS inserts a ; after return -> this line is ignored
}
function works() {
  return 42; // same line, fine
}
console.log(broken()); // undefined
console.log(works()); // 42

// ============================================
// Interrupting a Function
// ============================================
function checkRole(role) {
  if (role !== "admin") {
    console.log("Access denied");
    return; // exit the function immediately
  }
  console.log("Welcome admin");
}
checkRole("user"); // Access denied (function stops early)
checkRole("admin"); // Welcome admin

// ============================================
// Default Parameters
// ============================================
function priceWithTax(price, tax = 0.2) {
  return price + price * tax;
}
console.log(priceWithTax(100)); // 120 (tax not passed, default used)
console.log(priceWithTax(100, 0.5)); // 150 (default overridden)

// ============================================
// Parameters Default [Undefined]
// ============================================
// If a parameter has no default and you don't pass it, it is undefined.
function log(x) {
  console.log(x); // undefined
}
log();

// +undefined  => NaN
console.log(priceWithTax(undefined, undefined)); // undefined + undefined * ... => NaN
console.log(10 + undefined); // NaN

// ============================================
// Old Strategies: Condition + Logical Or
// ============================================
// Before default params, people used condition or || to set a fallback.
function oldWay(price) {
  if (price === undefined) price = 0.2;
  console.log(price);
}
oldWay();

function oldWayOr(price) {
  price = price || 0.2; // 0.2 if price is falsy
  console.log(price);
}
oldWayOr();

// ============================================
// ES6 Method Syntax (method inside an object)
// ============================================
const calculator = {
  add(a, b) {
    return a + b;
  },
  sub(a, b) {
    return a - b;
  },
};
console.log(calculator.add(4, 5)); // 9

// ============================================
// Rest Parameters (...)
// ============================================
// ...gathers ALL the remaining arguments into an array.
// Rules: only ONE rest parameter allowed, and it MUST be the last parameter.
function collect(first, ...rest) {
  console.log(first); // 1
  console.log(rest); // [2, 3, 4, 5]
}
collect(1, 2, 3, 4, 5);

function sumAll(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// ============================================
// Random Argument Challenge
// ============================================
/*
  Create function showDetails(a, b, c)
  Params arrive in a RANDOM order, and can be:
  - String  => Name
  - Number  => Age
  - Boolean => Status (true => "Available", false => "Not Available")
  Output depends on the data types. Use ternary conditional operator.
*/
function showDetails(a, b, c) {
  const name = typeof a === "string" ? a : typeof b === "string" ? b : c;
  const age = typeof a === "number" ? a : typeof b === "number" ? b : c;
  const available = typeof a === "boolean" ? a : typeof b === "boolean" ? b : c;

  console.log(`${name}, ${age}, ${available ? "Available" : "Not Available"}`);
}
showDetails("Osama", 38, true); // Osama, 38, Available
showDetails(21, "Sara", false); // Sara, 21, Not Available
showDetails(true, 26, "Ahmed"); // Ahmed, 26, Available

// ============================================
// Anonymous Functions
// ============================================
// A function WITHOUT a name. Stored in a variable or passed directly.
const anon = function () {
  console.log("I have no name");
};
anon();

// ============================================
// Calling Named vs Anonymous
// ============================================
// Named function: hoisted, can be called BEFORE its definition.
sayHi(); // works
function sayHi() {
  console.log("hi");
}

// Anonymous function in a variable: NOT hoisted, must be defined first.
// greet2(); // Error: greet2 is not defined
const greet2 = function () {
  console.log("hi again");
};
greet2();

// ============================================
// Argument To Other Function (Callback)
// ============================================
// Pass a function as an argument so another function can call it later.
function doSomething(callMeBack) {
  console.log("doing work...");
  callMeBack(); // call the passed function
}
doSomething(function () {
  console.log("callback done");
});

// Task without a name: anonymous function passed directly
const numbers2 = [1, 2, 3];
numbers2.forEach(function (n) {
  console.log(n * 10);
});

// ============================================
// setTimeout (run a function later)
// ============================================
// Runs the function once after delay ms. Classic use for anonymous functions.
setTimeout(function () {
  console.log("Ran after 1 second");
}, 1000);

// ============================================
// Function Inside Function / Returning a Function
// ============================================
// A function can be defined inside another (available only there).
function outer() {
  const secret = "42";
  function inner() {
    console.log("inner says:", secret);
  }
  inner(); // inner has access to outer's variables (closure)
}
outer();

// A function can also RETURN another function.
function makeGreeter(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}
const saySalam = makeGreeter("Salam");
saySalam("Osama"); // Salam Osama

// ============================================
// Scope
// ============================================
/*
  - Global scope: variable declared outside any function, visible everywhere.
  - Local/function scope: variable declared inside a function, visible only there.
  - Block scope: let/const inside { } stay inside it.
*/
const globalVar = "global";

function scopeTest() {
  const localVar = "local";
  console.log(globalVar); // ok
  console.log(localVar); // ok
}
scopeTest();
// console.log(localVar); // Error: not defined outside

// ============================================
// Importing / Exporting Functions (modules)
// ============================================
/* Split code into files with export / import.
   Run this only as a module (like with <script type="module"> or node with .mjs),
   plain Node.js needs the file type to be a module. */
export function exportedAdd(a, b) {
  return a + b;
}
// In another file:  import { exportedAdd } from "./09-functions.js";