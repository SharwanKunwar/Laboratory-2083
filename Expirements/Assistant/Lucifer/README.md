# PC-ontroller API Usage From React

This Spring Boot app exposes an API that opens Google Chrome on the machine where the backend is running.

## Backend API

Endpoint:

```http
POST http://localhost:8080/api/manager/open-chrome
```

Success response:

```text
Chrome opened successfully
```

## Run The Backend

From this project folder:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend runs on `http://localhost:8080` by default.

## React Button Example

Create a button in your React frontend that calls the backend API when the user clicks it.

```jsx
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function openChrome() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/manager/open-chrome", {
        method: "POST",
      });

      const text = await response.text();
      setMessage(text);
    } catch (error) {
      setMessage("Failed to call backend API");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={openChrome} disabled={loading}>
        {loading ? "Opening..." : "Open Chrome"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
```

## Vite React Proxy Option

If your React app uses Vite, you can avoid writing the full backend URL in every API call.

In `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
```

Then call the API like this:

```jsx
const response = await fetch("/api/manager/open-chrome", {
  method: "POST",
});
```

## CORS Setup

If your React app runs on another port, for example `http://localhost:5173`, the browser may block the request because of CORS.

You can allow the React frontend by adding `@CrossOrigin` to the controller:

```java
@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {
    // existing code
}
```

Make sure the import exists:

```java
import org.springframework.web.bind.annotation.CrossOrigin;
```

## Test With cURL

Before testing from React, confirm the backend API works:

```bash
curl -X POST http://localhost:8080/api/manager/open-chrome
```

Expected output:

```text
Chrome opened successfully
```

## Important Notes

- Chrome opens on the computer running the Spring Boot backend, not on the user's browser device.
- On Linux, the backend currently runs `google-chrome`, so that command must be installed and available in the system path.
- This API should only be used locally or on a trusted private network because it starts a program on the backend machine.
