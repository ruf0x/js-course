/*
  ASYNC JS + APIs
  - Intro to API
  - Synchronous vs Asynchronous
  - Callbacks & Callback Hell
  - Promises
  - async / await
  - try / catch / finally
  - fetch API
  - axios
  - Promise combinators
*/

// ============================================
// Intro to API (simple)
// ============================================
/*
  - API = Application Programming Interface: a way for two programs to talk.
  - A Web API is a URL you send a request to and get data back (usually JSON).
  - REST basics:
      GET    /users      -> read data
      POST   /users      -> create data
      PUT/PATCH /users/1 -> update data
      DELETE /users/1    -> remove data
  - Parts of a request: method, URL (endpoint), headers, body.
  - The response: a status code (200 ok, 404 not found, 500 server error) + data.
*/

// ============================================
// Synchronous vs Asynchronous
// ============================================
/*
  Sync: runs line by line, each step waits for the previous (blocking).
  Async: a slow task (network, timer) runs in the background; the rest of the
  code keeps going, and a callback/promise tells you when it's done.
  JS is single-threaded but async tasks wait in queues (event loop).
*/

console.log("1"); // runs first
setTimeout(() => console.log("2 (async, waits)"), 0); // queued
console.log("3"); // runs before "2"!
// output: 1, 3, 2

// ============================================
// Callbacks & Callback Hell
// ============================================
/*
  A callback is a function you pass in, to be run when the work is done.
  Problem: nested callbacks pile up -> "callback hell" (pyramid of doom),
  hard to read, hard to handle errors.
*/
/*
getUser(function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetails(orders[0], function (details) {
      getProduct(details.productId, function (product) {
        console.log(product); // 4 levels deep... painful
      });
    });
  });
});
*/

// ============================================
// Promises
// ============================================
/*
  A Promise is an object representing a value that will exist LATER.
  States: pending -> fulfilled (resolved) OR rejected.
  - .then(value => ...)  runs on success
  - .catch(error => ...) runs on failure
  - .finally(() => ...)  runs either way
*/
const p = new Promise((resolve, reject) => {
  const ok = true;
  if (ok) resolve("success value");
  else reject("error value");
});

p.then((value) => console.log(value)) // "success value"
  .catch((err) => console.log(err))
  .finally(() => console.log("done"));

// chaining removes the nesting (each .then returns a new promise)
function step1() {
  return Promise.resolve(1);
}
step1()
  .then((n) => n + 1) // 2
  .then((n) => n * 10) // 20
  .then((result) => console.log(result)); // 20

// ============================================
// async / await (cleaner syntax over promises)
// ============================================
// An async function ALWAYS returns a promise, and lets you use await inside.
async function run() {
  const value = await step1(); // pause here until resolved
  console.log(value); // 1
}
run();

// await only works inside an async function (or top-level in ES modules).

// ============================================
// ERROR HANDLING
// ============================================
/*
  When something goes wrong, JS "throws" an error. If nothing catches it,
  the program crashes. try/catch lets you recover gracefully.
*/
try {
  // risky code
  JSON.parse("{ bad json }"); // will throw
} catch (error) {
  // handle the problem instead of crashing
  console.log("caught:", error.message);
} finally {
  // runs ALWAYS, error or not (cleanup: close files, hide loaders...)
  console.log("finally always runs");
}

// --- The Error object ---
// Every error has useful properties:
try {
  throw new Error("something broke");
} catch (e) {
  console.log(e.name); // "Error"
  console.log(e.message); // "something broke"
  console.log(e.stack); // where it happened (line/stack trace)
}

// --- Common built-in error types ---
/*
  ReferenceError   -> using a variable that doesn't exist
  TypeError        -> wrong type (e.g. calling a non-function)
  SyntaxError      -> invalid code (thrown before running)
  RangeError       -> number out of allowed range (e.g. invalid array length)
  URIError         -> bad encode/decodeURI
*/
try {
  console.log(notDefinedVar); // ReferenceError
} catch (e) {
  console.log(e.name); // "ReferenceError"
}
try {
  null.foo; // TypeError
} catch (e) {
  console.log(e.name); // "TypeError"
}

// --- throw: create your own error ---
function checkAge(age) {
  if (typeof age !== "number") throw new TypeError("age must be a number");
  if (age < 0) throw new Error("age cannot be negative");
  return age;
}
try {
  checkAge(-1);
} catch (e) {
  console.log(e.message); // "age cannot be negative"
}

