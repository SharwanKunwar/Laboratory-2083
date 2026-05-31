# 🐳 Docker + PostgreSQL + Spring Boot Setup Guide

> A complete step-by-step guide to setting up Docker on Kali Linux, running PostgreSQL inside Docker, and connecting it to a Spring Boot project.

---

## 📋 Table of Contents

- [Part 1 — Setting Up Docker on Kali Linux](#part-1--setting-up-docker-on-kali-linux)
- [Part 2 — Setting Up PostgreSQL in Docker using Portainer](#part-2--setting-up-postgresql-in-docker-using-portainer)
- [Part 3 — Connecting PostgreSQL to Spring Boot](#part-3--connecting-postgresql-to-spring-boot)
- [Part 4 — Building REST API with Spring Boot](#part-4--building-rest-api-with-spring-boot)
- [Part 5 — Testing with Postman](#part-5--testing-with-postman)
- [Quick Reference](#quick-reference)

---

## Part 1 — Setting Up Docker on Kali Linux

### Prerequisites

- Kali Linux (Debian-based)
- sudo privileges
- Internet connection

### Step 1.1 — Verify Docker Installation

First check if Docker is already installed:

```bash
docker --version
```

If you see a version number, Docker is already installed. Skip to **Step 1.3**.

### Step 1.2 — Install Docker (if not installed)

```bash
# Update package list
sudo apt update

# Install Docker
sudo apt install docker.io -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (avoids using sudo every time)
sudo usermod -aG docker $USER

# Verify installation
docker --version
```

### Step 1.3 — Install Portainer (GUI for Docker)

Docker Desktop does not work well on Kali Linux due to dependency issues. **Portainer** is the recommended GUI alternative — it runs inside Docker itself.

```bash
# Create a volume for Portainer data
docker volume create portainer_data

# Run Portainer container
docker run -d \
  --name portainer \
  --restart=always \
  -p 9000:9000 \
  -p 9443:9443 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

### Step 1.4 — Access Portainer

Open your browser and go to:

```
https://localhost:9443
```

> **Note:** Your browser may show a security warning. Click **"Advanced"** → **"Proceed anyway"** — this is safe for local use.

### Step 1.5 — First Time Portainer Setup

1. Create an **admin username and password** on the first screen
2. Click **"Create user"**
3. Click **"Get Started"**
4. Click on **"local"** environment to enter the dashboard

✅ Docker and Portainer are now ready!

---

## Part 2 — Setting Up PostgreSQL in Docker using Portainer

### Step 2.1 — Remove System PostgreSQL (if installed)

If PostgreSQL is already installed on your system, it will conflict with the Docker container on port 5432. Remove it first:

```bash
# Stop and disable system PostgreSQL
sudo systemctl stop postgresql
sudo systemctl disable postgresql

# Completely remove PostgreSQL from system
sudo apt purge postgresql* -y
sudo apt autoremove -y

# Remove leftover files
sudo rm -rf /etc/postgresql
sudo rm -rf /var/lib/postgresql
sudo rm -rf /var/log/postgresql

# Verify port 5432 is free (should return nothing)
sudo ss -tlnp | grep 5432
```

### Step 2.2 — Create a Volume for PostgreSQL Data

In Portainer:

1. Click **"Volumes"** in the left sidebar
2. Click **"Add volume"** (top right)
3. Enter name: `pgdata`
4. Click **"Create the volume"**

> This named volume ensures your database data **persists** even if the container is removed.

### Step 2.3 — Create PostgreSQL Container

In Portainer:

1. Click **"Containers"** in the left sidebar
2. Click **"Add container"** (top right)

Fill in the form:

**Name & Image:**

| Field | Value |
|-------|-------|
| Name  | `my-postgres` |
| Image | `postgres:16` |

**Port Mapping** → click "publish a new network port":

| Host Port | Container Port | Protocol |
|-----------|----------------|----------|
| `5432` | `5432` | TCP |

**Advanced Settings → "Env" tab** → click "Add environment variable" 3 times:

| Name | Value |
|------|-------|
| `POSTGRES_USER` | `admin` |
| `POSTGRES_PASSWORD` | `secret` |
| `POSTGRES_DB` | `mydb` |

**Advanced Settings → "Volumes" tab** → click "map additional volume":

| Field | Value |
|-------|-------|
| Container path | `/var/lib/postgresql/data` |
| Volume | `pgdata` (select from dropdown) |
| Mode | Writable |

**Advanced Settings → "Restart policy" tab:**

| Field | Value |
|-------|-------|
| Policy | `Always` |

3. Click **"Deploy the container"**

### Step 2.4 — Verify PostgreSQL is Running

In Portainer → **Containers** → you should see `my-postgres` with a green **"running"** badge.

To test the connection:

1. Click on `my-postgres` container
2. Click the **"Console"** tab
3. Click **"Connect"**
4. Type inside the console:

```bash
psql -U admin -d mydb
```

You should see:

```
mydb=#
```

Type `\l` to list databases, then `\q` to exit.

✅ PostgreSQL is now running inside Docker!

---

## Part 3 — Connecting PostgreSQL to Spring Boot

### Step 3.1 — Create Spring Boot Project

Go to [start.spring.io](https://start.spring.io) and configure:

| Field | Value |
|-------|-------|
| Project | Maven |
| Language | Java |
| Spring Boot | 3.3.x or latest stable |
| Group | `com.example` |
| Artifact | `your-project-name` |
| Packaging | Jar |
| Java | 17 or 21 |

**Add these dependencies:**
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Lombok

Click **"Generate"** → download and extract the zip → open in IntelliJ IDEA.

### Step 3.2 — Configure `pom.xml`

Make sure your `pom.xml` has these dependencies (replace the entire dependencies section):

```xml
<dependencies>
    <!-- Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- PostgreSQL Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

> ⚠️ **Common Mistake:** Do NOT use `spring-boot-starter-data-jpa-test` or `spring-boot-starter-webmvc-test` — these do not exist and will cause Maven to run your app from the wrong `test-classes` directory.

After editing `pom.xml`:
- Right click `pom.xml` → **Maven** → **Reload project**

### Step 3.3 — Configure `application.properties`

Open `src/main/resources/application.properties` and add:

```properties
spring.application.name=your-project-name

# PostgreSQL Docker Connection
spring.datasource.url=jdbc:postgresql://localhost:5432/mydb
spring.datasource.username=admin
spring.datasource.password=secret
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.open-in-view=false
```

### Step 3.4 — Run and Verify Connection

Run your Spring Boot application. Look for these lines in the logs:

```
HikariPool-1 - Start completed.
Database JDBC URL [jdbc:postgresql://localhost:5432/mydb]
Tomcat started on port 8080
```

If you see `HikariPool-1 - Start completed` — the connection is successful! ✅

---

## Part 4 — Building REST API with Spring Boot

This is a sample **DeathNote** REST API using `target` and `deathReason` fields as an example. Adapt to your own project.

### Project Structure

```
src/main/java/com/example/DeathNote/
├── entity/
│   └── DeathNote.java
├── repository/
│   └── DeathNoteRepository.java
├── service/
│   └── DeathNoteService.java
├── controller/
│   └── DeathNoteController.java
└── DeathNoteApplication.java
```

### Step 4.1 — Entity

`src/main/java/com/example/DeathNote/entity/DeathNote.java`

```java
package com.example.DeathNote.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "death_notes")
@Data
public class DeathNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private String deathReason;

    @Column(updatable = false)
    private LocalDateTime writtenAt = LocalDateTime.now();
}
```

### Step 4.2 — Repository

`src/main/java/com/example/DeathNote/repository/DeathNoteRepository.java`

```java
package com.example.DeathNote.repository;

import com.example.DeathNote.entity.DeathNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeathNoteRepository extends JpaRepository<DeathNote, Long> {
}
```

### Step 4.3 — Service

`src/main/java/com/example/DeathNote/service/DeathNoteService.java`

```java
package com.example.DeathNote.service;

import com.example.DeathNote.entity.DeathNote;
import com.example.DeathNote.repository.DeathNoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeathNoteService {

    private final DeathNoteRepository repository;

    public DeathNote writeEntry(DeathNote deathNote) {
        return repository.save(deathNote);
    }

    public List<DeathNote> getAllEntries() {
        return repository.findAll();
    }

    public DeathNote getEntryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry not found with id: " + id));
    }

    public void deleteEntry(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Entry not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
```

### Step 4.4 — Controller

`src/main/java/com/example/DeathNote/controller/DeathNoteController.java`

```java
package com.example.DeathNote.controller;

import com.example.DeathNote.entity.DeathNote;
import com.example.DeathNote.service.DeathNoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/deathnote")
@RequiredArgsConstructor
public class DeathNoteController {

    private final DeathNoteService service;

    @PostMapping
    public ResponseEntity<DeathNote> writeEntry(@RequestBody DeathNote deathNote) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.writeEntry(deathNote));
    }

    @GetMapping
    public ResponseEntity<List<DeathNote>> getAllEntries() {
        return ResponseEntity.ok(service.getAllEntries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeathNote> getEntry(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEntryById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntry(@PathVariable Long id) {
        service.deleteEntry(id);
        return ResponseEntity.ok("Entry " + id + " has been erased from the Death Note.");
    }
}
```

### API Endpoints

| Method | URL | Description | Status Code |
|--------|-----|-------------|-------------|
| `POST` | `/api/deathnote` | Create a new entry | `201 Created` |
| `GET` | `/api/deathnote` | Get all entries | `200 OK` |
| `GET` | `/api/deathnote/{id}` | Get single entry by ID | `200 OK` |
| `DELETE` | `/api/deathnote/{id}` | Delete an entry by ID | `200 OK` |

---

## Part 5 — Testing with Postman

### Step 5.1 — Install Postman

```bash
# Option 1 — via Snap (recommended)
sudo snap install postman

# Option 2 — manual install
wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
tar -xzf postman.tar.gz
sudo mv Postman /opt/postman
sudo ln -s /opt/postman/Postman /usr/local/bin/postman
postman
```

### Step 5.2 — Test POST Request

```
Method:  POST
URL:     http://localhost:8080/api/deathnote
Headers: Content-Type: application/json
```

Body (raw → JSON):
```json
{
    "target": "Light Yagami",
    "deathReason": "Heart attack"
}
```

Expected Response (`201 Created`):
```json
{
    "id": 1,
    "target": "Light Yagami",
    "deathReason": "Heart attack",
    "writtenAt": "2026-05-31T09:12:09"
}
```

### Step 5.3 — Test GET All

```
Method: GET
URL:    http://localhost:8080/api/deathnote
```

### Step 5.4 — Test GET by ID

```
Method: GET
URL:    http://localhost:8080/api/deathnote/1
```

### Step 5.5 — Test DELETE

```
Method: DELETE
URL:    http://localhost:8080/api/deathnote/1
```

Expected Response:
```
Entry 1 has been erased from the Death Note.
```

### Step 5.6 — Test with curl (alternative to Postman)

```bash
# POST
curl -X POST http://localhost:8080/api/deathnote \
  -H "Content-Type: application/json" \
  -d '{"target": "Light Yagami", "deathReason": "Heart attack"}'

# GET all
curl http://localhost:8080/api/deathnote

# GET by id
curl http://localhost:8080/api/deathnote/1

# DELETE
curl -X DELETE http://localhost:8080/api/deathnote/1
```

---

## Quick Reference

### Docker / Portainer Commands

```bash
# Start Portainer
docker start portainer

# Stop Portainer
docker stop portainer

# Start PostgreSQL container
docker start my-postgres

# Stop PostgreSQL container
docker stop my-postgres

# View container logs
docker logs my-postgres

# Check running containers
docker ps

# Check all containers (including stopped)
docker ps -a
```

### PostgreSQL Inside Docker

```bash
# Connect to PostgreSQL inside the container
docker exec -it my-postgres psql -U admin -d mydb

# Useful psql commands
\l        # list all databases
\dt       # list all tables
\d table  # describe a table
\q        # quit
```

### Common Issues & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| `address already in use` on port 5432 | System PostgreSQL running | `sudo systemctl stop postgresql` |
| `Cannot resolve symbol` in IntelliJ | Maven not reloaded | Right click `pom.xml` → Maven → Reload project |
| App runs from `test-classes` | Wrong test dependencies in `pom.xml` | Remove `*-test` fake dependencies, use `spring-boot-starter-test` only |
| `HikariPool connection failed` | Wrong DB credentials or container stopped | Check `application.properties` and ensure container is running |
| Portainer not opening | Container stopped | `docker start portainer` |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 28.x | Container runtime |
| Portainer CE | 2.39.x | Docker GUI |
| PostgreSQL | 16 | Database |
| Spring Boot | 4.0.x | Backend framework |
| Spring Data JPA | - | ORM / database access |
| Hibernate | 7.x | JPA implementation |
| Lombok | - | Boilerplate reduction |
| Java | 17+ | Programming language |
| Maven | 3.x | Build tool |
| Postman | latest | API testing |

---

> 📝 **Note:** This guide was written for Kali Linux. Steps should work on any Debian-based Linux distribution with minor adjustments.