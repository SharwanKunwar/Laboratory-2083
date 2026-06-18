# 📦 Spring Boot Dependencies Explained

When creating a Spring Boot project, you'll often add dependencies through **Spring Initializr**. Each dependency provides a set of libraries that help you build specific features without writing everything from scratch.

---

# 🌐 Spring Web

**Dependency**

```
Spring Web
```

## What it does

Spring Web is used to build **REST APIs** and **web applications** using Spring MVC.

It includes:

- Embedded Tomcat Server
- Spring MVC
- REST API support
- HTTP request handling
- JSON serialization/deserialization

Without Spring Web, your application cannot receive HTTP requests.

---

## Why do we use it?

To create APIs like:

```http
GET /users

POST /users

PUT /users/1

DELETE /users/1
```

It allows frontend applications (React, Angular, Mobile Apps) to communicate with your backend.

---

## Common Annotations

### `@RestController`

Marks a class as a REST Controller.

```java
@RestController
public class UserController {

}
```

---

### `@Controller`

Used for MVC applications returning HTML pages.

```java
@Controller
public class HomeController {

}
```

---

### `@RequestMapping`

Maps a URL to a controller.

```java
@RequestMapping("/api/users")
```

---

### `@GetMapping`

Handles GET requests.

```java
@GetMapping
public List<User> getUsers() {

}
```

---

### `@PostMapping`

Handles POST requests.

```java
@PostMapping
```

---

### `@PutMapping`

Handles UPDATE requests.

```java
@PutMapping("/{id}")
```

---

### `@DeleteMapping`

Handles DELETE requests.

```java
@DeleteMapping("/{id}")
```

---

### `@RequestBody`

Converts JSON into a Java object.

```java
@PostMapping
public User save(@RequestBody User user){

}
```

---

### `@PathVariable`

Reads variables from URL.

```java
@GetMapping("/{id}")
public User get(@PathVariable Long id){

}
```

---

### `@RequestParam`

Reads query parameters.

```java
@GetMapping
public List<User> search(@RequestParam String name){

}
```

---

# 🗄 Spring Data JPA

**Dependency**

```
Spring Data JPA
```

---

## What it does

Provides an abstraction over Hibernate for interacting with SQL databases.

Instead of writing SQL manually, you work with Java objects.

---

## Why do we use it?

Instead of writing

```sql
SELECT * FROM users;
```

You simply write

```java
userRepository.findAll();
```

Spring Data JPA generates the SQL automatically.

---

## Common Annotations

### `@Entity`

Marks a class as a database table.

```java
@Entity
public class User{

}
```

---

### `@Table`

Specifies table name.

```java
@Table(name="users")
```

---

### `@Id`

Primary key.

```java
@Id
```

---

### `@GeneratedValue`

Auto-generates IDs.

```java
@GeneratedValue(strategy = GenerationType.IDENTITY)
```

---

### `@Column`

Maps a field to a column.

```java
@Column(nullable=false)
private String name;
```

---

### Relationships

#### `@OneToOne`

One user → One profile

#### `@OneToMany`

One department → Many employees

#### `@ManyToOne`

Many employees → One department

#### `@ManyToMany`

Many students ↔ Many courses

---

## Repository Example

```java
public interface UserRepository
        extends JpaRepository<User,Long>{

}
```

Spring automatically provides

- save()
- findAll()
- findById()
- delete()
- count()

---

# 🐘 PostgreSQL Driver

**Dependency**

```
PostgreSQL Driver
```

---

## What it does

Allows Java applications to connect to a PostgreSQL database using JDBC.

Without this dependency, Spring Boot cannot communicate with PostgreSQL.

---

## Why do we use it?

It acts as a bridge between

```
Spring Boot
        ↓
JDBC Driver
        ↓
PostgreSQL Database
```

---

## Configuration

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb

spring.datasource.username=postgres

spring.datasource.password=password
```

No annotations are required for this dependency.

---

# ⚡ Lombok

**Dependency**

```
Lombok
```

---

## What it does

Automatically generates boilerplate code during compilation.

Without Lombok, you must write

- Getters
- Setters
- Constructors
- toString()
- equals()
- hashCode()

---

## Why do we use it?

Instead of writing

```java
public String getName(){}