// --- Custom error classes (extend Error) ---
class ValidationError extends Error {
  constructor(message) {
    super(message); // pass message to Error
    this.name = "ValidationError";
    this.statusCode = 400; // add your own fields
  }
}
try {
  throw new ValidationError("email is invalid");
} catch (e) {
  console.log(e.name, e.message, e.statusCode); // ValidationError email is invalid 400
}

// --- Re-throwing: catch, handle what you can, pass the rest up ---
function process(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.log("could not parse, logging...");
    throw e; // let the caller decide what to do
  }
}

// --- Don't swallow errors silently ---
// Bad: an empty catch hides the bug forever.
try {
  risky();
} catch (e) {
  // console.log(e); // always at least log it
}
function risky() {
  throw new Error("hidden");
}

// --- Errors with async/await ---
// await makes rejected promises behave like thrown errors -> use try/catch.
async function safeRun() {
  try {
    const value = await Promise.reject("something broke");
    console.log(value); // never reached
  } catch (error) {
    console.log("caught:", error); // "caught: something broke"
  } finally {
    console.log("always runs");
  }
}
safeRun();

// Without try/catch you must use .catch() for promise errors.
Promise.reject("boom").catch((e) => console.log("caught with .catch:", e));

// --- Unhandled rejections / global safety nets ---
// In Node.js
// process.on("unhandledRejection", (reason) => console.error("Unhandled:", reason));
// In the browser
// window.addEventListener("unhandledrejection", (e) => console.error(e.reason));

// ============================================
// fetch API (built into browsers + modern Node)
// ============================================
/*
  fetch(url, options) returns a promise.
  - It does NOT reject on 404/500; you must check response.ok.
  - Call .json() to parse the body (returns another promise).
  - Options: method, headers, body (body must be a string -> JSON.stringify).
*/

// GET
async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error(`HTTP ${res.status}`); // handle bad status
    const users = await res.json(); // parse JSON body
    console.log(users[0].name);
  } catch (err) {
    console.log("request failed:", err.message);
  }
}
// getUsers();

// POST (send data)
async function createUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Osama", age: 38 }),
    });
    const created = await res.json();
    console.log(created);
  } catch (err) {
    console.log(err.message);
  }
}
// createUser();

// ============================================
// axios (a popular library with a friendlier API)
// ============================================
/*
  Install: npm i axios
  Pros vs fetch:
  - Parses JSON automatically (.data).
  - Rejects automatically on bad status codes (4xx/5xx) -> easier try/catch.
  - Base URL, interceptors, timeouts, upload progress.
*/
// const axios = require("axios"); // or: import axios from "axios";

// async function getUsersAxios() {
//   try {
//     const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//     console.log(response.data[0].name); // already parsed, no .json()
//   } catch (error) {
//     console.log(error.response?.status); // axios exposes the response
//   }
// }
// getUsersAxios();

// POST with axios (object is sent as JSON automatically)
// await axios.post("/users", { name: "Osama", age: 38 });

// Setting defaults + interceptors (add an auth header to every request)
// const api = axios.create({ baseURL: "https://api.example.com", timeout: 5000 });
// api.interceptors.request.use((config) => {
//   config.headers.Authorization = "Bearer TOKEN";
//   return config;
// });

// fetch vs axios (short):
// fetch -> built-in, but manual JSON parse + manual ok check.
// axios -> extra size, but auto JSON, auto errors, interceptors, simpler.

// ============================================
// Promise combinators (run several at once)
// ============================================
async function parallel() {
  // all: wait for ALL, fails fast if any rejects
  const [a, b] = await Promise.all([step1(), step1()]);
  console.log(a, b);

  // allSettled: wait for all, never rejects (gives status per promise)
  const results = await Promise.allSettled([Promise.resolve(1), Promise.reject("x")]);
  console.log(results); // [{status:"fulfilled",...}, {status:"rejected",...}]

  // race: first to settle (resolve OR reject) wins
  // any: first to RESOLVE wins (ignores rejects unless all fail)
}
parallel();

/*
  Summary
  - API: URL endpoints that return data (usually JSON).
  - Async: don't block; use promises.
  - Promises: .then/.catch/.finally, chain instead of nesting.
  - async/await + try/catch: the cleanest way to write async code.
  - fetch: built-in, check res.ok, await res.json().
  - axios: library, auto JSON, auto errors, interceptors.
  - Promise.all / allSettled / race / any: combine many promises.
*/