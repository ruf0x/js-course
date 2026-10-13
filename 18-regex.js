/*
  REGULAR EXPRESSIONS (RegEx)
  - A pattern used to search, match, and replace text.
  - Written between slashes: /pattern/flags  or  new RegExp("pattern", "flags")
  - Very powerful, but can get hard to read. Libraries at the end simplify it.
*/

// ============================================
// The two ways to create one
// ============================================
const literal = /hello/; // preferred (written once, faster)
const built = new RegExp("hello"); // useful when the pattern is dynamic
const dynamic = new RegExp("he" + "llo");

// ============================================
// Testing / Matching
// ============================================
const text = "I love JavaScript and java";

console.log(literal.test(text)); // true  -> does the pattern exist? (true/false)
console.log(/python/.test(text)); // false

// exec: returns the match info (or null)
console.log(/Java/.exec(text)); // ["Java", index: 7, ...]

// ============================================
// String methods that use RegEx
// ============================================
// match: the matched part(s)
console.log(text.match(/java/gi)); // ["Java", "java"] (g = all, i = ignore case)

// search: the index of the first match
console.log(text.search(/JavaScript/)); // 7

// replace / replaceAll
console.log(text.replace(/java/i, "JS")); // replaces first
console.log(text.replaceAll(/java/gi, "JS")); // replaces all

// split by a pattern
console.log("a1b2c3".split(/\d/)); // ["a", "b", "c", ""]

// matchAll: get all matches with their groups (needs g)
const all = [..."cat bat".matchAll(/([a-z])at/g)];
console.log(all.map((m) => m[1])); // ["c", "b"]

// ============================================
// Flags
// ============================================
/*
  g  global     -> find all, not just the first
  i  ignoreCase -> case-insensitive
  m  multiline  -> ^ and $ match each line
  s  dotAll     -> . also matches newlines
  u  unicode    -> correct handling of unicode
  y  sticky     -> match from lastIndex exactly
*/
console.log(/ELZERO/i.test("elzero")); // true

// ============================================
// Character classes (what a single char can be)
// ============================================
/*
  .     any character except newline
  \d    digit 0-9            \D  non-digit
  \w    word [A-Za-z0-9_]    \W  non-word
  \s    whitespace           \S  non-whitespace
  [abc] one of a, b, c
  [a-z] a range
  [^abc] anything EXCEPT a, b, c
*/
console.log(/\d/.test("abc5")); // true
console.log(/[aeiou]/.test("sky")); // false
console.log(/^[A-Z]/.test("Osama")); // true (starts with uppercase)

// ============================================
// Quantifiers (how many times)
// ============================================
/*
  *     0 or more
  +     1 or more
  ?     0 or 1 (optional)
  {3}   exactly 3
  {2,5} between 2 and 5
  {2,}  2 or more
*/
console.log(/^\d{3}$/.test("123")); // true (exactly 3 digits)
console.log(/^\+?\d{6,}$/.test("+1234567")); // true

// ============================================
// Anchors & boundaries
// ============================================
/*
  ^   start of string
  $   end of string
  \b  word boundary
*/
console.log(/^Hello$/.test("Hello")); // true
console.log(/\bcat\b/.test("a cat here")); // true

// ============================================
// Groups, alternation, lookaround
// ============================================
// () capturing group, | OR
const date = "2026-07-14".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(date[1], date[2], date[3]); // "2026" "07" "14"

// (?: ) non-capturing group (just grouping, no capture)
console.log("ababab".match(/(?:ab)+/)[0]); // "ababab"

// named groups (?<name>...)
const named = "2026-07-14".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(named.groups.year); // "2026"

// lookahead / lookbehind (match only if followed/preceded by)
console.log(/\d+(?= dollars)/.exec("100 dollars")[0]); // "100"
console.log(/(?<=\$)\d+/.exec("$50")[0]); // "50"

// ============================================
// Practical examples
// ============================================
const email = /^[\w.+-]+@[\w-]+\.[\w.]{2,}$/;
console.log(email.test("osama@mail.com")); // true

const strongPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
console.log(strongPassword.test("Abcdefg1")); // true

const phone = /^(?:\+?\d{1,3})?[\s-]?\d{7,}$/;
console.log(phone.test("+20 1234567")); // true
