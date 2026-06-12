# FriendList Frontend

A React-based frontend for managing a friend list, connected to a Spring Boot REST API backend.

---

## Tech Stack

- **React** (via Vite)
- **Axios** – HTTP client for API communication
- **Spring Boot** – Backend REST API (running on `localhost:8080`)

---

## Project Setup

### Phase 12 – Create React Project

Scaffold the project using Vite:

```bash
npm create vite@latest friendlist-frontend
cd friendlist-frontend
npm install
```

Install Axios:

```bash
npm install axios
```

---

## Project Structure

```
friendlist-frontend/
├── src/
│   ├── api/
│   │   └── friendApi.js      # API layer (Axios calls)
│   ├── App.jsx               # Main component
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Phase 13 – API Layer

Create the API abstraction file at `src/api/friendApi.js`:

```js
import axios from "axios";

const API = "http://localhost:8080/api/friends";

export const getFriends = () => axios.get(API);

export const addFriend = (friend) => axios.post(API, friend);

export const deleteFriend = (id) => axios.delete(`${API}/${id}`);
```

| Function         | Method   | Endpoint               | Description           |
|------------------|----------|------------------------|-----------------------|
| `getFriends()`   | `GET`    | `/api/friends`         | Fetch all friends     |
| `addFriend()`    | `POST`   | `/api/friends`         | Add a new friend      |
| `deleteFriend()` | `DELETE` | `/api/friends/:id`     | Delete friend by ID   |

---

## Phase 14 – Connect React to API

Update `src/App.jsx` to load and display friends from the backend:

```jsx
import { useEffect, useState } from "react";
import { getFriends } from "./api/friendApi";

function App() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    const response = await getFriends();
    setFriends(response.data);
  };

  return (
    <div>
      <h1>Friend List</h1>
      {friends.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}
    </div>
  );
}

export default App;
```

### How It Works

1. `useEffect` runs `loadFriends()` once on component mount.
2. `loadFriends()` calls `getFriends()` from the API layer.
3. The response data is stored in the `friends` state array.
4. The friends list is rendered dynamically using `.map()`.

---

## Running the App

Make sure the Spring Boot backend is running on port `8080`, then:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Prerequisites

- Node.js `>=18`
- Spring Boot backend running at `http://localhost:8080`
- CORS enabled on the backend for `http://localhost:5173`
