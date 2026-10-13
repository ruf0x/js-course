/*
  Printing & Concatenation & Template Literals
*/

// --- Printing ---
// console.log() prints values to the console (F12 or right click inspect in the browser, or the terminal in Node.js).
console.log("Hello");

// You can print several values at once, separated by commas.
console.log("Hello", "World", 2026);

// --- Concatenation (the old way) ---
// Join strings together using the + operator.
const firstName = "Ismail";
const lastName = "Ali";

console.log("Hello " + firstName + " " + lastName);

// Numbers get converted to strings when added to a string.
console.log("Age: " + 17);

// Adding numbers before a string keeps the math, order matters.
console.log(10 + 20 + " total"); // "30 total"
console.log("total " + 10 + 20); // "total 1020"

// You need \n for a new line.
console.log("Line 1\nLine 2");

// --- Template Literals (the modern way) ---
// Use backticks ` ` and ${} to insert variables directly. Much cleaner than +.

// Insert variables
console.log(`Hello ${firstName} ${lastName}`);

// No need for \n, just press enter
console.log(`Line 1
Line 2`);

// Any expression works inside ${}
console.log(`10 + 20 = ${10 + 20}`);

// Easy to build HTML
const title = "Ismail";
const desc = "Web School";

const markup = `
  <div class="card">
    <h2>${title}</h2>
    <p>${desc}</p>
  </div>
`;

console.log(markup);
