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

# 🚀 Step 1: Install Tailwind CSS v4

Install Tailwind CSS and the official Vite plugin:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

> Tailwind CSS v4 uses a dedicated Vite plugin, so you don't need to install `postcss` or `autoprefixer` for this setup.

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

Remove the old Tailwind v3 directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Replace them with:

```css
@import "tailwindcss";
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

If you are migrating from Tailwind CSS v3, you may have these files:

```text
tailwind.config.js
postcss.config.js
```

For the basic Tailwind v4 + Vite setup, they are **not required**.

You can remove them if you don't need custom configuration from your old v3 setup.

> Tailwind v4 uses automatic content detection, so you don't need the old `content` configuration.

<br><br>

# ▶️ Step 6: Run the Project

Start your development server:

```bash
npm run dev
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

You can also test a Tailwind v4 gradient:

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

Check the installed version:

```bash
npm list tailwindcss
```

You should see something similar to:

```text
tailwindcss@4.x.x
```

<br><br>

# 📁 Final Project Structure

A basic React + Vite + Tailwind v4 project should look like:

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

<br><br>

# 🆚 Tailwind v3 vs v4

### Tailwind CSS v3

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

### Tailwind CSS v4

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

# ✅ Done

If you see the styled text or gradient in the browser, **Tailwind CSS v4 is successfully installed and configured**.

Your React + Vite project is now ready to use Tailwind CSS v4. 🚀
