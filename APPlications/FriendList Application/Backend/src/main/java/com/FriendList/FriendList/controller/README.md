# Friend Controller Documentation

## Overview

The `FriendController` is the entry point for client requests.

It receives HTTP requests from the frontend (React application), processes the request, calls the appropriate service method, and returns a response to the client.

The controller does not directly communicate with the database. Instead, it delegates all business logic to the Service Layer.

---

# Controller Code

```java id="5c7wzv"
@RequestMapping("/api/friends")
@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService service;

    @PostMapping
    public Friend createFriend(@RequestBody Friend friend) {
        return service.addFriend(friend);
    }

    @GetMapping
    public List<Friend> getAllFriends() {
        return service.getAllFriends();
    }

    @GetMapping("/{id}")
    public Friend getFriendById(@PathVariable Long id) {
        return service.getFriendById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFriendById(@PathVariable Long id) {
        service.deleteFriend(id);
    }
}
```

---

# What is a Controller?

A Controller is a Spring Boot component responsible for handling HTTP requests.

It acts as a bridge between:

```text id="w0y4xw"
Frontend (React)
        ↓
Controller
        ↓
Service Layer
        ↓
Repository
        ↓
Database
```

Whenever a client sends a request, the controller receives it first.

---

# Request Flow

```text id="0j3v0e"
React Application
        ↓
HTTP Request
        ↓
FriendController
        ↓
FriendService
        ↓
FriendRepository
        ↓
PostgreSQL Database
```

After processing:

```text id="8a5m0l"
Database
      ↓
Repository
      ↓
Service
      ↓
Controller
      ↓
JSON Response
      ↓
React Application
```

---

# Understanding Annotations

---

## @RestController

```java id="r6xz7o"
@RestController
```

### Purpose

Marks the class as a REST API Controller.

### What It Does

Combines:

```java id="t4h17f"
@Controller
@ResponseBody
```

### Benefits

* Handles HTTP requests.
* Automatically converts Java objects into JSON.
* Eliminates the need to write JSON conversion code manually.

### Example

Java Object:

```java id="r0m5y9"
Friend friend = new Friend(
    1L,
    "John",
    "john@gmail.com",
    "9812345678"
);
```

Returned JSON:

```json id="j4c8j4"
{
  "id": 1,
  "name": "John",
  "email": "john@gmail.com",
  "phone": "9812345678"
}
```

---

## @RequestMapping

```java id="n5zr8z"
@RequestMapping("/api/friends")
```

### Purpose

Defines the base URL for all endpoints inside the controller.

### Result

Every endpoint starts with:

```text id="rmp6rj"
/api/friends
```

### Example URLs

```text id="1mcr7j"
GET    /api/friends
GET    /api/friends/1
POST   /api/friends
DELETE /api/friends/1
```

### Why Use It?

Avoids repeating the same URL multiple times.

---

## @RequiredArgsConstructor

```java id="0e2gzt"
@RequiredArgsConstructor
```

### Purpose

Generates a constructor automatically for all `final` fields.

### Without Lombok

```java id="r4n98d"
private final FriendService service;

public FriendController(FriendService service) {
    this.service = service;
}
```

### With Lombok

```java id="uyj15f"
@RequiredArgsConstructor
private final FriendService service;
```

Lombok creates the constructor automatically.

---

# Dependency Injection

```java id="o5r1b0"
private final FriendService service;
```

### Purpose

Injects the Service Layer into the Controller.

### How It Works

Spring automatically creates:

```java id="nww3na"
new FriendController(friendService);
```

during application startup.

### Why Use It?

* Cleaner code.
* Easier testing.
* Better maintainability.

---

# Endpoint Explanations

---

## 1. Create Friend

```java id="hyjtbz"
@PostMapping
public Friend createFriend(@RequestBody Friend friend) {
    return service.addFriend(friend);
}
```

### HTTP Method

```text id="vwr5d7"
POST
```

### Endpoint

```text id="6l5mk5"
/api/friends
```

### Purpose

Creates a new friend and saves it to the database.

### @RequestBody

```java id="ztjlwm"
@RequestBody Friend friend
```

