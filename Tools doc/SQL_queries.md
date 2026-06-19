# 🗃️ SQL Queries Reference
### CRUD Operations & Manual Query Writing
> *When Java Spring doesn't handle it for you*

---

## 📋 Table of Contents

- [0. Sample Database Schema](#0-sample-database-schema)
- [1. CREATE — INSERT Queries](#1-create--insert-queries)
- [2. READ — SELECT Queries](#2-read--select-queries)
- [3. JOINs — Combining Tables](#3-joins--combining-tables)
- [4. UPDATE Queries](#4-update-queries)
- [5. DELETE Queries](#5-delete-queries)
- [6. Transactions](#6-transactions--keeping-data-consistent)
- [7. Advanced Queries](#7-advanced-queries)
- [8. Spring Integration](#8-when-spring-doesnt-handle-it--integration-patterns)
- [9. DDL Quick-Reference](#9-ddl-quick-reference-schema-management)
- [10. Common Mistakes & Exam Traps](#10-common-mistakes--exam-traps)

---

## 0. Sample Database Schema

All examples use these three tables. Create them first to follow along.

```sql
CREATE TABLE employees (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(100)    NOT NULL,
    department VARCHAR(50),
    salary     DECIMAL(10, 2),
    hired_date DATE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

CREATE TABLE departments (
    id       INT PRIMARY KEY AUTO_INCREMENT,
    name     VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);

CREATE TABLE projects (
    id         INT PRIMARY KEY AUTO_INCREMENT,
    title      VARCHAR(150),
    budget     DECIMAL(12, 2),
    emp_id     INT,
    start_date DATE,
    FOREIGN KEY (emp_id) REFERENCES employees(id)
);
```

---

## 1. CREATE — INSERT Queries

> Spring JPA handles this via `.save()`, but you need raw SQL for batch loads, stored procedures, or DB migrations.

### 1.1 Basic INSERT (single row)

```sql
INSERT INTO employees (name, department, salary, hired_date)
VALUES ('Aarav Sharma', 'Engineering', 75000.00, '2024-01-15');
```

> 💡 If `id` is `AUTO_INCREMENT`, never include it — the DB assigns it automatically.

---

### 1.2 INSERT with explicit column list

```sql
-- Only specify the columns you have data for.
-- Omitted columns get their DEFAULT or NULL.
INSERT INTO employees (name, department)
VALUES ('Priya Thapa', 'HR');
```

---

### 1.3 Multi-row INSERT (batch)

```sql
INSERT INTO employees (name, department, salary, hired_date)
VALUES
    ('Ravi Kumar',   'Finance',     55000.00, '2023-03-10'),
    ('Sunita Joshi', 'Engineering', 82000.00, '2022-07-22'),
    ('Bikash Giri',  'Marketing',   61000.00, '2024-05-01');
```

> 💡 A single multi-row INSERT is much faster than N individual INSERT statements — fewer round trips to the DB.

---

### 1.4 INSERT … SELECT (copy from another table)

```sql
-- Copy all Engineering employees into a backup table
INSERT INTO employees_backup (name, department, salary)
SELECT name, department, salary
FROM   employees
WHERE  department = 'Engineering';
```

---

### 1.5 INSERT … ON DUPLICATE KEY UPDATE (MySQL upsert)

```sql
INSERT INTO departments (id, name, location)
VALUES (1, 'Engineering', 'Kathmandu')
ON DUPLICATE KEY UPDATE
    name     = VALUES(name),
    location = VALUES(location);
```

> 💡 Equivalent of Spring's `saveOrUpdate()`. Use when you don't know if the row already exists.

---

### 1.6 Spring JPA vs Raw SQL — INSERT

| Scenario | Spring JPA | Raw SQL needed? |
|---|---|---|
| Single entity save | `repository.save(entity)` | No |
| Batch insert 10,000 rows fast | `saveAll()` (slow by default) | Yes — JDBC batchUpdate |
| Insert from SELECT | Not directly supported | Yes |
| Upsert (ON DUPLICATE KEY) | No built-in support | Yes — `@NativeQuery` |

---

## 2. READ — SELECT Queries

> Spring Data can auto-generate simple finders, but complex filters, JOINs, aggregates, and window functions need custom queries.

### 2.1 Select all columns

```sql
SELECT * FROM employees;

-- Best practice: name columns explicitly in production
SELECT id, name, department, salary FROM employees;
```

---

### 2.2 WHERE clause — filtering

```sql
-- Single condition
SELECT * FROM employees WHERE department = 'Engineering';

-- Multiple conditions
SELECT * FROM employees
WHERE  department = 'Engineering'
  AND  salary > 70000;

-- OR condition
SELECT * FROM employees
WHERE  department = 'HR' OR department = 'Finance';

-- IN shorthand for OR
SELECT * FROM employees
WHERE  department IN ('HR', 'Finance', 'Marketing');

-- Range with BETWEEN
SELECT * FROM employees
WHERE  salary BETWEEN 50000 AND 80000;
```

---

### 2.3 Pattern matching — LIKE

```sql
-- Names starting with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

-- Names ending with 'a'
SELECT * FROM employees WHERE name LIKE '%a';

-- Names containing 'Kumar'
SELECT * FROM employees WHERE name LIKE '%Kumar%';
```

> 💡 `%` matches any sequence of characters. `_` matches exactly one character. Use `ILIKE` in PostgreSQL for case-insensitive matching.

---

### 2.4 Sorting — ORDER BY

```sql
-- Ascending (default)
SELECT * FROM employees ORDER BY salary ASC;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multi-column sort: department A→Z, then salary high→low
SELECT * FROM employees
ORDER BY department ASC, salary DESC;
```

---

### 2.5 Pagination — LIMIT & OFFSET

```sql
-- First 10 rows
SELECT * FROM employees LIMIT 10;

-- Page 3 (rows 21–30), 10 per page
-- OFFSET = (page_number - 1) * page_size
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;
```

> 💡 Spring's `Pageable` handles this automatically, but writing it manually is essential for native queries.

---

### 2.6 Aggregate Functions

```sql
SELECT
    COUNT(*)         AS total_employees,
    AVG(salary)      AS avg_salary,
    MAX(salary)      AS highest_salary,
    MIN(salary)      AS lowest_salary,
    SUM(salary)      AS total_payroll
FROM employees;
```

---

### 2.7 GROUP BY + HAVING

```sql
-- Count and average salary per department
SELECT
    department,
    COUNT(*)    AS headcount,
    AVG(salary) AS avg_salary
FROM  employees
GROUP BY department
ORDER BY avg_salary DESC;

-- HAVING filters AFTER grouping (unlike WHERE which filters before)
SELECT department, COUNT(*) AS headcount
FROM   employees
GROUP BY department
HAVING COUNT(*) > 3;   -- only departments with more than 3 employees
```

> ⚠️ **Key rule:** `WHERE` filters rows *before* grouping; `HAVING` filters groups *after* grouping.

---

### 2.8 Aliases — AS

```sql
-- Column alias
SELECT name AS employee_name, salary * 1.1 AS salary_with_raise
FROM   employees;

-- Table alias (mandatory for self-joins)
SELECT e.name, m.name AS manager_name
FROM   employees e
JOIN   employees m ON e.manager_id = m.id;
```

---

### 2.9 NULL handling

```sql
-- Find employees with no manager
SELECT * FROM employees WHERE manager_id IS NULL;

-- Find employees who DO have a manager
SELECT * FROM employees WHERE manager_id IS NOT NULL;

-- Replace NULL with a default using COALESCE
SELECT name, COALESCE(manager_id, 0) AS manager_id
FROM   employees;

-- IFNULL (MySQL) — same idea
SELECT name, IFNULL(department, 'Unassigned') AS department
FROM   employees;
```

---

### 2.10 Subqueries

```sql
-- Employees earning more than the company average
SELECT name, salary
FROM   employees
WHERE  salary > (SELECT AVG(salary) FROM employees);

-- Employees in the most populous department
SELECT *
FROM   employees
WHERE  department = (
    SELECT department
    FROM   employees
    GROUP BY department
    ORDER BY COUNT(*) DESC
    LIMIT 1
);

-- EXISTS — check if related rows exist
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM projects p WHERE p.emp_id = e.id
);
```

---

## 3. JOINs — Combining Tables

> JOINs are the #1 reason developers write SQL manually even when using Spring JPA — complex multi-table relationships often need native queries.

### 3.1 INNER JOIN

Returns only rows that have matching values in **both** tables.

```sql
SELECT e.name, e.salary, d.name AS dept_name, d.location
FROM   employees   e
INNER JOIN departments d ON e.department = d.name;
```

---

### 3.2 LEFT JOIN

Returns **ALL rows from the left table**, and matched rows from the right. `NULL`s where there's no match.

```sql
-- All employees, even those not assigned to any department
SELECT e.name, d.name AS dept_name
FROM   employees   e
LEFT JOIN departments d ON e.department = d.name;
```

---

### 3.3 RIGHT JOIN

Returns **ALL rows from the right table**. Rarely used — usually rewrite as LEFT JOIN by swapping tables.

```sql
SELECT e.name, d.name AS dept_name
FROM   employees   e
RIGHT JOIN departments d ON e.department = d.name;
```

---

### 3.4 FULL OUTER JOIN

Returns ALL rows from both tables. MySQL doesn't support it directly — use UNION of LEFT + RIGHT.

```sql
-- MySQL workaround for FULL OUTER JOIN
SELECT e.name, d.name AS dept_name
FROM   employees e LEFT JOIN departments d ON e.department = d.name
UNION
SELECT e.name, d.name AS dept_name
FROM   employees e RIGHT JOIN departments d ON e.department = d.name;
```

---

### 3.5 SELF JOIN

Join a table with itself — classic use: employee → manager hierarchy.

```sql
SELECT
    e.name AS employee,
    m.name AS manager
FROM  employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY manager;
```

---

### 3.6 Three-table JOIN

```sql
SELECT
    e.name  AS employee,
    d.name  AS department,
    p.title AS project
FROM  employees   e
JOIN  departments d ON e.department = d.name
JOIN  projects    p ON p.emp_id = e.id
ORDER BY e.name;
```

---

### 3.7 JOIN Types Quick-Reference

| JOIN Type | Returns | Spring JPA Alternative |
|---|---|---|
| INNER JOIN | Matching rows only | `@Query` with JPQL JOIN |
| LEFT JOIN | All left + matched right (nulls for misses) | `@Query` with `LEFT JOIN FETCH` |
| RIGHT JOIN | All right + matched left | Swap tables, use LEFT JOIN |
| FULL OUTER JOIN | All rows from both tables | Not supported in JPQL — use native |
| SELF JOIN | Table joined with itself | Custom `@NativeQuery` |
| CROSS JOIN | Cartesian product (every combo) | Rarely needed — use native |

---

## 4. UPDATE Queries

> Spring's `.save()` handles entity updates, but bulk or conditional updates need raw SQL.

### 4.1 Basic UPDATE

```sql
-- Always include WHERE — otherwise you update EVERY row!
UPDATE employees
SET    salary = 80000
WHERE  id = 5;
```

> 🚨 **DANGER:** `UPDATE` without `WHERE` updates ALL rows in the table. Always double-check your `WHERE` clause first.

---

### 4.2 Update multiple columns

```sql
UPDATE employees
SET
    salary     = 90000,
    department = 'Engineering',
    hired_date = '2024-06-01'
WHERE id = 7;
```

---

### 4.3 Bulk UPDATE with condition

```sql
-- Give everyone in Engineering a 10% raise
UPDATE employees
SET    salary = salary * 1.10
WHERE  department = 'Engineering';

-- Update based on a date range
UPDATE employees
SET    department = 'Senior Engineering'
WHERE  department = 'Engineering'
  AND  hired_date < '2020-01-01';
```

---

### 4.4 UPDATE using subquery

```sql
-- Promote everyone earning above avg salary to 'Senior' dept prefix
UPDATE employees
SET    department = CONCAT('Senior ', department)
WHERE  salary > (SELECT AVG(salary) FROM employees);

-- Note: MySQL doesn't allow updating a table you SELECT from in the same query.
-- Use a subquery wrapper:
UPDATE employees
SET salary = salary * 1.05
WHERE id IN (
    SELECT id FROM (SELECT id FROM employees WHERE department = 'HR') AS t
);
```

---

### 4.5 UPDATE with JOIN (MySQL)

```sql
UPDATE employees e
JOIN   departments d ON e.department = d.name
SET    e.department = d.name
WHERE  d.location = 'Pokhara';
```

---

### 4.6 Safe UPDATE pattern — preview first

```sql
-- Step 1: Preview what would be updated
SELECT id, name, salary
FROM   employees
WHERE  department = 'Finance'
  AND  salary < 50000;

-- Step 2: After confirming, run the UPDATE
UPDATE employees
SET    salary = 50000
WHERE  department = 'Finance'
  AND  salary < 50000;
```

> 💡 **Best practice:** always run the equivalent `SELECT` first to see which rows will be affected.

---

## 5. DELETE Queries

> Spring's `.delete()` / `.deleteById()` is fine for single entities, but bulk deletes need custom SQL.

### 5.1 Basic DELETE

```sql
-- Delete one row by primary key
DELETE FROM employees WHERE id = 3;
```

> 🚨 **DANGER:** `DELETE` without `WHERE` deletes **EVERY ROW**. No undo without a transaction or backup.

---

### 5.2 DELETE with condition

```sql
-- Delete all employees in Marketing hired before 2020
DELETE FROM employees
WHERE  department = 'Marketing'
  AND  hired_date < '2020-01-01';
```

---

### 5.3 DELETE using IN

```sql
-- Delete multiple specific IDs at once
DELETE FROM employees
WHERE  id IN (10, 11, 15, 22);
```

---

### 5.4 DELETE with subquery

```sql
-- Delete employees who have no associated projects
DELETE FROM employees
WHERE id NOT IN (
    SELECT DISTINCT emp_id FROM projects WHERE emp_id IS NOT NULL
);
```

---

### 5.5 DELETE with JOIN (MySQL)

```sql
-- Delete employees whose department no longer exists in departments table
DELETE e
FROM   employees e
LEFT JOIN departments d ON e.department = d.name
WHERE  d.id IS NULL;
```

---

### 5.6 TRUNCATE vs DELETE

| Feature | DELETE | TRUNCATE |
|---|---|---|
| Removes rows | Yes (with WHERE) | All rows only |
| WHERE clause | Supported | Not supported |
| Speed | Slower (row-by-row) | Much faster |
| Triggers fired | Yes | No (most DBs) |
| Can rollback | Yes (in transaction) | No (DDL, auto-commit) |
| Resets AUTO_INCREMENT | No | Yes |
| Spring equivalent | `deleteAll()` / `@Query` | `entityManager.createNativeQuery()` |

```sql
-- Remove all rows instantly (no rollback in most DBs)
TRUNCATE TABLE employees;
```

---

## 6. Transactions — Keeping Data Consistent

> A transaction groups multiple SQL statements so they either ALL succeed or ALL fail together. Spring's `@Transactional` annotation handles this, but knowing raw SQL transactions is essential for debugging and stored procedures.

### 6.1 Basic transaction structure

```sql
START TRANSACTION;

    -- 1. Deduct salary from account A
    UPDATE employees SET salary = salary - 5000 WHERE id = 1;

    -- 2. Add salary to account B
    UPDATE employees SET salary = salary + 5000 WHERE id = 2;

-- If both succeed:
COMMIT;

-- If anything goes wrong — undo everything:
-- ROLLBACK;
```

---

### 6.2 Transaction with multiple statements

```sql
START TRANSACTION;

INSERT INTO projects (title, budget, emp_id, start_date)
VALUES ('Alpha Launch', 200000.00, 4, CURDATE());

UPDATE employees SET department = 'Projects' WHERE id = 4;

COMMIT;
```

---

### 6.3 SAVEPOINT — partial rollback

```sql
START TRANSACTION;

INSERT INTO employees (name, department) VALUES ('Test User', 'QA');
SAVEPOINT after_insert;

UPDATE employees SET salary = -999 WHERE name = 'Test User';  -- mistake!

ROLLBACK TO SAVEPOINT after_insert;   -- undo only the bad UPDATE

COMMIT;   -- keep the INSERT
```

> 💡 Spring's `@Transactional(rollbackFor = Exception.class)` does this automatically. Use SAVEPOINTs in complex stored procedures.

---

## 7. Advanced Queries

### 7.1 CASE expression (conditional column)

```sql
SELECT
    name,
    salary,
    CASE
        WHEN salary >= 90000 THEN 'Senior'
        WHEN salary >= 60000 THEN 'Mid-level'
        ELSE                      'Junior'
    END AS grade
FROM employees
ORDER BY salary DESC;
```

---

### 7.2 Window Functions (MySQL 8+)

```sql
-- Rank employees by salary within each department
SELECT
    name,
    department,
    salary,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank,
    ROW_NUMBER() OVER (ORDER BY salary DESC)                         AS overall_row
FROM employees;

-- Running total of salary per department
SELECT
    name, department, salary,
    SUM(salary) OVER (PARTITION BY department ORDER BY hired_date) AS running_total
FROM employees;
```

> 💡 Spring JPA cannot generate window functions. Always use `@NativeQuery` for these.

---

### 7.3 CTE — Common Table Expression (WITH clause)

```sql
-- Step 1: Name a subquery (readable and reusable)
WITH high_earners AS (
    SELECT id, name, department, salary
    FROM   employees
    WHERE  salary > 70000
),
dept_avg AS (
    SELECT department, AVG(salary) AS avg_sal
    FROM   employees
    GROUP BY department
)
-- Step 2: Use the CTE like a table
SELECT h.name, h.salary, d.avg_sal
FROM   high_earners h
JOIN   dept_avg     d ON h.department = d.department
ORDER BY h.salary DESC;
```

---

### 7.4 DISTINCT — remove duplicates

```sql
-- Unique departments
SELECT DISTINCT department FROM employees;

-- Unique department + date combinations
SELECT DISTINCT department, hired_date FROM employees;
```

---

### 7.5 String & Date Functions

```sql
-- String functions
SELECT
    UPPER(name)                         AS upper_name,
    LOWER(name)                         AS lower_name,
    LENGTH(name)                        AS name_length,
    SUBSTRING(name, 1, 5)               AS first_5_chars,
    CONCAT(name, ' (', department, ')') AS name_dept,
    TRIM('  Aarav  ')                   AS trimmed
FROM employees;

-- Date functions
SELECT
    name,
    hired_date,
    YEAR(hired_date)                       AS hire_year,
    DATEDIFF(CURDATE(), hired_date)        AS days_employed,
    DATE_ADD(hired_date, INTERVAL 1 YEAR)  AS one_year_mark
FROM employees;
```

---

## 8. When Spring Doesn't Handle It — Integration Patterns

### 8.1 @Query with JPQL (object-level)

```java
// Works for simple custom finders
@Query("SELECT e FROM Employee e WHERE e.salary > :minSalary")
List<Employee> findHighEarners(@Param("minSalary") double minSalary);
```

---

### 8.2 @Query with nativeQuery = true

```java
// Use this for: window functions, CTEs, complex JOINs, DB-specific syntax
@Query(
    value = "SELECT e.name, d.location FROM employees e " +
            "JOIN departments d ON e.department = d.name " +
            "WHERE d.location = :loc",
    nativeQuery = true
)
List<Object[]> findByLocation(@Param("loc") String location);
```

---

### 8.3 @Modifying for UPDATE / DELETE

```java
@Modifying
@Transactional
@Query("UPDATE Employee e SET e.salary = e.salary * 1.10 WHERE e.department = :dept")
int giveRaise(@Param("dept") String department);

// Native version:
@Modifying
@Transactional
@Query(value = "DELETE FROM employees WHERE hired_date < :cutoff",
       nativeQuery = true)
int deleteOldRecords(@Param("cutoff") LocalDate cutoff);
```

---

### 8.4 EntityManager for full control

```java
@PersistenceContext
private EntityManager em;

public List<?> runRawSQL() {
    return em.createNativeQuery(
        "SELECT name, RANK() OVER (ORDER BY salary DESC) AS rnk " +
        "FROM employees"
    ).getResultList();
}
```

---

### 8.5 Spring JPA vs Raw SQL — Decision Table

| Use Case | Spring JPA | Raw SQL |
|---|---|---|
| Simple CRUD by ID | ✅ Best choice | Not needed |
| `findBy…` derived queries | ✅ Best choice | Not needed |
| Complex multi-table JOIN | ⚠️ `@NativeQuery` | ✅ Preferred |
| Aggregate / GROUP BY | ⚠️ `@Query` JPQL | ✅ Cleaner |
| Window functions | ❌ Not supported | ✅ Required |
| Batch INSERT (performance) | ⚠️ `saveAll()` slow | ✅ JDBC batchUpdate |
| Upsert (ON DUPLICATE KEY) | ❌ Not supported | ✅ Required |
| Database migration scripts | ❌ Not JPA work | ✅ Flyway / Liquibase |
| Stored procedure call | ⚠️ `@Procedure` | ✅ `CALL proc()` |
| TRUNCATE table | ❌ No support | ✅ Required |

---

## 9. DDL Quick-Reference (Schema Management)

> Data Definition Language — creates and modifies table structure. Managed by Flyway or Liquibase in Spring projects, but useful to know.

### 9.1 CREATE TABLE options

```sql
CREATE TABLE orders (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT            NOT NULL,
    amount      DECIMAL(10,2)  DEFAULT 0.00,
    status      ENUM('pending','shipped','delivered') DEFAULT 'pending',
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

### 9.2 ALTER TABLE

```sql
-- Add column
ALTER TABLE employees ADD COLUMN email VARCHAR(200);

-- Modify column
ALTER TABLE employees MODIFY COLUMN name VARCHAR(200) NOT NULL;

-- Drop column
ALTER TABLE employees DROP COLUMN email;

-- Rename column (MySQL 8+)
ALTER TABLE employees RENAME COLUMN name TO full_name;

-- Add index
ALTER TABLE employees ADD INDEX idx_dept (department);
```

---

### 9.3 Indexes

```sql
-- Regular index (speeds up queries on this column)
CREATE INDEX idx_salary ON employees (salary);

-- Unique index (enforces uniqueness + speeds up lookups)
CREATE UNIQUE INDEX idx_email ON employees (email);

-- Composite index (for queries filtering on both columns)
CREATE INDEX idx_dept_salary ON employees (department, salary);

-- Drop index
DROP INDEX idx_salary ON employees;
```

> 💡 Spring's `@Column(unique=true)` creates a unique index. For composite indexes or performance tuning, write `CREATE INDEX` manually.

---

## 10. Common Mistakes & Exam Traps

| Mistake | ❌ Wrong | ✅ Correct |
|---|---|---|
| UPDATE without WHERE | `UPDATE employees SET salary=0` | `UPDATE employees SET salary=0 WHERE id=5` |
| DELETE without WHERE | `DELETE FROM employees` | `DELETE FROM employees WHERE id=5` |
| WHERE with aggregate | `WHERE COUNT(*) > 3` | `HAVING COUNT(*) > 3` |
| NULL comparison | `WHERE manager_id = NULL` | `WHERE manager_id IS NULL` |
| SELECT * in production | `SELECT * FROM employees` | `SELECT id, name, salary FROM employees` |
| OFFSET without ORDER | `LIMIT 10 OFFSET 20` | `ORDER BY id LIMIT 10 OFFSET 20` |
| JOIN without ON | `FROM employees, departments` | `FROM employees JOIN departments ON ...` |
| Updating self-SELECT | `UPDATE e SET... WHERE id IN (SELECT id FROM e)` | Wrap inner query in a subquery alias |

---

## ✅ Revision Checklist

- [ ] Can write INSERT for single row, batch, and INSERT…SELECT
- [ ] Comfortable with WHERE, IN, BETWEEN, LIKE, IS NULL
- [ ] Know difference between WHERE and HAVING
- [ ] Can write all JOIN types and know when to use each
- [ ] Always include WHERE in UPDATE and DELETE
- [ ] Know when to use `@NativeQuery` in Spring
- [ ] Understand COMMIT / ROLLBACK / SAVEPOINT
- [ ] Can use CASE, CTEs, and Window Functions
- [ ] Know TRUNCATE vs DELETE trade-offs

---

*SQL CRUD Reference · Manual Query Writing · Spring Integration*