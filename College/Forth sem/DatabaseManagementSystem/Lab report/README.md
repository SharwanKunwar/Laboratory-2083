# DBMS Lab 1 — Books Database

## Objective
To design and implement a relational database `books` consisting of three related tables — `Book`, `Author`, and `Publication` — apply primary/foreign key constraints, insert sample records, and perform various `SELECT`, `UPDATE`, and `DELETE` operations.

---

## 1. Schema Given

> * Books (b_title, b_gener, b_price, b_ISBN, b_author)
> * Author(a_name, a_address, a_contact, a_numberOfBooks, a_id)
> * Publication(p_id, p_name, p_address, p_established_date)

## Modifications Made to the Schema

The original schema needed a few small changes to actually support the required queries and constraints:

| Change | Reason |
|---|---|
| `b_ISBN` made the **Primary Key** of `Books` | An ISBN is a unique book identifier — a natural PK instead of an unconstrained attribute. |
| `a_id` made the **Primary Key** of `Author` | Needed as the referencing target for the foreign key in `Books`. |
| `b_author` in `Books` set as a **Foreign Key** referencing `Author(a_id)` | The task explicitly asks to "add foreign key author constraint." |
| Added `a_gender` column to `Author` | The queries ask to list "lady authors" and "male authors from Kathmandu" — gender wasn't in the original schema, so it had to be added. |
| `p_id` made the **Primary Key** of `Publication` | Standard practice, and required for the later `UPDATE ... WHERE p_id = 2/3`. |
| Corrected spelling `b_gener` → `b_genre`, `p_established_date` → `p_establishedDate` | Minor naming cleanup. |

---

## 2. Database and Table Creation

```sql
-- Create and select the database
CREATE DATABASE books;
USE books;

-- Author table (created first since Books references it)
CREATE TABLE Author (
    a_id INT PRIMARY KEY AUTO_INCREMENT,
    a_name VARCHAR(50) NOT NULL,
    a_address VARCHAR(50),
    a_contact VARCHAR(15),
    a_numberOfBooks INT DEFAULT 0,
    a_gender ENUM('Male','Female') NOT NULL
);

-- Books table with FK to Author
CREATE TABLE Books (
    b_ISBN VARCHAR(20) PRIMARY KEY,
    b_title VARCHAR(100) NOT NULL,
    b_genre VARCHAR(30),
    b_price DECIMAL(8,2) CHECK (b_price > 0),
    b_author INT,
    CONSTRAINT fk_author FOREIGN KEY (b_author) REFERENCES Author(a_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Publication table
CREATE TABLE Publication (
    p_id INT PRIMARY KEY AUTO_INCREMENT,
    p_name VARCHAR(50) NOT NULL,
    p_address VARCHAR(50),
    p_establishedDate DATE
);
```

**Output:**
```
Query OK, 0 rows affected  -- Author table created
Query OK, 0 rows affected  -- Books table created
Query OK, 0 rows affected  -- Publication table created
```

---

## 3. Inserting Records (5+ into each table)

```sql
-- Author records
INSERT INTO Author (a_name, a_address, a_contact, a_numberOfBooks, a_gender) VALUES
('Sita Sharma',   'Kathmandu',  '9841000111', 3, 'Female'),
('Ram Thapa',     'Kathmandu',  '9841000222', 2, 'Male'),
('Radha Gurung',  'Pokhara',    '9841000333', 4, 'Female'),
('Rajesh KC',     'Lalitpur',   '9841000444', 1, 'Male'),
('Bibek Koirala', 'Kathmandu',  '9841000555', 2, 'Male'),
('Anita Rai',     'Biratnagar', '9841000666', 1, 'Female');

-- Book records
INSERT INTO Books (b_ISBN, b_title, b_genre, b_price, b_author) VALUES
('ISBN001', 'Nepali Kavita Sangraha',    'Poetry',     450.00, 1),
('ISBN002', 'Modern History Nepal',      'History',    750.00, 2),
('ISBN003', 'Pahilo Prem',               'Novel',      620.00, 3),
('ISBN004', 'Computer Networks Basics',  'Technology', 850.00, 4),
('ISBN005', 'Kathmandu Katha',           'Fiction',    300.00, 5),
('ISBN006', 'Yatra Sansmaran',           'Travel',     700.00, 6);

-- Publication records
INSERT INTO Publication (p_name, p_address, p_establishedDate) VALUES
('Sajha Prakashan',         'Kathmandu', '1965-01-01'),
('Ratna Pustak Bhandar',    'Kathmandu', '1950-05-10'),
('Fine Print',              'Kathmandu', '2010-03-15'),
('Vidyarthi Pustak Bhandar','Bhaktapur', '2005-07-20'),
('Nepa Publications',       'Lalitpur',  '2015-09-01');
```