Converts incoming JSON into a Java object.

### Example Request

```json id="f8dgn7"
{
  "name": "John",
  "email": "john@gmail.com",
  "phone": "9812345678"
}
```

### Flow

```text id="y7nk43"
Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Response

```json id="h8p8yu"
{
  "id": 1,
  "name": "John",
  "email": "john@gmail.com",
  "phone": "9812345678"
}
```

---

## 2. Get All Friends

```java id="3gf4uq"
@GetMapping
public List<Friend> getAllFriends() {
    return service.getAllFriends();
}
```

### HTTP Method

```text id="ywiy8f"
GET
```

### Endpoint

```text id="ucx4um"
/api/friends
```

### Purpose

Retrieves all friends from the database.

### Example Request

```http id="wh8p3z"
GET /api/friends
```

### Example Response

```json id="w1n5rh"
[
  {
    "id": 1,
    "name": "John",
    "email": "john@gmail.com",
    "phone": "9812345678"
  },
  {
    "id": 2,
    "name": "Sarah",
    "email": "sarah@gmail.com",
    "phone": "9876543210"
  }
]
```

---

## 3. Get Friend By ID

```java id="gkg0mh"
@GetMapping("/{id}")
public Friend getFriendById(@PathVariable Long id) {
    return service.getFriendById(id);
}
```

### HTTP Method

```text id="fjep8g"
GET
```

### Endpoint

```text id="6gtt4z"
/api/friends/{id}
```

### Example

```text id="1r0cxg"
/api/friends/1
```

### @PathVariable

```java id="5u8jht"
@PathVariable Long id
```

Extracts the ID from the URL.

### Example

URL:

```text id="1kegkg"
/api/friends/5
```

Extracted Value:

```java id="iwjlr3"
id = 5
```

### Example Response

```json id="c1g4lz"
{
  "id": 5,
  "name": "John",
  "email": "john@gmail.com",
  "phone": "9812345678"
}
```

---

## 4. Delete Friend By ID

```java id="j27g0f"
@DeleteMapping("/{id}")
public void deleteFriendById(@PathVariable Long id) {
    service.deleteFriend(id);
}
```

### HTTP Method

```text id="0czr57"
DELETE
```

### Endpoint

```text id="dgljlwm"
/api/friends/{id}
```

### Example

```http id="igcbpv"
DELETE /api/friends/1
```

### Purpose

Deletes a friend from the database.

### Flow

```text id="2vq0dg"
Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

### Result

The record with the given ID is removed permanently.

---

# HTTP Methods Used

| Method | Endpoint            | Purpose               |
| ------ | ------------------- | --------------------- |
| POST   | `/api/friends`      | Create a new friend   |
| GET    | `/api/friends`      | Get all friends       |
| GET    | `/api/friends/{id}` | Get a friend by ID    |
| DELETE | `/api/friends/{id}` | Delete a friend by ID |

---

# Example API Usage

## Create Friend

```http id="2iqdnt"
POST /api/friends
```

Body:

```json id="tf0s1f"
{
  "name": "Sharwan",
  "email": "sharwan@gmail.com",
  "phone": "9812345678"
}
```

---

## Get All Friends

```http id="07o5gb"
GET /api/friends
```

---

## Get Friend By ID

```http id="pnk7ub"
GET /api/friends/1
```

---

## Delete Friend

```http id="ztm1we"
DELETE /api/friends/1
```

---

# Why Use a Controller?

The Controller Layer provides:

* Request handling
* URL mapping
* JSON conversion
* Communication with the Service Layer
* API endpoint management

Without controllers, clients would have no way to interact with the application.

---

# Summary

The `FriendController` is the REST API layer of the Friend List application.

Its responsibilities include:

* Receiving HTTP requests.
* Mapping URLs to methods.
* Converting JSON into Java objects.
* Calling the Service Layer.
* Returning responses as JSON.

Endpoints provided:

* `POST /api/friends`
* `GET /api/friends`
* `GET /api/friends/{id}`
* `DELETE /api/friends/{id}`

This controller follows Spring Boot's layered architecture and serves as the communication bridge between the React frontend and the Spring Boot backend.
