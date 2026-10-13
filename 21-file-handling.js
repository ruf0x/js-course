/*
  FILE HANDLING (Node.js only)
  - JavaScript in the browser can NOT freely read/write local files (security).
  - File handling is done with Node.js using the built-in "fs" module.
  - This file is BACKEND: run it with "node 21-file-handling.js".
*/

// fs has 3 styles. "fs/promises" is the modern, async one.
const fs = require("fs"); // classic callback API
const fsPromises = require("fs/promises"); // promise API (recommended)
const path = require("path"); // build safe file paths

const filePath = path.join(__dirname, "example.txt");

// ============================================
// Reading files
// ============================================
// Synchronous: blocks until done (simple, but freezes the app)
try {
  const data = fs.readFileSync(filePath, "utf-8"); // "utf-8" gives a string
  console.log("sync read:", data);
} catch (err) {
  console.log("file not found:", err.code); // "ENOENT"
}

// Asynchronous with a callback (never blocks)
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("error:", err.message);
    return;
  }
  console.log("async read:", data);
});

// Async/await with fs/promises (cleanest)
async function readFileExample() {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8");
    console.log("await read:", data);
    return data;
  } catch (err) {
    console.log("could not read:", err.message);
  }
}
readFileExample();

// ============================================
// Writing files
// ============================================
// writeFile REPLACES the whole file (creates it if missing)
fs.writeFileSync(filePath, "Hello, this is new content\n", "utf-8");

async function writeFileExample() {
  await fsPromises.writeFile(filePath, "Overwritten by await\n", "utf-8");
}
// writeFileExample();

// appendFile ADDS to the end instead of replacing
fs.appendFileSync(filePath, "a new line appended\n", "utf-8");

// ============================================
// Open / read / write / close (low level, like other languages)
// ============================================
/*
  fs.open(path, flags): returns a "file descriptor" (fd).
  Flags: "r" read, "w" write (truncates), "a" append, "r+" read+write.
  You MUST close it when done to free the resource.
*/
fs.open(filePath, "r", (err, fd) => {
  if (err) return console.log(err.message);

  const buffer = Buffer.alloc(1024); // memory to read into
  fs.read(fd, buffer, 0, buffer.length, 0, (err, bytesRead, buf) => {
    if (err) return console.log(err.message);
    console.log("read bytes:", bytesRead);
    console.log("content:", buf.toString("utf-8", 0, bytesRead));
    fs.close(fd, () => console.log("file closed")); // always close!
  });
});

// The synchronous version is more readable:
// const fd = fs.openSync(filePath, "r");
// const buf = Buffer.alloc(1024);
// const bytes = fs.readSync(fd, buf, 0, buf.length, 0);
// console.log(buf.toString("utf-8", 0, bytes));
// fs.closeSync(fd);

// ============================================
// Checking / deleting / renaming
// ============================================
console.log("exists?", fs.existsSync(filePath)); // true/false

// stats: size, dates, isFile/isDirectory
const stats = fs.statSync(filePath);
console.log("size:", stats.size, "bytes");
console.log("is file?", stats.isFile(), "is dir?", stats.isDirectory());

// rename / delete
// fs.renameSync(filePath, path.join(__dirname, "renamed.txt"));
// fs.unlinkSync(filePath); // delete a file

// ============================================
// Directories (folders)
// ============================================
const dir = path.join(__dirname, "uploads");

// make (recursive creates missing parents), read, remove
// fs.mkdirSync(dir, { recursive: true });              // create
// console.log(fs.readdirSync(__dirname));              // list entries
// fs.rmSync(dir, { recursive: true, force: true });    // delete folder

// ============================================
// Small practical example: save & load JSON data
// ============================================
async function saveUsers(users) {
  await fsPromises.writeFile("users.json", JSON.stringify(users, null, 2), "utf-8");
}

async function loadUsers() {
  try {
    const raw = await fsPromises.readFile("users.json", "utf-8");
    return JSON.parse(raw);
  } catch {
    return []; // file missing -> start with an empty list
  }
}

// saveUsers([{ id: 1, name: "Osama" }]).then(loadUsers).then(console.log);

// ============================================
// Streams (for BIG files: read/write in chunks, low memory)
// ============================================
// const readStream = fs.createReadStream("big.txt", "utf-8");
// const writeStream = fs.createWriteStream("copy.txt");
// readStream.pipe(writeStream); // copy without loading it all into memory

/*
  Cheatsheet
  - fs (sync):        readFileSync, writeFileSync, appendFileSync
  - fs (callback):    readFile, writeFile, appendFile
  - fs/promises:      await readFile, await writeFile (use this)
  - open/read/close:  low-level, remember to close the descriptor
  - directories:      mkdir, readdir, rm (recursive)
  - streams:          createReadStream + pipe for huge files
  - always wrap file work in try/catch (files may be missing / locked)
*/