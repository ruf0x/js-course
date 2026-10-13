/*
  TYPESCRIPT - PART 2 (the stuff you actually use daily)
  - Generics
  - Utility types
  - Classes with access modifiers
  - Narrowing / type guards
  - keyof & typeof
  - real-world patterns (API responses, React props)
*/

// ============================================
// Generics: reuse a type and keep it flexible
// ============================================
// <T> is a placeholder type filled in when you call it.
function identity<T>(value: T): T {
  return value;
}
const num = identity<number>(5); // T = number
const str = identity("hi"); // T inferred as "hi"

// Generic with a constraint (T must have a length)
function logLength<T extends { length: number }>(item: T): number {
  return item.length;
}
logLength("hello"); // ok
logLength([1, 2, 3]); // ok
// logLength(5);     // Error: number has no length

// Generic wrapper for API responses (very common)
interface ApiResponse<T> {
  data: T;
  status: number;
}
type UserResponse = ApiResponse<{ id: number; name: string }>;

// ============================================
// Utility types (built-in helpers)
// ============================================
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // all props optional
type RequiredUser = Required<User>; // all props required
type ReadonlyUser = Readonly<User>; // all props readonly

type UserPreview = Pick<User, "id" | "name">; // keep only these
type UserWithoutEmail = Omit<User, "email">; // drop these

type Roles = Record<string, boolean>; // object with string keys -> boolean values

// ReturnType: get the return type of a function
function makeUser() {
  return { id: 1, name: "Osama" };
}
type MadeUser = ReturnType<typeof makeUser>; // { id: number; name: string }

// ============================================
// Classes: access modifiers, implements
// ============================================
class Account {
  readonly id: number; // set once, never changed
  public owner: string; // visible everywhere (default)
  private balance: number; // only inside this class
  protected type: string = "savings"; // this class + subclasses

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance; // balance is used through a method
  }
}

const acc = new Account(1, "Osama", 100);
acc.deposit(50);
// acc.balance = 0;      // Error: private
console.log(acc.getBalance()); // 150

// Shorthand: parameters become properties with modifiers
class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
new Point(1, 2).x;

// implements: a class promises to follow an interface
interface Shape {
  area(): number;
}
class Circle implements Shape {
  constructor(public r: number) {}
  area(): number {
    return Math.PI * this.r ** 2;
  }
}

// ============================================
// Narrowing / type guards
// ============================================
function format(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2); // narrowed to number
  }
  return value.toUpperCase(); // narrowed to string
}

// instanceof
class Cat {
  meow() {}
}
class Dog {
  bark() {}
}
function makeSound(pet: Cat | Dog) {
  if (pet instanceof Cat) pet.meow();
  else pet.bark();
}

// "in" operator + discriminated unions (very common with API/state)
type Result =
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // TS knows .data exists here
  } else {
    console.log(result.message); // and .message here
  }
}

// ============================================
// keyof and typeof
// ============================================
interface Config {
  theme: string;
  fontSize: number;
}
type ConfigKey = keyof Config; // "theme" | "fontSize"

function getConfig(key: ConfigKey) {
  /* ... */
}
getConfig("theme"); // ok
// getConfig("color"); // Error

// typeof: take the type of an existing value
const defaults = { theme: "dark", fontSize: 14 };
type Defaults = typeof defaults; // { theme: string; fontSize: number }

// ============================================
// Real-world patterns
// ============================================
// 1) Typing fetched data
interface Post {
  id: number;
  title: string;
}
async function getPosts(): Promise<Post[]> {
  const res = await fetch("/api/posts");
  return (await res.json()) as Post[];
}

// 2) Function type
type Callback = (error: Error | null, data?: Post) => void;

// 3) React props (a shape TS is famous for protecting)
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};
// function Button({ label, onClick, variant = "primary" }: ButtonProps) { ... }

// 4) @types packages: get types for libraries without types
// npm i -D @types/node       // Node.js
// npm i -D @types/express    // Express
// npm i -D @types/lodash     // Lodash

// ============================================
// tsconfig.json - the important strict flags
// ============================================
/*
  {
    "compilerOptions": {
      "target": "ES2020",          // JS version to output
      "module": "ESNext",          // module system
      "strict": true,              // enables all strict checks (recommended)
      "noImplicitAny": true,       // error on missing types
      "strictNullChecks": true,    // null/undefined are not assignable to others
      "outDir": "dist"             // where compiled .js goes
    }
  }
*/

/*
  Part 2 summary
  - Generics reuse logic with flexible but type-safe types.
  - Utility types (Partial, Pick, Omit, Record, ReturnType...) transform shapes.
  - Classes: public/private/protected/readonly + implements interfaces.
  - Narrowing (typeof, instanceof, in, discriminated unions) makes unions safe.
  - keyof/typeof connect values and types.
  - In real apps: type API responses, function types, props, and @types packages.
*/