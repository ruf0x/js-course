// Single-line comment: everything after // on this line is ignored by JS.

// You can also put a single-line comment at the end of a code line.
console.log("Hello"); // this part is a comment

/*
  Multi-line comment.
  Everything between the opening slash-star and the closing star-slash is ignored.
*/
console.log("World");

/*
  Multi-line comments are often used to:
  1. Explain a block of code
  2. Temporarily disable code
  3. Document a section
*/

// ============================================
// Output Methods
// ============================================

/*
  window.alert()
  - Shows a popup box in the browser with a message.
  - Frontend only: it needs a browser window to appear.
  - Mostly used for quick tests/learning, not recommended for real apps.
*/
window.alert("Hello Page");

/*
  console.log()
  - Prints a message in the browser console (F12).
  - Works in both frontend AND backend (Node.js).
  - Mainly used for debugging: checking values and following the code flow.
*/
console.log("Hello From JS File");

/*
  console.error()
  - Same as console.log but marks the message as an error (shown in red).
  - Also frontend + backend, used to spot problems while debugging.
*/
console.error("This is an error message");
