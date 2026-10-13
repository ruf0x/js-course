/*
  Comparison Operators
  - ==  loose: compares values, converts types automatically (avoid it)
  - === strict: compares values AND types (use it)
  - !=  loose not equal (avoid it)
  - !== strict not equal (use it)
  - > < >= <= work on numbers and strings
*/

console.log(10 == "10"); // true  (string converted to number)
console.log(10 === "10"); // false (types differ)
console.log(10 != "10"); // false
console.log(10 !== "10"); // true
console.log(10 > 5); // true
console.log(10 <= 10); // true

/*
  Always prefer === and !== : they are predictable and avoid hidden bugs.
*/

// Logical operators combine conditions. Each condition is true or false.
const age = 17;
const hasID = true;

// && And: true only if BOTH are true
console.log(age >= 18 && hasID); // false (age fails)

// || Or: true if AT LEAST ONE is true
console.log(age >= 18 || hasID); // true (hasID passes)

// ! Not: flips the result
console.log(!hasID); // false
console.log(!false); // true

/*
  Conditions syntax
*/

// if / else if / else
if (age >= 18 && hasID) {
  console.log("Allowed in");
} else if (age >= 16) {
  console.log("Almost there");
} else {
  console.log("Too young");
}

// switch: many fixed cases, cleaner than long if chains
const day = "mon";
switch (day) {
  case "sat":
  case "sun":
    console.log("Weekend");
    break;
  case "mon":
    console.log("Start of week");
    break;
  default:
    console.log("Any other day");
}

// ternary: one-line if/else
console.log(age >= 18 ? "Adult" : "Minor");

// ternary with nested conditions
// A ternary can go inside a ternary, PHP style. Works, but gets hard to read.

// Bad: nested ternary in ONE line, hard to follow and most linters complain.
const status = age >= 18 ? "Adult" : age >= 16 ? "Teenager" : "Child";

// Recommended: same logic but break the lines so each condition is clear.
const status2 =
  age >= 18
    ? "Adult"
    : age >= 16
      ? "Teenager"
      : "Child";

console.log(status, status2); // "Teenager Teenager"

/*
  Falsy values: false, 0, "" (empty string), null, undefined, NaN
  Everything else is truthy.
*/

/*
  || as a default value (old trick)
  - Returns the left side if it's truthy, otherwise the right side.
  - PROBLEM: 0, "", NaN are falsy, so they get replaced too.
*/
const username = "";
console.log(username || "guest"); // "guest" ("" is falsy)
console.log(0 || "zero?"); // "zero?"  (maybe we actually wanted 0)

/*
  ?? Nullish Coalescing [ES2020]
  - Returns the left side UNLESS it is null/undefined.
  - Only treats null and undefined as "missing", so 0 and "" are kept.
*/
console.log(username ?? "guest"); // "" kept (it is not null)
console.log(null ?? "guest"); // "guest"
console.log(0 ?? "zero?"); // 0 kept, that's better than ||

/*
  && as a guard (left must be true before running the right)
*/
const isLoggedIn = true;
isLoggedIn && console.log("Welcome!"); // prints only if logged in