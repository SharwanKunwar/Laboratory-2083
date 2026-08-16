# Quotemous Frontend

This is a Vite + React frontend for the Quotemous app.

Run locally:

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:8080` (Spring Boot backend).

To build for production and serve from Spring Boot, run:

```bash
npm run build
# copy dist/* into src/main/resources/static or configure Spring to serve the built files
```
