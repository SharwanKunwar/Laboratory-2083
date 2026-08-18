# 🌬️ Tailwind CSS v4 Setup Guide (React + Vite)

This guide explains how to install and configure **Tailwind CSS v4** in a React project using Vite.

---

## 📦 Prerequisites

Make sure you have:

* Node.js installed (LTS recommended)
* npm installed
* A React + Vite project already created

Check versions:

```bash
node -v
npm -v
```

<br><br>

# ⚠️ Important: If Tailwind CSS v3 Is Already Installed

If your project already has **Tailwind CSS v3**, remove the old version and its dependencies before installing Tailwind CSS v4.

First, check your current version:

```bash
npm list tailwindcss
```

If you see something like:

```text
tailwindcss@3.4.17
```

or:

```text
tailwindcss@3.4.19
```

remove the old Tailwind CSS dependencies:

```bash
npm uninstall tailwindcss postcss autoprefixer
```

Then install Tailwind CSS v4 as described below.

> **Important:** Do not keep Tailwind CSS v3 and v4 together. This can cause dependency conflicts and errors such as:
>
> ```text
> Can't resolve 'tailwindcss'
> ```

If you have an existing `node_modules` or `package-lock.json` from the old setup and still experience problems, perform a clean installation:

```bash
rm -rf node_modules package-lock.json
npm install
```

<br><br>

# 🚀 Step 1: Install Tailwind CSS v4

Install Tailwind CSS and the official Vite plugin:

```bash
npm install -D tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
```

You can also install the latest versions:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

> Tailwind CSS v4 uses a dedicated Vite plugin, so you don't need to install `postcss` or `autoprefixer` for this basic Vite setup.

<br><br>

# ⚙️ Step 2: Configure Vite

Open `vite.config.js` and configure the Tailwind Vite plugin:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

<br><br>

# 🎨 Step 3: Add Tailwind to CSS

Open:

```text
src/index.css
```

For Tailwind CSS v4, use:

```css
@import "tailwindcss";
```

> Do not use the old Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

<br><br>

# 🔌 Step 4: Import CSS in React

Make sure `src/main.jsx` imports your CSS:

```js
import "./index.css";
```

For example:

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

<br><br>

# 🧹 Step 5: Remove Old Tailwind Configuration

If you are migrating from Tailwind CSS v3, you may have:

```text
tailwind.config.js
postcss.config.js
```

For the basic Tailwind CSS v4 + Vite setup, these files are **not required**.

You can remove them if you don't need any existing custom configuration.

Tailwind CSS v4 automatically detects your source files, so the old `content` configuration is not required for the basic setup.

<br><br>

# ▶️ Step 6: Run the Project

Start your development server:

```bash
npm run dev
```

You should see something similar to:

```text
VITE v8.x.x ready

➜ Local: http://localhost:5173/
```

<br><br>

# 🧪 Step 7: Test Tailwind

Open `App.jsx` and test:

```jsx
export default function App() {
  return (
    <h1 className="text-3xl font-bold text-blue-500">
      Tailwind is Working 🚀
    </h1>
  );
}
```

You can also test a Tailwind CSS v4 gradient:

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        Tailwind v4 🚀
      </h1>
    </div>
  );
}
```

<br><br>

# 🔍 Step 8: Verify Tailwind Version

Run:

```bash
npm list tailwindcss @tailwindcss/vite
```

You should have Tailwind CSS v4:

```text
├── @tailwindcss/vite@4.3.3
└── tailwindcss@4.3.3
```

The important thing is that your project should **not have a direct Tailwind CSS v3 dependency**.

<br><br>

# 📁 Final Project Structure

A basic React + Vite + Tailwind CSS v4 project should look like:

```text
Frontend/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

You normally do not need:

```text
tailwind.config.js
postcss.config.js
```

for the basic v4 Vite setup.

<br><br>

# 🆚 Tailwind CSS v3 vs v4

## Tailwind CSS v3

Installation:

```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
```

Initialization:

```bash
npx tailwindcss init -p
```

CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Gradient:

```text
bg-gradient-to-r
```

---

## Tailwind CSS v4

Installation:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

CSS:

```css
@import "tailwindcss";
```

Gradient:

```text
bg-linear-to-r
```

<br><br>

# 🔄 Migrating From Tailwind v3 to v4

If you already have Tailwind CSS v3 installed:

### 1. Remove v3

```bash
npm uninstall tailwindcss postcss autoprefixer
```

### 2. Install v4

```bash
npm install -D tailwindcss @tailwindcss/vite
```

### 3. Update `vite.config.js`

Add:

```js
import tailwindcss from "@tailwindcss/vite";
```

and:

```js
tailwindcss()
```

inside the Vite plugins.

### 4. Update `index.css`

Replace:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

with:

```css
@import "tailwindcss";
```

### 5. Remove old configuration if not needed

```text
tailwind.config.js
postcss.config.js
```

### 6. If dependency problems remain

Run:

```bash
rm -rf node_modules package-lock.json
npm install
```

Then:

```bash
npm run dev
```

<br><br>

# ❗ Common Error

If you see:

```text
Can't resolve 'tailwindcss'
```

while using:

```text
@tailwindcss/vite
```

check your installed versions:

```bash
npm list tailwindcss @tailwindcss/vite
```

If you see both:

```text
tailwindcss@3.x.x
tailwindcss@4.x.x
```

you have a mixed Tailwind v3/v4 installation.

Remove the old dependencies:

```bash
npm uninstall tailwindcss postcss autoprefixer
```

Then reinstall v4:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

If necessary, clean the installation:

```bash
rm -rf node_modules package-lock.json
npm install
```

<br><br>

# ✅ Done

If you see the styled text or gradient in the browser, **Tailwind CSS v4 is successfully installed and configured**.

Your React + Vite project is now ready to use Tailwind CSS v4. 🚀

