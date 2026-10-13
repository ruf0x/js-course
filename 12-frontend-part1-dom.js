/*
  FRONTEND WITH JS - PART 1
  DOM (Document Object Model)
  - DOM turns your HTML page into objects that JavaScript can read and change.
  - This is FRONTEND ONLY: the DOM/`document` exists inside the browser,
    not in Node.js. That's why it's essential in frontend development.
  - Structure: every tag is a node -> html > body > div > p > text.
*/

// --- Selecting elements ---
const title = document.getElementById("title");
const products = document.getElementsByClassName("product"); // HTMLCollection
const paragraphs = document.getElementsByTagName("p"); // HTMLCollection
const firstBox = document.querySelector(".box"); // first match only
const allBoxes = document.querySelectorAll(".box"); // NodeList (like array)

// --- Reading / changing content ---
title.textContent = "New Title"; // plain text, ignores HTML
title.innerHTML = "New <span>Title</span>"; // inserts HTML string

// --- Changing attributes & styles ---
const img = document.querySelector("img");
img.src = "https://example.com/photo.jpg";
img.alt = "a photo";

title.style.color = "red";
title.style.fontSize = "24px"; // camelCase, not font-size
title.classList.add("active"); // add/remove/toggle CSS classes
title.classList.toggle("hidden");

// --- Creating and removing elements ---
const newDiv = document.createElement("div"); // make the tag
newDiv.textContent = "I am new";

bodyParts.appendChild(newDiv); // inside body
document.querySelector(".container").appendChild(newDiv); // inside a specific element

// remove an element
newDiv.remove();
// or remove a child from its parent
document.querySelector(".container").removeChild(newDiv);

// --- Events: react when the user does something ---
const button = document.querySelector("button");

button.onclick = () => console.log("clicked!");

button.addEventListener("click", (event) => {
  console.log("also clicked", event.target); // event.target = the element clicked
});

// common events
// listen to a form submit, key presses, mouse moves
// document.addEventListener("keydown", (e) => console.log(e.key));

// --- A practical frontend example ---
/* A products list built from data, rendered into the page when loaded. */
const productsData = [
  { name: "Phone", price: 500 },
  { name: "Laptop", price: 1500 },
  { name: "Mouse", price: 30 },
];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = ""; // clear before re-render

  productsData.forEach((product) => {
    const item = document.createElement("li");
    item.textContent = `${product.name} - $${product.price}`;
    list.appendChild(item);
  });
}

// renderProducts(); // call this on page load (DOMContentLoaded) or after fetching data

// --- Important: the page must be ready before touching the DOM ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded, safe to query elements");
});