**Output:**
```
Query OK, 6 rows affected  -- into Author
Query OK, 6 rows affected  -- into Books
Query OK, 5 rows affected  -- into Publication
```

**Author table (all records):**

| a_id | a_name | a_address | a_contact | a_numberOfBooks | a_gender |
|---|---|---|---|---|---|
| 1 | Sita Sharma | Kathmandu | 9841000111 | 3 | Female |
| 2 | Ram Thapa | Kathmandu | 9841000222 | 2 | Male |
| 3 | Radha Gurung | Pokhara | 9841000333 | 4 | Female |
| 4 | Rajesh KC | Lalitpur | 9841000444 | 1 | Male |
| 5 | Bibek Koirala | Kathmandu | 9841000555 | 2 | Male |
| 6 | Anita Rai | Biratnagar | 9841000666 | 1 | Female |

**Books table (all records):**

| b_ISBN | b_title | b_genre | b_price | b_author |
|---|---|---|---|---|
| ISBN001 | Nepali Kavita Sangraha | Poetry | 450.00 | 1 |
| ISBN002 | Modern History Nepal | History | 750.00 | 2 |
| ISBN003 | Pahilo Prem | Novel | 620.00 | 3 |
| ISBN004 | Computer Networks Basics | Technology | 850.00 | 4 |
| ISBN005 | Kathmandu Katha | Fiction | 300.00 | 5 |
| ISBN006 | Yatra Sansmaran | Travel | 700.00 | 6 |

**Publication table (all records):**

| p_id | p_name | p_address | p_establishedDate |
|---|---|---|---|
| 1 | Sajha Prakashan | Kathmandu | 1965-01-01 |
| 2 | Ratna Pustak Bhandar | Kathmandu | 1950-05-10 |
| 3 | Fine Print | Kathmandu | 2010-03-15 |
| 4 | Vidyarthi Pustak Bhandar | Bhaktapur | 2005-07-20 |
| 5 | Nepa Publications | Lalitpur | 2015-09-01 |

---

## 4. Queries

### Q1. Display all books where price is more than 600

```sql
SELECT * FROM Books WHERE b_price > 600;
```

| b_ISBN | b_title | b_genre | b_price | b_author |
|---|---|---|---|---|
| ISBN002 | Modern History Nepal | History | 750.00 | 2 |
| ISBN003 | Pahilo Prem | Novel | 620.00 | 3 |
| ISBN004 | Computer Networks Basics | Technology | 850.00 | 4 |
| ISBN006 | Yatra Sansmaran | Travel | 700.00 | 6 |

*(4 rows)*

### Q2. List all details of lady (female) authors only

```sql
SELECT * FROM Author WHERE a_gender = 'Female';
```

| a_id | a_name | a_address | a_contact | a_numberOfBooks | a_gender |
|---|---|---|---|---|---|
| 1 | Sita Sharma | Kathmandu | 9841000111 | 3 | Female |
| 3 | Radha Gurung | Pokhara | 9841000333 | 4 | Female |
| 6 | Anita Rai | Biratnagar | 9841000666 | 1 | Female |

*(3 rows)*

### Q3. List all male authors from Kathmandu

```sql
SELECT * FROM Author WHERE a_gender = 'Male' AND a_address = 'Kathmandu';
```

| a_id | a_name | a_address | a_contact | a_numberOfBooks | a_gender |
|---|---|---|---|---|---|
| 2 | Ram Thapa | Kathmandu | 9841000222 | 2 | Male |
| 5 | Bibek Koirala | Kathmandu | 9841000555 | 2 | Male |

*(2 rows)*

### Q4. Display all records where the name starts with 'R' and address is not Kathmandu

```sql
SELECT * FROM Author WHERE a_name LIKE 'R%' AND a_address != 'Kathmandu';
```

