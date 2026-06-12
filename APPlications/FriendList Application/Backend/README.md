# FriendList — Spring Boot + PostgreSQL + Docker

A full-stack backend project demonstrating REST API development with Spring Boot, PostgreSQL, JPA/Hibernate, and Docker.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot (Java) |
| ORM | JPA / Hibernate |
| Database | PostgreSQL 16 |
| Container | Docker via Portainer CE |

---

## 1. PostgreSQL Setup (Docker / Portainer)

### Container Configuration

**Image:** `postgres:16`

**Environment Variables:**
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=friendlistdb
```

**Port Mapping:**
```
Host: 5432  →  Container: 5432
```
> Use `5433 → 5432` if port 5432 is already occupied on the host.

**Volume (recommended):**
```
/var/lib/postgresql/data
```
> Without a volume, all data is lost when the container is removed.

---

## 2. PostgreSQL CLI Reference

| Command | Description |
|---|---|
| `psql -U postgres` | Login to PostgreSQL |
| `\l` | List all databases |
| `\c friendlistdb` | Connect to a database |
| `\dt` | List all tables |
| `\d friends` | View table structure |
| `SELECT * FROM friends;` | Query all records |

### Manual Schema (Reference)

```sql
CREATE DATABASE friendlistdb;

CREATE TABLE friends (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20)
);
```
> In this project, Hibernate generates the table automatically — manual creation is not required.

---

## 3. Spring Boot Setup

### Maven Dependency

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/friendlistdb
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## 4. Project Structure

### Entity

```java
@Entity
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
}
```

### Repository

```java
@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
}
```

---

## 5. System Architecture

```
Spring Boot Application
         │
    JPA (Hibernate)
         │
     JDBC Driver
         │
 PostgreSQL Container (Docker)
         │
     friendlistdb
         │
     friends table
```

---

## 6. Auto Table Generation

When the application starts, Hibernate reads the `@Entity` classes and auto-generates (or updates) the corresponding tables based on `ddl-auto=update`.

**Generated schema:**
```sql
friends (
    id    BIGINT PRIMARY KEY,
    name  VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255)
)
```

---

## 7. Common Mistakes

### ❌ Wrong environment variable names
```env
POSTGRESQL_USER=...      # incorrect
POSTGRESQL_PASSWORD=...  # incorrect
```

### ✅ Correct names
```env
POSTGRES_USER=...        # correct
POSTGRES_PASSWORD=...    # correct
```

---

## 8. Roadmap

- [x] PostgreSQL running in Docker
- [x] Database `friendlistdb` created
- [x] Table `friends` auto-generated via Hibernate
- [x] Spring Boot connected successfully
- [ ] REST API — `GET`, `POST`, `PUT`, `DELETE`
- [ ] Postman testing
- [ ] DTO + Service layer architecture
- [ ] React frontend integration
- [ ] Docker Compose (Spring Boot + DB together)

---

## Author

Built while learning Spring Boot, PostgreSQL, Docker, and backend architecture.