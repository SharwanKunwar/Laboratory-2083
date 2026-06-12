# 🐘 PostgreSQL with Docker & Portainer — Complete Guide

> A step-by-step guide to setting up a PostgreSQL container using Docker and Portainer, managing multiple databases, and connecting to Spring Boot.

---

## 📋 Table of Contents

- [Prerequisites — Install Docker](#-prerequisites--install-docker)
- [Access Portainer](#-access-portainer)
- [Create a PostgreSQL Container](#-create-a-postgresql-container)
- [Connect to the Container Console](#-connect-to-the-container-console)
- [Essential PostgreSQL Commands](#-essential-postgresql-commands)
- [Managing Multiple Databases](#-managing-multiple-databases)
- [Connect to Spring Boot](#-connect-to-spring-boot)

---

## 🐳 Prerequisites — Install Docker

> Skip this section if Docker is already installed.

### Linux (Debian/Ubuntu/Kali)

```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### Verify Installation

```bash
docker --version
# Docker version 24.x.x, build ...
```

### Install Portainer CE

```bash
docker volume create portainer_data

docker run -d \
  -p 8000:8000 \
  -p 9443:9443 \
  --name portainer \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v portainer_data:/data \
  portainer/portainer-ce:latest
```

> On Kali Linux, use `service docker start` instead of `systemctl`.

---

## 🌐 Access Portainer

1. Open your browser and go to:
   ```
   https://localhost:9443
   ```
2. Create an **admin account** on first launch.
3. Select **"Get Started"** → click on the **local** environment.

---

## 🚀 Create a PostgreSQL Container

### Step 1 — Navigate to Containers

From the Portainer dashboard:

```
Home → local → Containers → + Add Container
```

---

### Step 2 — Basic Configuration

| Field | Value |
|-------|-------|
| **Name** | `postgres-db` |
| **Image** | `postgres:16` *(or `postgres:latest`)* |

---

### Step 3 — Port Mapping

Click **"Port mapping"** → **"+ map additional port"**

| Host Port | Container Port | Protocol |
|-----------|----------------|----------|
| `5432` | `5432` | `tcp` |

---

### Step 4 — Environment Variables

Go to **"Advanced container settings"** → **"Env"** tab → click **"+ Add environment variable"**

Add the following:

| Name | Value |
|------|-------|
| `POSTGRES_USER` | `postgres` |
| `POSTGRES_PASSWORD` | `your_password` |
| `POSTGRES_DB` | `your_database_name` |

> ⚠️ Replace `your_password` and `your_database_name` with your actual values. Keep the password secure.

---

### Step 5 — Restart Policy

Under **"Restart Policy"**, select:

```
Always
```

This ensures the container restarts automatically if it stops or the system reboots.

---

### Step 6 — Deploy

Click **"Deploy the container"** and wait a few seconds for the container to start.

✅ You should see the container status turn **green (running)** in the Containers list.

---

## 🖥️ Connect to the Container Console

1. Go to **Containers** in the Portainer sidebar.
2. Click on your container name (e.g., `postgres-db`).
3. Click the **"Console"** tab.
4. Click **"Connect"**.

You are now inside the container's terminal. Run:

```bash
psql -U postgres your_database_name
```

You should see the PostgreSQL prompt:

```
your_database_name=#
```

---

## 📚 Essential PostgreSQL Commands

Once inside `psql`, here are the most important commands:

### 🗄️ Database Operations

| Command | Description |
|---------|-------------|
| `\l` | List all databases |
| `\c dbname` | Switch to (connect to) a database |
| `CREATE DATABASE dbname;` | Create a new database |
| `DROP DATABASE dbname;` | Delete a database |

### 📁 Table Operations

| Command | Description |
|---------|-------------|
| `\dt` | List all tables in current database |
| `\d tablename` | Describe a table (columns, types, constraints) |
| `CREATE TABLE ...` | Create a new table |
| `DROP TABLE tablename;` | Delete a table |
| `TRUNCATE tablename;` | Delete all rows but keep the table |

### 📝 Data Operations (CRUD)

| Command | Description |
|---------|-------------|
| `SELECT * FROM tablename;` | View all rows in a table |
| `SELECT col1, col2 FROM tablename WHERE condition;` | Filtered query |
| `INSERT INTO tablename (col1, col2) VALUES (val1, val2);` | Insert a row |
| `UPDATE tablename SET col1 = val WHERE condition;` | Update rows |
| `DELETE FROM tablename WHERE condition;` | Delete specific rows |

### 👤 User & Permission Operations

| Command | Description |
|---------|-------------|
| `\du` | List all users/roles |
| `CREATE USER username WITH PASSWORD 'pass';` | Create a new user |
| `GRANT ALL PRIVILEGES ON DATABASE dbname TO username;` | Grant full access |
| `ALTER USER username WITH PASSWORD 'newpass';` | Change user password |

### 🔧 Utility Commands

| Command | Description |
|---------|-------------|
| `\q` | Quit psql |
| `\?` | Help for psql commands |
| `\h` | Help for SQL commands |
| `\timing` | Toggle query execution time display |
| `\x` | Toggle expanded output (good for wide tables) |

---

## 🗂️ Managing Multiple Databases

One container can hold **multiple databases**. You can create additional databases after deployment:

```sql
-- Inside psql, connected as postgres
CREATE DATABASE project_alpha;
CREATE DATABASE project_beta;
CREATE DATABASE test_db;

-- Verify
\l
```

To switch between them:

```bash
\c project_alpha
# Now connected to project_alpha
```

> 💡 All databases share the same container and port `5432`. You connect to a specific database by specifying its name in the connection string.

---

## 🌱 Connect to Spring Boot

Add the following to your `application.yml` or `application.properties`:

### `application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_database_name
    username: postgres
    password: your_password
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    database-platform: org.hibernate.dialect.PostgreSQLDialect
```

### `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### Maven Dependency (`pom.xml`)

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

> ✅ Make sure your Docker container is running before starting the Spring Boot application.

---

## 🔁 Quick Reference — Container Management

| Action | How |
|--------|-----|
| Start container | Portainer → Containers → ▶ Start |
| Stop container | Portainer → Containers → ⏹ Stop |
| View logs | Portainer → Container → Logs tab |
| Restart | Portainer → Container → Restart |
| Remove | Stop first → then Remove |

---

## ⚡ Troubleshooting

**Port already in use?**
```bash
sudo lsof -i :5432
# Kill the conflicting process or change host port to 5433
```

**Can't connect from Spring Boot?**
- Ensure container status is **running** in Portainer
- Confirm the port mapping is `5432:5432`
- Verify `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD` env variables match your config

**Connection refused on Kali Linux?**
```bash
service docker start
```

---

*Documentation generated for BCA Project — Docker + PostgreSQL + Spring Boot stack.*