public void setName(){}
```

Just use

```java
@Getter
@Setter
```

---

## Common Annotations

### `@Getter`

Creates getters.

---

### `@Setter`

Creates setters.

---

### `@Data`

Creates

- Getter
- Setter
- toString()
- equals()
- hashCode()

---

### `@NoArgsConstructor`

Creates empty constructor.

---

### `@AllArgsConstructor`

Creates constructor with all fields.

---

### `@RequiredArgsConstructor`

Creates constructor for final fields.

Very common in Spring Boot dependency injection.

---

### `@Builder`

Builder Pattern.

```java
User user = User.builder()
                .name("John")
                .age(20)
                .build();
```

---

# ✅ Validation

**Dependency**

```
Validation
```

---

## What it does

Validates incoming user data before processing it.

---

## Why do we use it?

Instead of checking manually

```java
if(name==null){

}
```

Spring validates automatically.

---

## Common Annotations

### `@Valid`

Triggers validation.

```java
@PostMapping
public User save(@Valid @RequestBody User user){

}
```

---

### `@NotNull`

Cannot be null.

---

### `@NotBlank`

Cannot be null or empty.

---

### `@NotEmpty`

Collection cannot be empty.

---

### `@Email`

Valid email only.

---

### `@Size`

```java
@Size(min=3,max=20)
```

---

### `@Min`

Minimum value.

---

### `@Max`

Maximum value.

---

### `@Pattern`

Regex validation.

Example

```java
@Pattern(regexp="^[A-Za-z]+$")
```

---

# 🔥 Spring Boot DevTools

**Dependency**

```
Spring Boot DevTools
```

---

## What it does

Improves the development experience.

Features:

- Automatic Restart
- Live Reload
- Faster Startup
- Better debugging

---

## Why do we use it?

Normally

```
Change code
↓

Stop server

↓

Run again
```

With DevTools

```
Change code

↓

Save File

↓

Application Restarts Automatically
```

No annotations are required.

---

# ⚙ Spring Configuration Processor

**Dependency**

```
Spring Configuration Processor
```

---

## What it does

Generates metadata for configuration properties.

It helps IDEs provide:

- Auto-completion
- Suggestions
- Validation for custom configuration properties

---

## Why do we use it?

Suppose you create

```properties
app.name=Quote API
```

The processor makes custom properties appear with IntelliSense in IDEs like IntelliJ IDEA and VS Code.

---

## Common Annotation

### `@ConfigurationProperties`

```java
@ConfigurationProperties(prefix="app")
public class AppProperties{

    private String name;

}
```

---

# 📌 Summary Table

| Dependency | Purpose | Common Annotations |
|------------|---------|-------------------|
| Spring Web | Build REST APIs & Web Applications | `@RestController`, `@GetMapping`, `@PostMapping`, `@RequestBody`, `@RequestParam`, `@PathVariable` |
| Spring Data JPA | Database ORM | `@Entity`, `@Id`, `@Table`, `@Column`, `@OneToMany`, `@ManyToOne` |
| PostgreSQL Driver | Connect to PostgreSQL | *(No annotations)* |
| Lombok | Reduce boilerplate code | `@Data`, `@Getter`, `@Setter`, `@Builder`, `@RequiredArgsConstructor` |
| Validation | Validate incoming data | `@Valid`, `@NotNull`, `@NotBlank`, `@Email`, `@Size`, `@Pattern` |
| Spring Boot DevTools | Development productivity | *(No annotations)* |
| Spring Configuration Processor | Custom configuration metadata | `@ConfigurationProperties` |

---

# 🎯 Recommended Learning Order

1. Spring Web
2. Spring Data JPA
3. PostgreSQL Driver
4. Validation
5. Lombok
6. Spring Boot DevTools
7. Spring Configuration Processor

Mastering these seven dependencies gives you a solid foundation for building most Spring Boot REST API applications.
