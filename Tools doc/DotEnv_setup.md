# 🔐 Dotenv Java Setup — Spring Boot

Securely manage environment variables in a Spring Boot + Maven project using `dotenv-java`. Keeps credentials out of source code and away from Git.

---

## 📦 Step 1 — Add the Dependency

Go to [mvnrepository.com](https://mvnrepository.com) → search **`dotenv-java`** → select **io.github.cdimascio** → pick the latest version → copy the Maven dependency.

Add it inside the `<dependencies>` block of your `pom.xml`:

```xml
<dependency>
    <groupId>io.github.cdimascio</groupId>
    <artifactId>dotenv-java</artifactId>
    <version>3.2.0</version>
    <scope>compile</scope>
</dependency>
```

---

## ⚙️ Step 2 — Load `.env` in Your Main Class

In your `@SpringBootApplication` main class, add these two lines **before** `SpringApplication.run()`:

```java
Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
dotenv.entries().forEach(entry ->
    System.setProperty(entry.getKey(), entry.getValue())
);
```

> **Why `.ignoreIfMissing()`?**  
> On CI/CD platforms (Render, Railway, GitHub Actions), env vars are injected directly into the process — no `.env` file exists. Without this flag, the app crashes on startup in those environments.

---

## 📄 Step 3 — Create the `.env` File

Place `.env` at the **project root** (same level as `pom.xml`). Fill in your actual credentials:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/friendlistdb
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password_here
```

> ⚠️ Replace values with your actual credentials. Never commit real passwords to source control.

---

## 🔧 Step 4 — Wire Up `application.properties`

Reference the env vars using Spring's `${VAR_NAME}` syntax. Spring reads them from system properties set in Step 2:

```properties
spring.application.name=FriendList
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

## 🚫 Step 5 — Add `.env` to `.gitignore`

> ⚠️ **Do this before your first `git add` / commit / push.**

Open `.gitignore` at your project root (or create it) and add:

```gitignore
.env
```

### Already committed `.env` by mistake?

Run the following to untrack it:

```bash
git rm --cached .env
git commit -m "remove .env from tracking"
git push
```

> If the file was ever pushed publicly, **rotate your credentials immediately** — old commits still exist in history.

---

## ✅ You're Good to Go

| What | Where |
|------|-------|
| Credentials | `.env` (local only, git-ignored) |
| Spring config | `application.properties` uses `${VAR_NAME}` |
| Runtime wiring | Main class loads `.env` → sets system properties |
| Git safety | `.gitignore` ensures `.env` is never tracked |

Your credentials are now out of source code. Spring reads from `.env` at runtime, and Git never sees the file.
