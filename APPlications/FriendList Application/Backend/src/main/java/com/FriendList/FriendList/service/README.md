# Friend Service Layer Documentation

## Overview

The Service Layer contains the business logic of the application.

It acts as a middle layer between the Controller and Repository. Instead of allowing controllers to directly access the database, controllers communicate with services, and services communicate with repositories.

This approach follows Spring Boot's layered architecture and keeps the application organized, maintainable, and scalable.

---

# Service Layer Architecture

```text
Client Request
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
Database
```

### Responsibilities of the Service Layer

* Process business logic.
* Validate application rules.
* Communicate with repositories.
* Prepare data before saving or returning it.
* Keep controllers clean and focused on handling requests.

---

# FriendService Interface

```java
package com.FriendList.FriendList.service;

import com.FriendList.FriendList.model.Friend;

import java.util.List;

public interface FriendService {
    Friend addFriend(Friend friend);
    List<Friend> getAllFriends();
    Friend getFriendById(Long id);
    void deleteFriend(Long id);
}
```

---

# Purpose of the Interface

The interface defines the contract that every service implementation must follow.

It specifies:

* What operations are available.
* What data each operation returns.
* The parameters required for each operation.

The interface does not contain implementation details.

---

# Why Use an Interface?

Using an interface provides several advantages:

### 1. Loose Coupling

Controllers depend on the interface instead of a specific implementation.

```java
private final FriendService friendService;
```

This makes the application more flexible.

---

### 2. Easier Testing

During testing, a mock implementation can replace the real service.

Example:

```java
FriendService mockService = new FakeFriendService();
```

---

### 3. Multiple Implementations

You can create different service implementations if needed.

Example:

```java
FriendServiceImpl
FriendServiceCachedImpl
FriendServiceRemoteImpl
```

All can implement the same interface.

---

# Service Implementation

```java
@Service
@RequiredArgsConstructor
public class FriendServiceIMPL implements FriendService {

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
    public Friend getFriendById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public void deleteFriend(Long id) {
        repository.deleteById(id);
    }
}
```

---

# Understanding Annotations

## @Service

```java
@Service
```

### Purpose

Marks this class as a Service Component.

### What Spring Does

When the application starts:

1. Spring scans the project.
2. Finds classes annotated with `@Service`.
3. Creates an object (Bean) automatically.
4. Stores the Bean inside the Spring Container.

### Why Use It?

Allows the service to be injected into controllers and other classes.

---

## @RequiredArgsConstructor

```java
@RequiredArgsConstructor
```

### Purpose

Automatically generates a constructor for all `final` fields.

### Without Lombok

You would write:

```java
private final FriendRepository repository;

public FriendServiceIMPL(FriendRepository repository) {
    this.repository = repository;
}
```

### With Lombok

```java
@RequiredArgsConstructor
private final FriendRepository repository;
```

Lombok generates the constructor automatically.

### Why Use It?

* Less boilerplate code.
* Cleaner classes.
* Encourages constructor injection.

---

# Dependency Injection

```java
private final FriendRepository repository;
```

### What Happens?

Spring automatically injects an instance of `FriendRepository`.

### Behind the Scenes

Spring creates:

```java
new FriendServiceIMPL(friendRepository);
```

automatically.

### Why Use It?

* Reduces object creation code.
* Makes classes easier to test.
* Follows Inversion of Control (IoC).

---

# Method Explanations

---

## 1. addFriend()

```java
@Override
public Friend addFriend(Friend friend) {
    return repository.save(friend);
}
```

### Purpose

Adds a new friend to the database.

### How It Works

1. Receives a Friend object.
2. Passes it to the repository.
3. Repository saves it.
4. Saved object is returned.

### Example

```java
Friend friend = new Friend();
friend.setName("John");

friendService.addFriend(friend);
```

### SQL Equivalent

```sql
INSERT INTO friends(name,email,phone)
VALUES('John','john@gmail.com','9812345678');
```

---

## 2. getAllFriends()

```java
@Override
public List<Friend> getAllFriends() {
    return repository.findAll();
}
```

### Purpose

Retrieves all friends from the database.

### How It Works

1. Calls `findAll()`.
2. Repository fetches every record.
3. Returns a list of Friend objects.

### Example

```java
List<Friend> friends = friendService.getAllFriends();
```

### SQL Equivalent

```sql
SELECT * FROM friends;
```

---

## 3. getFriendById()

```java
@Override
public Friend getFriendById(Long id) {
    return repository.findById(id).orElseThrow();
}
```

### Purpose

Retrieves a specific friend using its ID.

### How It Works

1. Receives an ID.
2. Searches the database.
3. Returns the friend if found.
4. Throws an exception if not found.

### Example

```java
Friend friend = friendService.getFriendById(1L);
```

### SQL Equivalent

```sql
SELECT * FROM friends
WHERE id = 1;
```

### Understanding Optional

`findById()` returns:

```java
Optional<Friend>
```

This means:

* A value may exist.
* A value may not exist.

### Why Use orElseThrow()?

```java
repository.findById(id).orElseThrow();
```

If the friend does not exist:

```java
NoSuchElementException
```

is thrown automatically.

---

## 4. deleteFriend()

```java
@Override
public void deleteFriend(Long id) {
    repository.deleteById(id);
}
```

### Purpose

Deletes a friend from the database.

### How It Works

1. Receives the friend ID.
2. Calls `deleteById()`.
3. Repository removes the record.

### Example

```java
friendService.deleteFriend(1L);
```

### SQL Equivalent

```sql
DELETE FROM friends
WHERE id = 1;
```

---

# Why Create a Service Layer?

Without a Service Layer:

```text
Controller
     ↓
Repository
```

Controllers become large and difficult to maintain.

---

With a Service Layer:

```text
Controller
     ↓
Service
     ↓
Repository
```

Benefits:

* Better code organization.
* Easier maintenance.
* Easier testing.
* Reusable business logic.
* Cleaner controllers.
* Follows Spring Boot best practices.

---

# Complete Request Flow

### Add Friend

```text
POST /friends
      ↓
Controller
      ↓
FriendService.addFriend()
      ↓
FriendRepository.save()
      ↓
Database
```

---

### Get All Friends

```text
GET /friends
      ↓
Controller
      ↓
FriendService.getAllFriends()
      ↓
FriendRepository.findAll()
      ↓
Database
```

---

### Get Friend By ID

```text
GET /friends/1
      ↓
Controller
      ↓
FriendService.getFriendById(1)
      ↓
FriendRepository.findById(1)
      ↓
Database
```

---

### Delete Friend

```text
DELETE /friends/1
      ↓
Controller
      ↓
FriendService.deleteFriend(1)
      ↓
FriendRepository.deleteById(1)
      ↓
Database
```

---

# Summary

The Service Layer acts as the application's business logic layer.

The `FriendService` interface defines the operations available, while `FriendServiceIMPL` provides the actual implementation.

Key responsibilities include:

* Adding friends.
* Retrieving all friends.
* Finding a friend by ID.
* Deleting a friend.

By introducing a Service Layer, the application becomes cleaner, easier to maintain, easier to test, and follows Spring Boot's recommended layered architecture.
