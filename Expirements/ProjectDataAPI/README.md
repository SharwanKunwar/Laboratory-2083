# ProjectDetails API

A small Express API that serves project data from a JavaScript array.

## Tech
- Node.js
- Express
- Vercel

## Project structure
```text
ProjectDataAPI/
├── api/
│   └── index.js
├── projectDetails.js
├── projectDetailsRepository.js
├── package.json
├── vercel.json
└── README.md
```

## Run locally
```bash
npm install
node api/index.js
```

## Endpoints
```text
GET /api/projectDetails
GET /api/projectDetails/:id
GET /api/projectDetails/random/:number
GET /api/projectDetails/category/:category
```

## Example
```bash
curl http://localhost:3001/api/projectDetails
curl http://localhost:3001/api/projectDetails/1
curl http://localhost:3001/api/projectDetails/random/3
curl http://localhost:3001/api/projectDetails/category/frontend
```

## Notes
- Data is stored in [projectDetails.js](projectDetails.js)
- Logic is handled in [projectDetailsRepository.js](projectDetailsRepository.js)
- API entry is in [api/index.js](api/index.js)

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.json({
        name: "Car API",
        version: "1.0.0",
        endpoints: [
            "GET /api/cars",
            "GET /api/cars/:id",
            "GET /api/cars/random/:number",
            "GET /api/cars/category/:category"
        ]
    });
});

app.get("/api/cars", (req, res) => {
    res.json(carsRepository.getAll());
});

app.get("/api/cars/:id", (req, res) => {
    const car = carsRepository.getById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
});

app.get("/api/cars/random/:number", (req, res) => {
    res.json(carsRepository.getRandom(req.params.number));
});

app.get("/api/cars/category/:category", (req, res) => {
    const cars = carsRepository.getByCategory(req.params.category);
    if (cars.length === 0) {
        return res.status(404).json({ message: "No cars found for this category" });
    }
    res.json(cars);
});

module.exports = app;
```

> Note the relative import changes from `./carsRepository` to `../carsRepository` since `api/index.js` sits one folder deeper.

### 5.3 Deployment Steps

1. Push the project to GitHub (see Step 2).
2. Open [vercel.com](https://vercel.com) and log in.
3. Click **Import Project** → select your GitHub repo.
4. Click **Deploy**.
5. Vercel gives you a public URL, e.g. `https://my-car-api.vercel.app`.

### 5.4 What Changes After Deployment

| Before deployment | After deployment |
|---|---|
| API only reachable at `localhost:3001` | API reachable from anywhere via `https://my-car-api.vercel.app` |
| You run `npm start` manually | Vercel runs the function automatically per request |
| No public URL | Public URL, shareable with any frontend |

**Before:**
```text
Your Computer
React → localhost:3001 → Car API
```

**After:**
```text
Internet → Vercel → Car API (publicly accessible)
```

---

## 6. Step 4 — Connect to a React Frontend

### 6.1 Before Deployment (Local Development)

```js
const response = await fetch('http://localhost:3001/api/cars');
const cars = await response.json();
```

Or with Axios:

```js
const response = await axios.get('http://localhost:3001/api/cars');
console.log(response.data);
```

### 6.2 After Deployment (Production)

Only the base URL changes:

```js
fetch('https://my-car-api.vercel.app/api/cars');
```

### 6.3 Best Practice — Use Environment Variables Instead of Hardcoding

Don't hardcode either URL. Use a Vite environment variable so you never touch the source code again when the backend URL changes.

**`.env.development`**
```env
VITE_API_URL=http://localhost:3001
```

**Vercel project settings (production env variable)**
```env
VITE_API_URL=https://my-car-api.vercel.app
```

**React code (stays the same everywhere):**
```js
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/cars`);
const cars = await response.json();
```

---

## 7. CORS Explained

Browsers block cross-origin requests by default (e.g. React on `localhost:5173` calling an API on `localhost:3001`). This project allows all origins via:

```js
res.set('Access-Control-Allow-Origin', '*');
```

```text
React (localhost:5173)  --HTTP-->  Car API (localhost:3001)
```

Without this header, the browser would block the request even though the server is running fine.

---

## 8. Local vs Production — Side by Side

**Local**
```text
React → http://localhost:3001 → Express → cars.js
```

**Production**
```text
React → https://my-car-api.vercel.app → Vercel Function → cars.js
```

**Full production architecture (both apps deployed):**

```text
                    INTERNET
                       |
          ┌────────────┴────────────┐
          |                         |
          v                         v
  React (Vercel)             Car API (Vercel)
          |                         |
          |        HTTPS            |
          └────────────────────────►|
                                    v
                             carsRepository.js
                                    |
                                    v
                                cars.js
```

---

## 9. Limitations of This Approach

The car data lives in an **in-memory JavaScript array** — this is not permanent storage.

If you later add a write endpoint:

```http
POST /api/cars
```

```js
cars.push(newCar);
```

⚠️ **Do not expect this to persist** on Vercel. Serverless functions are stateless and can restart or reset between invocations — any in-memory changes disappear.

For real persistence, you need a database:

```text
React → API → PostgreSQL
```

---

## 10. Future Evolution (Adding a Database)

**Current architecture:**
```text
React → Express → Repository → cars.js
```

**Target architecture:**
```text
React → Controller → Service → Repository → PostgreSQL
```

**Future endpoints to add:**

```http
POST   /api/cars
GET    /api/cars
GET    /api/cars/:id
PUT    /api/cars/:id
PATCH  /api/cars/:id
DELETE /api/cars/:id
```

**Future features to consider:**

- PostgreSQL + full CRUD
- Validation
- Pagination, sorting, searching
- Price / category filtering
- Authentication + JWT
- Admin dashboard
- Image storage
- Swagger / OpenAPI docs
- Global error handling
- DTOs

---

## 11. Quick Command Reference

```bash
# Install dependencies
npm install

# Start locally
npm start

# Development mode (if configured with nodemon)
npm run dev

# Git deployment
git add .
git commit -m "Create car API"
git push
```

**Test endpoints locally:**
```text
http://localhost:3001/api/cars
http://localhost:3001/api/cars/1
http://localhost:3001/api/cars/random/3
http://localhost:3001/api/cars/category/SPORTS
```

---

## Final Mental Model

```text
Client
  |
  | HTTP request
  v
Server (Express / Vercel Function)
  |
  | route
  v
Business/Data Logic (Repository)
  |
  v
Data (Array or Database)
  |
  v
HTTP Response
```

A database is optional — it only becomes necessary once you need data that is **persistent, shared, and mutable**. Until then:

```text
JavaScript Array + Express = REST API
```

And the deployment path is always the same:

```text
GitHub → Vercel → Public API URL → Consumed by React
```