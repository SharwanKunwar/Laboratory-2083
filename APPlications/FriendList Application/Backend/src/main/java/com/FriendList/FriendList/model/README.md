# Friend Entity Validation Documentation

## Overview

The `Friend` entity represents a friend in the Friend List application.

Spring Boot uses this class to create the `friends` table in the PostgreSQL database. Each object of the `Friend` class becomes a row in the table, and each field becomes a column.

The entity also contains validation rules to ensure that only valid and meaningful data is stored in the database.

---

# Validation Dependency

To enable validation in Spring Boot, add the following dependency to your `pom.xml` file:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

# Friend Entity

```java
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "friends")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
    private String phone;
}
```

---

# Field Validations

## 1. ID Field

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

### Purpose

The `id` field uniquely identifies each friend.

### How It Works

* `@Id` marks the field as the primary key.
* `@GeneratedValue` automatically generates the ID value.
* The database increases the value automatically whenever a new friend is added.

### Example

| Friend | Generated ID |
| ------ | ------------ |
| John   | 1            |
| Alex   | 2            |
| Sarah  | 3            |

### Why We Use It

* Ensures every friend has a unique identifier.
* Makes updating, deleting, and searching records easier.

---

## 2. Name Validation

```java
@NotBlank(message = "Name is required")
@Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
private String name;
```

### Purpose

Ensures that every friend has a meaningful name.

### Validation Rules

#### @NotBlank

Checks that the field:

* Is not null
* Is not empty
* Does not contain only spaces

##### Valid Examples

```text
Sharwan
John Doe
```

##### Invalid Examples

```text
""
"   "
null
```

#### @Size(min = 2, max = 50)

Checks the length of the name.

##### Valid Examples

```text
John
Sharwan Jung Kunwar
```

##### Invalid Examples

```text
A
```

### Why We Use It

* Prevents meaningless names.
* Keeps data clean and readable.

---

## 3. Email Validation

```java
@NotBlank(message = "Email is required")
@Email(message = "Please enter a valid email address")
@Column(unique = true)
private String email;
```

### Purpose

Ensures that every friend has a valid and unique email address.

### Validation Rules

#### @NotBlank

The email field cannot be empty.

#### @Email

Checks whether the email follows a valid email format.

##### Valid Examples

```text
john@gmail.com
user123@yahoo.com
```

##### Invalid Examples

```text
johngmail.com
john@
@gmail.com
```

#### @Column(unique = true)

Prevents duplicate email addresses from being stored.

##### Example

Existing Email:

```text
john@gmail.com
```

Trying to save again:

```text
john@gmail.com
```

Result:

```text
Database Error: Duplicate Email
```

### Why We Use It

* Maintains unique contact information.
* Prevents duplicate records.

---

## 4. Phone Number Validation

```java
@NotBlank(message = "Phone number is required")
@Pattern(
    regexp = "^[0-9]{10}$",
    message = "Phone number must contain exactly 10 digits"
)
private String phone;
```

### Purpose

Ensures that every phone number follows a consistent format.

### Validation Rules

#### @NotBlank

The phone field cannot be empty.

#### @Pattern

Uses a Regular Expression (Regex) to validate the phone number.

### Regex Breakdown

```text
^        Start of text
[0-9]    Digits only
{10}     Exactly 10 digits
$        End of text
```

### Valid Examples

```text
9812345678
9876543210
```

### Invalid Examples

```text
98123
98A3456789
98123456789
```

### Why We Use It

* Prevents invalid phone numbers.
* Keeps phone numbers in a consistent format.

---

# Using Validation in Controllers

To activate validation, use the `@Valid` annotation inside controller methods.

```java
@PostMapping
public Friend createFriend(@Valid @RequestBody Friend friend) {
    return friendService.save(friend);
}
```

---

# How Validation Works

When a client sends data:

```json
{
    "name": "",
    "email": "invalid-email",
    "phone": "123"
}
```

Spring Boot performs the following steps:

1. Receives the request.
2. Checks all validation annotations.
3. Stops execution if any validation fails.
4. Returns validation error messages.
5. Saves data only if all validations pass.

---

# Benefits of Validation

* Prevents invalid data from entering the database.
* Improves application reliability.
* Maintains data consistency.
* Provides meaningful error messages to users.
* Reduces bugs caused by incorrect input.
* Helps enforce business rules automatically.

---

# Summary

The `Friend` entity uses validation annotations to ensure:

* Names are not empty and have a reasonable length.
* Emails are valid and unique.
* Phone numbers contain exactly 10 digits.
* Every friend has a unique ID.

These validations help maintain clean, accurate, and reliable data throughout the Friend List application.
