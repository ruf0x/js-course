/*
  FRONTEND WITH JS - PART 2
  CSS manipulation, classList, window object, BOM
  Frontend only: runs in the browser, not in Node.js.
*/

// ============================================
// Styling elements with .style (inline styles)
// ============================================
const box = document.querySelector(".box");

box.style.backgroundColor = "#f00"; // camelCase, JS version of background-color
box.style.width = "100px";
box.style.cssText = "color: white; padding: 10px;"; // set several at once

// Removing a style: set it back to empty
box.style.backgroundColor = "";

// Saved styles: computed (the real final value, including CSS rules, not inline)
const computed = getComputedStyle(box);
console.log(computed.color); // current color as the browser sees it

// ============================================
// classList: the cleanest way to change styles
// ============================================
// Keep styling in CSS files, and only toggle classes from JS.
box.classList.add("active");
box.classList.remove("active");
box.classList.toggle("dark"); // adds if missing, removes if present
console.log(box.classList.contains("dark")); // true/false

// ============================================
// window object (the browser window)
// ============================================
/*
  - window is the TOP object in the browser.
  - The DOM (document) and BOM (below) live inside it.
  - In the browser, "var" and global functions attach to it.
*/
console.log(window.innerWidth); // viewport width
console.log(window.innerHeight); // viewport height

// scroll the window (to one pixel of the page)
window.scrollTo(0, 500);
window.scrollTo({ top: 500, behavior: "smooth" }); // smooth scroll

// popup dialogs
// window.alert("message");            // just a message
// const sure = window.confirm("are you sure?");
// const answer = window.prompt("type something");

// open / close a new window (often blocked unless triggered by real click)
// window.open("https://example.com", "_blank");

// ============================================
// BOM (Browser Object Model)
// ============================================
/*
  BOM = browser stuff that is NOT the page content:
  window, location, history, navigator, screen, timing functions.
  Example: go back / reload / know the browser.
*/
// history.back();            // browser back button
// history.forward();         // browser forward button
console.log(navigator.userAgent); // browser info (what the browser is running)
console.log(navigator.language); // "en-US", the user's language
console.log(screen.width); // screen (monitor), not the window

// ============================================
// Timing (live in the BOM)
// ============================================
// setInterval: repeat every X ms
const counter = setInterval(() => {
  console.log("tick");
}, 1000);

// stop it later
// clearInterval(counter);

// setTimeout: run ONCE after X ms
const timer = setTimeout(() => {
  console.log("done");
}, 2000);
// clearTimeout(timer); // cancel it before it fires

// ============================================
// A small combined example: a button that changes box color
// ============================================
/*
const button = document.querySelector("button");
let dark = false;

button.addEventListener("click", () => {
  dark = !dark;
  box.classList.toggle("dark", dark);
});
*/

/*
  Summary Part 2
  - .style  -> inline styles, .cssText to set many
  - classList -> add/remove/toggle CSS classes (preferred)
  - window  -> top object: size, scroll, popups
  - BOM     -> history, navigator, screen, setTimeout/setInterval
*/