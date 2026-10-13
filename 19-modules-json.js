/*
  MODULES (import / export) + JSON
  - Modules let you split code into files and share pieces between them.
  - JSON is a text format to store/transport data (used by APIs & localStorage).
*/

// ============================================
// MODULES
// ============================================
/*
  Two syntaxes exist:
  - ES Modules (modern): export / import        <- use this
  - CommonJS  (old Node): module.exports / require

  ES Modules need the file to be treated as a module:
  - Browser: <script type="module" src="app.js"></script>
  - Node:    file extension .mjs, or "type": "module" in package.json
*/

// --- NAMED exports: many things from one file ---
// file: math.js
export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
export const square = (n) => n * n;

// file: app.js
// import { add, square, PI } from "./math.js";
// console.log(add(1, 2), square(3), PI);

// rename on import
// import { add as sum } from "./math.js";

// import everything as one object (namespace)
// import * as math from "./math.js";
// console.log(math.add(1, 2), math.PI);

// --- DEFAULT export: ONE main thing per file ---
// file: utils.js
export default function greet(name) {
  return `Hello ${name}`;
}

// import a default (any name you like, no braces)
// import greet from "./utils.js";

// mix default + named
// import greet, { PI as pi } from "./utils.js";

// --- export later / together ---
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
export { sub, mul };

// --- CommonJS (old Node way) ---
// const { add } = require("./math.js");       // import
// module.exports = { add, sub };              // export

// ============================================
// JSON (JavaScript Object Notation)
// ============================================
/*
  - A STRING format to store/transfer data (APIs, config, localStorage, cookies).
  - Looks like a JS object but stricter.
  - Keys MUST be double-quoted. No functions, no comments, no trailing commas.
  - Types allowed: string, number, boolean, null, array, object.
*/

// JS object
const person = { name: "Osama", age: 38, skills: ["JS", "CSS"], active: true };

// Converting object -> JSON string
const jsonString = JSON.stringify(person);
console.log(jsonString); // '{"name":"Osama","age":38,...}'
console.log(typeof jsonString); // "string"

// Pretty print with indentation
console.log(JSON.stringify(person, null, 2));

// Ignore certain keys or transform values
console.log(JSON.stringify(person, ["name", "age"])); // only these keys
console.log(JSON.stringify(person, (key, value) => (typeof value === "string" ? value.toUpperCase() : value)));

// Converting JSON string -> object
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // "Osama"
console.log(parsed.skills[0]); // "JS"

// Nested JSON
const nested = '{"user":{"name":"Sara"},"items":[1,2,3]}';
console.log(JSON.parse(nested).user.name); // "Sara"

// ============================================
// JSON in real use
// ============================================
// localStorage (must be a string)
const settings = { theme: "dark", fontSize: 14 };
localStorage.setItem("settings", JSON.stringify(settings));

const loaded = JSON.parse(localStorage.getItem("settings"));
console.log(loaded.theme); // "dark"

// reading from an API (response is JSON text)
/*
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json(); // res.json() = JSON.parse of the response
  console.log(users[0].name);
}
*/

// deep copy trick (works when there are no functions/dates)
const deepCopy = JSON.parse(JSON.stringify(person));
deepCopy.name = "Copy";
console.log(person.name, deepCopy.name); // "Osama" "Copy"

/*
  Note: JSON.stringify/parse DROPS undefined values and functions, and turns
  Date into a string. Use structuredClone() for real deep copies now.
*/