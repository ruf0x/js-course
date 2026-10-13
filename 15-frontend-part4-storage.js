/*
  FRONTEND WITH JS - PART 4
  localStorage, sessionStorage, cookies, location, history, navigator, timers
  Frontend only: runs in the browser. Data lives on the user's machine.
*/

// ============================================
// localStorage (persists after closing the browser - survives reloads)
// ============================================
// Only STRINGS can be stored.

// Save
localStorage.setItem("username", "Osama");
localStorage.setItem("age", "38"); // always a string

// Read
console.log(localStorage.getItem("username")); // "Osama"
console.log(localStorage.getItem("missing")); // null

// Remove one or clear all
localStorage.removeItem("username");
// localStorage.clear(); // everything

// Store objects/arrays: convert with JSON
const user = { name: "Sara", settings: { theme: "dark" } };
localStorage.setItem("user", JSON.stringify(user));

const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved.settings.theme); // "dark"

// Common pattern: store a shopping cart
const cart = ["phone", "laptop", "mouse"];
localStorage.setItem("cart", JSON.stringify(cart));

// ============================================
// sessionStorage (same API, but cleared when the tab closes)
// ============================================
sessionStorage.setItem("temp", "lasts only while this tab is open");
console.log(sessionStorage.getItem("temp"));

// ============================================
// location (the page URL)
// ============================================
console.log(location.href); // full url
console.log(location.pathname); // "/page.html"
console.log(location.search); // "?id=5" (query string)

// navigation
// location.reload();            // reload the page
// location.replace(url);        // go to url, history entry replaced
// location.assign(url);         // go to url, adds to history

// read query params
const params = new URLSearchParams(location.search);
// console.log(params.get("id")); // "5"

// ============================================
// history (browser navigation)
// ============================================
// history.back();   // like the back button
// history.forward();
// history.go(-1);   // one step back

// ============================================
// navigator
// ============================================
console.log(navigator.userAgent); // browser info
console.log(navigator.language); // "en-US"
console.log(navigator.onLine); // true if connected to internet

// window online/offline events
window.addEventListener("online", () => console.log("back online"));
window.addEventListener("offline", () => console.log("you are offline"));

// ============================================
// setTimeout / setInterval (already seen, common frontend uses)
// ============================================
// toast notification that hides itself
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove(); // auto-hide after 3s
  }, 3000);
}

// countdown to a discount
let seconds = 10;
const countdown = setInterval(() => {
  console.log(`time left: ${seconds}s`);
  seconds--;
  if (seconds < 0) {
    clearInterval(countdown); // stop the interval
    console.log("promo ended");
  }
}, 1000);

// ============================================
// Cookies (small, sent to the server with every request)
// ============================================
// Set a cookie (no quotes; expire, path optional)
document.cookie = "name=Osama; max-age=3600"; // 1 hour
document.cookie = "theme=dark; path=/";

console.log(document.cookie); // "name=Osama; theme=dark"

// Delete by making it expire
document.cookie = "name=Osama; max-age=0";

/*
  Summary Part 4
  - localStorage -> survives browser close (strings only, use JSON for objects)
  - sessionStorage -> dies with the tab
  - location -> url info + navigation/reload
  - history -> move through tabs history
  - navigator -> browser + connection info
  - timers -> setTimeout (once) / setInterval (repeat)
  - cookies -> small client strings also sent to the server
*/