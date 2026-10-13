/*
  DESTRUCTURING
  - Quickly pull values OUT of arrays/objects into variables.
  - Works for objects, arrays, function parameters, and DOM results.
  - Shorter + cleaner code: "give me these fields".
  - Works everywhere (frontend AND backend). Only the DOM examples at the end
    need a browser.
*/

// ============================================
// 1) Array destructuring (position matters)
// ============================================
const colors = ["red", "green", "blue"];

// old way
const oldFirst = colors[0];
const oldSecond = colors[1];

// destructuring way
const [first, second] = colors;
console.log(first, second); // "red", "green"

// skip items with empty slots
const [, , third] = colors;
console.log(third); // "blue"

// default value when item is missing
const [a, b, c = "transparent"] = [1, 2];
console.log(a, b, c); // 1, 2, "transparent"

// swap variables in one line
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// rest: collect the rest into a new array
const [head, ...tail] = [10, 20, 30, 40];
console.log(head, tail); // 10, [20, 30, 40]

// ============================================
// 2) Object destructuring (key matters)
// ============================================
const user = { name: "Osama", age: 38, city: "Alex" };

const { name, age } = user;
console.log(name, age); // "Osama", 38

// rename: take user.name and call it userName
const { name: userName, city } = user;
console.log(userName, city); // "Osama", "Alex"

// default value
const { role = "guest" } = user;
console.log(role); // "guest"

// rest: remaining keys
const { name: n, ...otherInfo } = user;
console.log(n, otherInfo); // "Osama", { age: 38, city: "Alex" }

// ============================================
// 3) Nested + mixed content
// ============================================
const profile = {
  id: 1,
  personal: {
    fullName: "Sara Ahmed",
    address: { city: "Cairo", street: "Main" },
  },
  hobbies: ["reading", "coding"],
};

const {
  personal: {
    fullName,
    address: { city },
  },
} = profile;
console.log(fullName, city); // "Sara Ahmed", "Cairo"

// mixed: array of objects
const products = [
  { title: "Phone", price: 500 },
  { title: "Mouse", price: 30 },
];
products.forEach(({ title, price }) => {
  console.log(`${title}: $${price}`);
});

// ============================================
// 4) Destructuring function parameters
// ============================================
// When you pass an object, the function pulls just what it needs.
function renderUser({ name: displayName, age: userAge }) {
  console.log(`${displayName} is ${userAge}`);
}
renderUser({ age: 38, name: "Osama", city: "Alex" }); // order doesn't matter

// array params
function addAll([firstNum, ...restNums]) {
  return firstNum + restNums.reduce((acc, num) => acc + num, 0);
}
console.log(addAll([1, 2, 3, 4])); // 10 (1 + 2 + 3 + 4)

// ============================================
// 5) DOM / frontend examples
// ============================================

// 5a) Form inputs: grab values from a form right into variables
// (listen to the submit event, then read the named fields)
/*
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const { email, password } = form.elements; // names "email" "password" on inputs
  console.log(email.value, password.value);
});
*/

// 5b) Event object: pull the data you need in one line
document.addEventListener("click", ({ clientX, clientY, target }) => {
  console.log(`clicked at ${clientX}, ${clientY} on ${target.tagName}`);
});

// 5c) querySelectorAll result: there is no .map on it, destructure or spread it
// const [header, main, footer] = [...document.querySelectorAll("header, main, footer")];

// 5d) Config/theme object with defaults - a very common frontend pattern
const options = {
  theme: "dark",
  fontSize: 14,
};

const { theme = "light", fontSize = 12, animation = "fade" } = options;
console.log(theme, fontSize, animation); // "dark", 14, "fade" (default used)

// 5e) Reading stored data (localStorage) into variables
const stored = localStorage.getItem("user");
if (stored) {
  const { name: savedName, settings: { theme: savedTheme } = {} } = JSON.parse(stored);
  console.log(savedName, savedTheme);
}

// ============================================
// 6) One more: swap two DOM elements' text without temp variables
// ============================================
/*
let elA = document.querySelector(".a");
let elB = document.querySelector(".b");
[elA.textContent, elB.textContent] = [elB.textContent, elA.textContent];
*/