| a_id | a_name | a_address | a_contact | a_numberOfBooks | a_gender |
|---|---|---|---|---|---|
| 3 | Radha Gurung | Pokhara | 9841000333 | 4 | Female |
| 4 | Rajesh KC | Lalitpur | 9841000444 | 1 | Male |

*(2 rows)*

### Q5. Display all records of publication in order (by established date)

```sql
SELECT * FROM Publication ORDER BY p_establishedDate;
```

| p_id | p_name | p_address | p_establishedDate |
|---|---|---|---|
| 2 | Ratna Pustak Bhandar | Kathmandu | 1950-05-10 |
| 1 | Sajha Prakashan | Kathmandu | 1965-01-01 |
| 4 | Vidyarthi Pustak Bhandar | Bhaktapur | 2005-07-20 |
| 3 | Fine Print | Kathmandu | 2010-03-15 |
| 5 | Nepa Publications | Lalitpur | 2015-09-01 |

*(5 rows)*

### Q6. Display id and established date only from the Publication table

```sql
SELECT p_id, p_establishedDate FROM Publication;
```

| p_id | p_establishedDate |
|---|---|
| 1 | 1965-01-01 |
| 2 | 1950-05-10 |
| 3 | 2010-03-15 |
| 4 | 2005-07-20 |
| 5 | 2015-09-01 |

*(5 rows)*

---

## 5. Update Statement

### Change the established date of publications where p_id is 2 and 3

```sql
UPDATE Publication SET p_establishedDate = '2012-06-15' WHERE p_id = 2;
UPDATE Publication SET p_establishedDate = '2011-01-01' WHERE p_id = 3;
```

**Output:**
```
Query OK, 1 row affected  -- p_id = 2
Query OK, 1 row affected  -- p_id = 3
```

**Publication table after update:**

| p_id | p_name | p_address | p_establishedDate |
|---|---|---|---|
| 1 | Sajha Prakashan | Kathmandu | 1965-01-01 |
| 2 | Ratna Pustak Bhandar | Kathmandu | **2012-06-15** |
| 3 | Fine Print | Kathmandu | **2011-01-01** |
| 4 | Vidyarthi Pustak Bhandar | Bhaktapur | 2005-07-20 |
| 5 | Nepa Publications | Lalitpur | 2015-09-01 |

---

## 6. Delete Statement

### Delete all records from Publication whose established date is before 2009

```sql
DELETE FROM Publication WHERE p_establishedDate < '2009-01-01';
```

**Output:**
```
Query OK, 2 rows affected  -- p_id 1 (1965) and p_id 4 (2005) removed
```
*(Note: p_id 2, originally 1950, was already updated to 2012 in Step 5, so it survives this delete — a good demonstration of how UPDATE affects a later DELETE's WHERE condition.)*

**Publication table after delete (final state):**

| p_id | p_name | p_address | p_establishedDate |
|---|---|---|---|
| 2 | Ratna Pustak Bhandar | Kathmandu | 2012-06-15 |
| 3 | Fine Print | Kathmandu | 2011-01-01 |
| 5 | Nepa Publications | Lalitpur | 2015-09-01 |

---

## Quick Revision Summary

| # | Task | SQL Clause Used |
|---|---|---|
| 1 | Create database & tables | `CREATE DATABASE`, `CREATE TABLE` |
| 2 | Add FK constraint (Books → Author) | `FOREIGN KEY ... REFERENCES` |
| 3 | Insert ≥5 records per table | `INSERT INTO` |
| 4 | Books priced > 600 | `WHERE b_price > 600` |
| 5 | Lady authors only | `WHERE a_gender = 'Female'` |
| 6 | Male authors from Kathmandu | `WHERE ... AND ...` |
| 7 | Name starts with R, not Kathmandu | `LIKE 'R%' AND !=` |
| 8 | Publications in order | `ORDER BY` |
| 9 | Only id + established date | `SELECT p_id, p_establishedDate` |
| 10 | Change dates for p_id 2, 3 | `UPDATE ... SET ... WHERE` |
| 11 | Delete pre-2009 publications | `DELETE FROM ... WHERE` |

---

*All queries in this report were executed and verified against a live database instance to confirm correct output before being documented.*
