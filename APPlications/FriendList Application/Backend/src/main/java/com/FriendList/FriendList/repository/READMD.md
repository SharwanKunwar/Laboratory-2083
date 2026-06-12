# FriendRepository Documentation

## Overview

The `FriendRepository` interface is responsible for communicating with the database.

It acts as a bridge between the application and the `friends` table. Instead of writing SQL queries manually, Spring Data JPA automatically provides common database operations through the `JpaRepository` interface.

---

# FriendRepository Code

```java id="6xrrkw"
package com.FriendList.FriendList.repository;

import com.FriendList.FriendList.model.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {

}
```

---

# Purpose

The main purpose of `FriendRepository` is to provide database operations for the `Friend` entity.

It allows the application to:

* Save a friend
* Find a friend by ID
* Retrieve all friends
* Update friend information
* Delete a friend
* Count total friends

without writing SQL queries manually.

---

# Understanding JpaRepository

```java id="etxw8t"
JpaRepository<Friend, Long>
```

The `JpaRepository` interface is provided by Spring Data JPA.

### Syntax

```java id="nqvlgu"
JpaRepository<EntityClass, PrimaryKeyType>
```

### In Our Project

```java id="5rlyr0"
JpaRepository<Friend, Long>
```

Where:

| Parameter | Meaning                                          |
| --------- | ------------------------------------------------ |
| Friend    | The entity class managed by this repository      |
| Long      | The data type of the entity's primary key (`id`) |

---

# How It Works

When Spring Boot starts:

1. It finds the `FriendRepository` interface.
2. It notices that it extends `JpaRepository`.
3. Spring automatically creates an implementation at runtime.
4. The implementation is registered as a Bean in the Spring Container.
5. The repository becomes available for dependency injection.

This means you do not need to write any implementation class yourself.

---

# Built-in Methods Provided by JpaRepository

By extending `JpaRepository`, the following methods become available automatically.

---

## 1. Save a Friend

```java id="kkh1qb"
friendRepository.save(friend);
```

### Purpose

Stores a new friend in the database.

### Example

```java id="ytcxij"
Friend friend = new Friend();
friend.setName("John");
friend.setEmail("john@gmail.com");
friend.setPhone("9812345678");

friendRepository.save(friend);
```

### SQL Equivalent

```sql id="m8jvm0"
INSERT INTO friends (name, email, phone)
VALUES ('John', 'john@gmail.com', '9812345678');
```

---

## 2. Find Friend by ID

```java id="3vx1g5"
friendRepository.findById(id);
```

### Purpose

Retrieves a specific friend using its ID.

### Example

```java id="ngqjlwm"
friendRepository.findById(1L);
```

### SQL Equivalent

```sql id="gtxyl6"
SELECT * FROM friends WHERE id = 1;
```

---

## 3. Get All Friends

```java id="00vkji"
friendRepository.findAll();
```

### Purpose

Retrieves all friends from the database.

### Example

```java id="r4gqmw"
List<Friend> friends = friendRepository.findAll();
```

### SQL Equivalent

```sql id="7k68zu"
SELECT * FROM friends;
```

---

## 4. Delete Friend by ID

```java id="xg1q85"
friendRepository.deleteById(id);
```

### Purpose

Removes a friend from the database.

### Example

```java id="g9f24j"
friendRepository.deleteById(1L);
```

### SQL Equivalent

```sql id="9sqg1u"
DELETE FROM friends WHERE id = 1;
```

---

## 5. Check if Friend Exists

```java id="qz1v4o"
friendRepository.existsById(id);
```

### Purpose

Checks whether a friend exists.

### Example

```java id="u3mbmz"
boolean exists = friendRepository.existsById(1L);
```

### Returns

```java id="smmvbd"
true
```

or

```java id="dgfnpz"
false
```

---

## 6. Count Total Friends

```java id="xvv5di"
friendRepository.count();
```

### Purpose

Returns the total number of records.

### Example

```java id="m34wtt"
long totalFriends = friendRepository.count();
```

---

# Custom Query Methods

Spring Data JPA allows you to create custom queries simply by naming methods correctly.

Example:

```java id="dfnlr2"
public interface FriendRepository extends JpaRepository<Friend, Long> {

    Optional<Friend> findByEmail(String email);

}
```

Spring automatically generates the query.

### Usage

```java id="c4c6mh"
friendRepository.findByEmail("john@gmail.com");
```

### SQL Equivalent

```sql id="awqaz5"
SELECT * FROM friends
WHERE email = 'john@gmail.com';
```

---

# Why We Use a Repository Layer

The Repository Layer follows the Separation of Concerns principle.

### Without Repository

Controller → Database

This makes code difficult to maintain.

### With Repository

Controller → Service → Repository → Database

Benefits:

* Cleaner architecture
* Easier maintenance
* Better testing
* Reusable database operations
* Less boilerplate code

---

# Spring Boot Flow

```text id="38m1fw"
Client Request
      ↓
Controller
      ↓
Service
      ↓
FriendRepository
      ↓
Database
```

### Example Flow

1. User submits friend information.
2. Controller receives the request.
3. Service performs business logic.
4. Repository saves data.
5. Database stores the record.
6. Response is returned to the user.

---

# Summary

`FriendRepository` is the Data Access Layer of the application.

By extending `JpaRepository<Friend, Long>`, Spring automatically provides:

* save()
* findById()
* findAll()
* deleteById()
* existsById()
* count()

This eliminates the need to write SQL queries for common CRUD operations and helps keep the code clean, maintainable, and scalable.
