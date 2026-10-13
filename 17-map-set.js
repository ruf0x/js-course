/*
  Other Data Types: Map, Set, WeakMap, WeakSet (+ Symbol, BigInt)
  These complement arrays and objects for special cases.
*/

// ============================================
// Map
// - Like an object, but keys can be ANY type (objects, functions, numbers...).
// - Keeps insertion order and has a real .size.
// ============================================
const map = new Map();

map.set("name", "Osama");
map.set(1, "one"); // number key (impossible as an object key)
map.set(true, "yes");

console.log(map.get("name")); // "Osama"
console.log(map.get(1)); // "one"
console.log(map.has(true)); // true
console.log(map.size); // 3

map.delete(1);
console.log(map.size); // 2

// map.delete / map.clear() to remove all

// loop over a Map
for (const [key, value] of map) {
  console.log(key, "=>", value);
}
map.forEach((value, key) => console.log(key, value));

// object key! (this is the big difference from plain objects)
const userKey = { id: 1 };
map.set(userKey, "user data");
console.log(map.get(userKey)); // "user data"

// build a Map from an array of pairs
const fromArray = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log(fromArray.get("b")); // 2

// Map vs Object:
// - object keys: strings/symbols only. Map keys: anything.
// - Map: ordered, has size, better for adding/removing a lot.

// ============================================
// Set
// - A collection of UNIQUE values (no duplicates).
// - Great for removing duplicates and for fast existence checks.
// ============================================
const set = new Set();

set.add(1);
set.add(2);
set.add(2); // ignored, already there
set.add("1"); // different from number 1

console.log(set.size); // 3
console.log(set.has(2)); // true
set.delete(2);
set.clear(); // empty it

// remove duplicates from an array (very common)
const nums = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(nums)];
console.log(unique); // [1, 2, 3, 4]

// loop over a Set
const colors = new Set(["red", "green", "red"]);
for (const color of colors) {
  console.log(color); // "red", "green"
}

// combine sets: union and intersection
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);
const union = new Set([...a, ...b]); // {1,2,3,4,5}
const intersection = new Set([...a].filter((n) => b.has(n))); // {3}
console.log([...union], [...intersection]);

// ============================================
// WeakMap / WeakSet
// - Same as Map/Set but the keys MUST be objects.
// - They hold references "weakly": if the object is deleted elsewhere,
//   the entry is automatically removed (good for memory).
// - Not iterable, no .size. Used for private data / caching.
// ============================================
const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, "secret");
console.log(weakMap.get(obj)); // "secret"
// weakMap.delete(obj) works, but no weakMap.size / no looping

const weakSet = new WeakSet();
const user = { name: "Osama" };
weakSet.add(user);
console.log(weakSet.has(user)); // true

// ============================================
// Symbol (an always-unique identifier)
// ============================================
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2); // false (each symbol is unique)
// often used as special object keys to avoid clashes
const data = { [id1]: 123 };
console.log(data[id1]); // 123

// ============================================
// BigInt (integers bigger than Number can safely hold)
// ============================================
const big = 9007199254740991n; // note the "n"
console.log(big + 1n); // 9007199254740992n
console.log(typeof big); // "bigint"