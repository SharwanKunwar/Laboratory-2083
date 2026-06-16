# 📘 JavaScript Fundamentals

> **Unit 1 — Day 2** | Features, Coding Conventions, JavaScript Files (.js), Comments
> 📖 **Type:** Theory

---

## 📑 Table of Contents

- [Features of JavaScript](#1-features-of-javascript)
- [Coding Conventions](#2-coding-conventions)
- [JavaScript Files (.js)](#3-javascript-files-js)
- [Comments in JavaScript](#4-comments-in-javascript)
- [Key Takeaways](#key-takeaways)

---

## 1. Features of JavaScript

| Feature | Description |
|---|---|
| **Lightweight** | Small footprint, easy to embed in HTML |
| **Interpreted** | Executed directly by the browser engine, no compilation step |
| **Dynamically Typed** | Variables can hold any data type, checked at runtime |
| **Object-Oriented** | Supports objects, prototypes, and (with ES6) classes |
| **Event-Driven** | Responds to user actions — clicks, keypresses, page loads |
| **Cross-Platform** | Runs on any device with a browser (or Node.js runtime) |
| **Case-Sensitive** | `myVar` and `MyVar` are treated as different identifiers |

---

## 2. Coding Conventions

Following consistent conventions improves readability and maintainability:

| Convention | Guideline | Example |
|---|---|---|
| **Variables** | camelCase | `let userName = "Sam";` |
| **Constants** | UPPER_SNAKE_CASE | `const MAX_LIMIT = 100;` |
| **Functions** | camelCase, verb-based | `function getUserData() {}` |
| **Classes** | PascalCase | `class UserProfile {}` |
| **Indentation** | 2 or 4 spaces (consistent) | — |
| **Statements** | End with semicolons `;` | `let x = 5;` |
| **Strings** | Prefer single `'` or template literals `` ` `` | `` `Hello, ${name}` `` |
| **Braces** | Opening brace on same line | `if (x) {` |

---

## 3. JavaScript Files (.js)

JavaScript code can live in two places:

**1. Inline (inside HTML)**
```html
<script>
  console.log("Inline JavaScript");
</script>
```

**2. External File (recommended)**
```html
<!-- index.html -->
<script src="script.js"></script>
```
```javascript
// script.js
console.log("External JavaScript file");
```

> 💡 **Best Practice:** Always use external `.js` files for anything beyond a few lines — it keeps HTML clean, enables caching, and supports reuse across pages.

---

## 4. Comments in JavaScript

Comments are ignored by the JS engine and used purely to document code.

### Single-line Comments — start with `//`
```javascript
// This calculates the total price
let total = price * quantity;
```

### Multi-line Comments — wrapped in `/* */`
```javascript
/*
  This function validates user input
  before submitting the form.
*/
function validateForm() {
  // logic here
}
```

| Type | Syntax | Use Case |
|---|---|---|
| Single-line | `// comment` | Short notes, quick explanations |
| Multi-line | `/* comment */` | Block descriptions, disabling code |

---

## Key Takeaways

> 💡 JavaScript is **lightweight, interpreted, and dynamically typed**, making it fast to write and run in any browser.

> 💡 Consistent **coding conventions** (camelCase, semicolons, indentation) keep code readable across teams.

> 💡 Always prefer **external `.js` files** over inline scripts for cleaner, reusable code.

> 💡 Use **comments** (`//` and `/* */`) generously to explain *why*, not just *what*, the code does.

---

<div align="center">
  <sub>Course Notes • Unit 1, Day 2 — JavaScript Fundamentals</sub>
</div>