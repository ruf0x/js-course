/*
  FRONTEND WITH JS - PART 3
  Events, listeners, the event object, scroll, delegation
  Frontend only: runs in the browser.
*/

// ============================================
// addEventListener (the modern, preferred way)
// ============================================
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("clicked");
});

// You can add SEVERAL listeners to the same element (old "onclick" can't).
button.addEventListener("click", () => {
  console.log("a second listener");
});

// Remove a listener later (must be the SAME function reference)
function once() {
  console.log("first click");
  button.removeEventListener("click", once);
}
button.addEventListener("click", once);

// ============================================
// Other event types
// ============================================
const input = document.querySelector("input");

// input.addEventListener("input", (e) => console.log(e.target.value));      // while typing
// input.addEventListener("change", () => console.log("value changed"));     // after leaving field
// document.addEventListener("keydown", (e) => console.log(e.key));          // keyboard
// document.addEventListener("mousemove", (e) => console.log(e.clientX));    // mouse
// window.addEventListener("resize", () => console.log(window.innerWidth));
// window.addEventListener("scroll", () => console.log("scrolling"));

// ============================================
// The event object (e)
// ============================================
button.addEventListener("click", (event) => {
  console.log(event.type); // "click"
  console.log(event.target); // the element that was actually clicked
  console.log(event.currentTarget); // the element the listener is on
  event.preventDefault(); // stop default (e.g. form submit, link navigation)
});

// Button inside a form: stop it from reloading the page
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // important!
  console.log("form sent without reloading");
});

// ============================================
// Scroll: sticky header example
// ============================================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

// ============================================
// Event delegation
// ============================================
/*
  Instead of adding a listener to MANY elements, add ONE to a parent.
  Works for elements created LATER (which direct listeners miss).
*/
const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
  const item = event.target.closest("li"); // find the closest li from wherever we clicked
  if (!item) return; // clicked on the list itself or empty space
  console.log("you clicked", item.textContent);
});

// ============================================
// Creating an element with an event at runtime
// ============================================
const addBtn = document.querySelector(".add");
const container = document.querySelector(".container");

addBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `Item ${container.children.length + 1}`;
  container.appendChild(li);
  // no need for its own listener: the delegator on the parent handles it
});

// ============================================
// Mouse / touch: drag & drop basics (pointer events, modern)
// ============================================
const draggable = document.querySelector(".draggable");

draggable.addEventListener("pointerdown", (e) => {
  const moveHandler = (event) => {
    draggable.style.left = `${event.clientX}px`;
    draggable.style.top = `${event.clientY}px`;
  };
  document.addEventListener("pointermove", moveHandler);
  document.addEventListener("pointerup", () => {
    document.removeEventListener("pointermove", moveHandler);
  });
});

/*
  Summary Part 3
  - addEventListener: many listeners per element, easy remove
  - event object: type, target, preventDefault
  - scroll to build sticky/animations
  - delegation: one listener on a parent for all children (old + future)
  - pointer events for modern mouse/touch handling
*/