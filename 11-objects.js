/*
  Objects
  - An object stores data as key: value pairs (like a labeled box).
  - Values can be anything: strings, numbers, arrays, functions, other objects.
*/

// ============================================
// Creating an object (literal)
// ============================================
const user = {
  name: "Osama",
  age: 38,
  country: "EG",
};

console.log(user);

// empty object, fill it later
const empty = {};
empty.city = "Cairo";
console.log(empty.city);

// ============================================
// Dot notation vs Bracket notation
// ============================================
// Dot notation (most common)
console.log(user.name); // "Osama"
console.log(user.age); // 38

// Bracket notation: useful when the key is a variable or has special chars
console.log(user["name"]); // "Osama"

const key = "age";
console.log(user[key]); // 38 (key holds the string "age")

const weird = { "full name": "Osama Mohamed" };
console.log(weird["full name"]); // dot notation would fail here

// ============================================
// Add / change / delete keys
// ============================================
user.isAdmin = true; // add
user.age = 39; // change
delete user.country; // remove
console.log(user);

// ============================================
// Nested objects (object inside object)
// ============================================
const customer = {
  name: "Sara",
  address: {
    city: "Alex",
    street: "Main st",
    location: { lat: 31.2, lng: 29.9 },
  },
  orders: [
    { product: "Phone", price: 500 },
    { product: "Case", price: 20 },
  ],
};

// access with chained dot notation
console.log(customer.name); // "Sara"
console.log(customer.address.city); // "Alex"
console.log(customer.address.location.lat); // 31.2
console.log(customer.orders[0].product); // "Phone"

// optional chaining (?.): safe access, no error if something is missing
console.log(customer.address?.city); // "Alex"
console.log(customer.payment?.method); // undefined instead of crash

// loop over an array of objects
customer.orders.forEach((order) => console.log(`${order.product}: $${order.price}`));

// ============================================
// Object methods
// ============================================
// A method is a function stored as a value.
const dog = {
  name: "Rex",
  bark() {
    console.log("Woof woof!");
  },
};
dog.bark();

// ============================================
// this keyword
// ============================================
/*
  - Inside a NORMAL function method, this = the object that owns the method.
  - Arrow functions do NOT have their own this (they inherit it from outside),
    so avoid them when you need this to be the object.
*/
const person = {
  name: "Ahmed",
  sayWho() {
    console.log(this); // the whole object
    console.log(this.name); // "Ahmed"
  },
};
person.sayWho();

// nested function changes this (normal function)
const testThis = {
  name: "Test",
  method() {
    console.log(this.name); // "Test", this = the object

    function inner() {
      console.log(this); // in non-strict: global object, NOT the object!
    }
    inner();
  },
};
testThis.method();

// arrow keeps the outer this -> safe
const testArrow = {
  name: "Arrow",
  method() {
    const inner = () => {
      console.log(this.name); // "Arrow", inherits this from method()
    };
    inner();
  },
};
testArrow.method();

// ============================================
// Object.keys / values / entries
// ============================================
console.log(Object.keys(user)); // ["name", "age", "isAdmin"]
console.log(Object.values(user)); // ["Osama", 39, true]
console.log(Object.entries(user)); // [["name","Osama"], ["age",39], ...]

// ============================================
// Object shorthand + copying
// ============================================
const name = "Ali";
const age = 25;
// shorthand: if key name == variable name, write it once
const shorthandObj = { name, age };
console.log(shorthandObj); // { name: "Ali", age: 25 }

// copy with spread (shallow copy)
const copy = { ...user, name: "Changed" }; // override one key
console.log(copy);

// know if a key exists
console.log("name" in user); // true
console.log(user.hasOwnProperty("country")); // false (we deleted it)