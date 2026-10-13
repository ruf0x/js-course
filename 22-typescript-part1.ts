/*
  TYPESCRIPT - PART 1 (Basics)
  - TypeScript = JavaScript + static types. It compiles DOWN to plain JS.
  - Types are checked while you WRITE code, so bugs show before running.
  - This is a .ts file: it is not run directly, it is compiled with tsc.

  Setup:
    npm i -D typescript
    npx tsc --init              // creates tsconfig.json
    npx tsc file.ts            // outputs file.js
    npx tsc --watch            // recompile on save
*/

// ============================================
// Why TypeScript? (the improvements)
// ============================================
/*
  - Catch type mistakes at compile time, not at runtime.
  - Autocomplete + docs in the editor (know each variable's shape).
  - Safer refactors: renaming/changing a type flags every broken usage.
  - Self-documenting code: types describe what functions expect/return.
  - Newer JS features + great tooling support (works with React, Node, etc).
*/

// ============================================
// Type annotations
// ============================================
let userName: string = "Osama";
let userAge: number = 38;
let isActive: boolean = true;

// Any type -> turns off checking (avoid it)
let anything: any = "anything";
anything = 123; // allowed, but unsafe

// Unknown -> like any but you MUST check before using (safe any)
let safeUnknown: unknown = "hello";
if (typeof safeUnknown === "string") {
  console.log(safeUnknown.toUpperCase()); // narrowed to string here
}

// Arrays and tuples
let names: string[] = ["Osama", "Sara"];
let scores: Array<number> = [10, 20];
let point: [number, number] = [10, 20]; // tuple: fixed length + types

// ============================================
// Type inference (TS figures it out - no annotation needed)
// ============================================
let city = "Cairo"; // inferred as string
// city = 5;                      // Error: number is not assignable to string

// ============================================
// Functions
// ============================================
function add(a: number, b: number): number {
  return a + b;
}
// add(1, "2");   // Error: argument of type string not assignable to number

// Optional param (?), default param, void (returns nothing)
function greet(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

function log(message: string): void {
  console.log(message);
}

// Union types: a value can be one of several types
function printId(id: number | string): void {
  console.log(`Your id is: ${id}`);
}

// Literal types: only these exact values allowed
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up";
// let bad: Direction = "diagonal"; // Error

// ============================================
// Objects, Interfaces and Type Aliases
// ============================================
interface User {
  id: number;
  name: string;
  email?: string; // optional
  readonly createdAt: string; // cannot be changed after creation
}

const user1: User = { id: 1, name: "Osama", createdAt: "2026-01-01" };
// user1.createdAt = "x";        // Error: readonly

// type alias (similar to interface, can also describe unions/primitives)
type Product = {
  title: string;
  price: number;
};
const p1: Product = { title: "Phone", price: 500 };

// Interface can be extended; type can be combined with &
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// ============================================
// Enums (named set of constants)
// ============================================
enum Status {
  Pending, // 0
  Active, // 1
  Blocked, // 2
}
let current: Status = Status.Active;
console.log(current); // 1

// String enum (usually clearer)
enum Role {
  Admin = "ADMIN",
  User = "USER",
}
let myRole: Role = Role.Admin;

/*
  Part 1 summary
  - TS adds types on top of JS, compiled away at build time.
  - Annotations: string, number, boolean, any, unknown, arrays, tuples.
  - Functions: param types, return types, void, unions, optional params.
  - interfaces / type aliases describe object shapes.
  - enums give readable named constants.
*/