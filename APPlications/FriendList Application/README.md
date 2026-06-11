# Friend List Application (Spring Boot + React + PostgreSQL)

## 📚 Project Overview

This project is a full-stack **Friend List Application** built using:

* Spring Boot (Backend)
* React (Frontend)
* PostgreSQL (Database)

The application allows users to:

* Add Friends
* View Friend List
* Get Friend Details
* Delete Friends

---

# 🏗️ Application Architecture

```text
React Frontend
       |
       | HTTP Request
       v
Spring Boot REST API
       |
       | JPA/Hibernate
       v
PostgreSQL Database
```

Example Flow:

```text
User clicks "Add Friend"

React
  |
POST /api/friends
  |
Spring Boot
  |
Save Friend
  |
PostgreSQL
```

---

# 🚀 Phase 1: Create Spring Boot Project

Visit:

https://start.spring.io

### Project Configuration

```text
Project  : Maven
Language : Java
Group    : com.friendlist
Artifact : friendlist
Name     : friendlist
```

---

# 📦 Phase 2: Required Dependencies

## Spring Web

Used for creating REST APIs.

```xml
spring-boot-starter-web
```

---

## Spring Data JPA

Used for database operations.

```xml
spring-boot-starter-data-jpa
```

---

## PostgreSQL Driver

Used to connect PostgreSQL with Spring Boot.

```xml
postgresql
```

---

## Lombok

Reduces boilerplate code.

```xml
lombok
```

---

## Validation

Used for validating request data.

```xml
spring-boot-starter-validation
```

---

# 📁 Project Structure

```text
src/main/java

com.friendlist

├── controller
│     └── FriendController
│
├── service
│     ├── FriendService
│     └── FriendServiceImpl
│
├── repository
│     └── FriendRepository
│
├── model
│     └── Friend
│
├── dto
│     ├── FriendRequest
│     └── FriendResponse
│
├── exception
│     └── ResourceNotFoundException
│
└── FriendListApplication
```

---

# 📖 Layer Explanation

## Controller Layer

Handles incoming HTTP requests.

Examples:

```java
@GetMapping
@PostMapping
@DeleteMapping
```

---

## Service Layer

Contains business logic.

Examples:

```java
addFriend()
removeFriend()
getAllFriends()
```

---

## Repository Layer

Communicates with the database.

Examples:

```java
save()
findAll()
findById()
deleteById()
```

---

## Model Layer

Represents database tables.

Example:

```java
@Entity
public class Friend
```

---

## DTO Layer

Used for transferring data between client and server.

Examples:

```java
FriendRequest
FriendResponse
```

---

# 🗄️ Phase 3: Create PostgreSQL Database

```sql
CREATE DATABASE friendlist;
```

---

# ⚙️ Phase 4: Configure Database Connection

## application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/friendlist
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

# 🧩 Phase 5: Create Entity

## Friend.java

```java
package com.friendlist.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "friends")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;
}
```

---

# 🗃️ Phase 6: Create Repository

## FriendRepository.java

```java
package com.friendlist.repository;

import com.friendlist.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository
        extends JpaRepository<Friend, Long> {

}
```

Spring Data JPA automatically provides:

```java
save()
findAll()
findById()
deleteById()
```

---

# 🧠 Phase 7: Create Service Layer

## FriendService.java

```java
public interface FriendService {

    Friend addFriend(Friend friend);

    List<Friend> getAllFriends();

    Friend getFriend(Long id);

    void deleteFriend(Long id);
}
```

---

## FriendServiceImpl.java

```java
@Service
@RequiredArgsConstructor
public class FriendServiceImpl
        implements FriendService {

    private final FriendRepository repository;

    @Override
    public Friend addFriend(Friend friend) {
        return repository.save(friend);
    }

    @Override
    public List<Friend> getAllFriends() {
        return repository.findAll();
    }

    @Override
    public Friend getFriend(Long id) {
        return repository.findById(id)
                .orElseThrow();
    }

    @Override
    public void deleteFriend(Long id) {
        repository.deleteById(id);
    }
}
```

---

# 🌐 Phase 8: Create Controller

## FriendController.java

```java
@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService service;

    @PostMapping
    public Friend createFriend(
            @RequestBody Friend friend) {

        return service.addFriend(friend);
    }

    @GetMapping
    public List<Friend> getAllFriends() {
        return service.getAllFriends();
    }

    @GetMapping("/{id}")
    public Friend getFriend(
            @PathVariable Long id) {

        return service.getFriend(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFriend(
            @PathVariable Long id) {

        service.deleteFriend(id);
    }
}
```

---

# 🧪 Phase 9: Test the API

Run the application:

```bash
mvn spring-boot:run
```

API Endpoint:

```http
GET http://localhost:8080/api/friends
```

Testing Tools:

* Postman
* Bruno
* Insomnia

---

# ⚛️ Phase 10: Create React Project

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

# 🔌 Phase 11: Create API Layer

## src/api/friendApi.js

```javascript
import axios from "axios";

const API =
  "http://localhost:8080/api/friends";

export const getFriends = () =>
  axios.get(API);

export const addFriend = (friend) =>
  axios.post(API, friend);

export const deleteFriend = (id) =>
  axios.delete(`${API}/${id}`);
```

---

# 🔗 Phase 12: Connect React with Spring Boot

```jsx
import { useEffect, useState } from "react";
import { getFriends } from "./api/friendApi";

function App() {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    const response =
      await getFriends();

    setFriends(response.data);
  };

  return (
    <div>
      <h1>Friend List</h1>

      {friends.map(friend => (
        <div key={friend.id}>
          {friend.name}
        </div>
      ))}
    </div>
  );
}

export default App;
```

---

# 🔒 Phase 13: Configure CORS

## CorsConfig.java

```java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(
                    CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedOrigins(
                            "http://localhost:5173")
                        .allowedMethods("*");
            }
        };
    }
}
```

---

# 🎯 Future Improvements

## Level 2

* DTO Pattern
* Validation
* Global Exception Handling
* ResponseEntity

## Level 3

* User Registration
* Login
* JWT Authentication
* Password Encryption

## Level 4

* Docker
* Docker Compose
* PostgreSQL Container
* Spring Boot Deployment
* React Deployment

## Level 5

* Friend Requests
* Accept / Reject Requests
* Search Friends
* Mutual Friends
* Profile Pictures

---

# 🏆 Recommended Professional Structure

```text
controller
service
service.impl
repository
entity
dto
mapper
exception
config
security
```

This structure follows industry-standard Spring Boot architecture and makes the project easier to maintain, test, and scale.

