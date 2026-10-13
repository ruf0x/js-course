/*
  String Methods
  Strings are like list of characters: "Elzero"[0] => "E".
  In JS strings are immutable: methods return a NEW string, the original is never changed.
*/

const name = "Osama";

// length: how many characters (including spaces)
console.log(name.length); // 5

// indexOf / lastIndexOf: position of a character/word (-1 if not found)
console.log(name.indexOf("s")); // 1
console.log(name.indexOf("z")); // -1
console.log(name.lastIndexOf("m")); // 4

// includes: does the string contain this text?
console.log(name.includes("sam")); // true
console.log(name.includes("xyz")); // false

// startsWith / endsWith
console.log(name.startsWith("Os")); // true
console.log(name.endsWith("ma")); // true

// toUpperCase / toLowerCase
console.log(name.toUpperCase()); // OSAMA
console.log(name.toLowerCase()); // osama

// trim: removes spaces from both sides
const spaced = "  hello world  ";
console.log(spaced.trim()); // "hello world"

// slice(start, end): copy a part (end is not included)
console.log(name.slice(1, 4)); // "sam"
console.log(name.slice(-2)); // "ma" (negative counts from the end)

// substring(start, end): like slice, but negative indexes become 0
console.log(name.substring(1, 4)); // "sam"
console.log(name.substring(-1, 3)); // "Osa" (negative becomes 0)

// split(sep): turn the string into an array
console.log("a-b-c".split("-")); // ["a", "b", "c"]

// replace / replaceAll: replace text (replace only the first match by default)
const sentence = "JS is good, JS is fun";
console.log(sentence.replace("JS", "JavaScript")); // first only
console.log(sentence.replaceAll("JS", "JavaScript")); // all

// charAt: the character at a position
console.log(name.charAt(0)); // "O"

// repeat: repeat the string n times
console.log("ab".repeat(3)); // "ababab"

// padStart / padEnd: fill the string until it reaches a length
console.log("7".padStart(3, "0")); // "007"

// concat: join strings (rarely used, template literals are better)
console.log("Hi ".concat("there")); // "Hi there"

// Pro tip: combine methods
console.log("  Osama Mohamed  ".trim().toUpperCase()); // "OSAMA MOHAMED"