# Scripting Language (CACS254) — Model Question Solutions

> BCA Semester IV — JavaScript, PHP, AJAX/jQuery, CMS
> Covers 10 questions with answer depth calibrated to typical mark weight (short topics ≈ 5 marks, `[Long]` topics ≈ 10 marks).

---

## Q1. Dialog Boxes in JavaScript

JavaScript provides three built-in dialog boxes to interact with the user. They are methods of the `window` object (can be called directly since `window` is implicit).

| Dialog Box | Method | Purpose | Returns |
|---|---|---|---|
| Alert | `alert(message)` | Displays a message with an OK button | `undefined` |
| Confirm | `confirm(message)` | Asks user to confirm with OK/Cancel | `true` / `false` |
| Prompt | `prompt(message, default)` | Takes text input from user | string entered / `null` |

```javascript
// Alert box
alert("Welcome to the website!");

// Confirm box
let result = confirm("Do you want to delete this file?");
if (result) {
    console.log("File deleted");
} else {
    console.log("Action cancelled");
}

// Prompt box
let name = prompt("Enter your name:", "Guest");
if (name !== null) {
    console.log("Hello, " + name);
}
```

**Key points:**
- These are **modal** — they pause script execution until the user responds.
- They are synchronous and block the browser's main thread.
- Styling cannot be customized (browser-native UI).

---

## Q2. JavaScript Program — Calculator `[Long]`

A simple calculator using HTML form elements and a JavaScript function to perform arithmetic operations.

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Calculator</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        input, select, button { padding: 8px; margin: 5px; font-size: 16px; }
        #result { font-weight: bold; font-size: 20px; color: green; }
    </style>
</head>
<body>
    <h2>Simple Calculator</h2>

    <input type="number" id="num1" placeholder="Enter first number"><br>
    <input type="number" id="num2" placeholder="Enter second number"><br>

    <select id="operation">
        <option value="add">Add (+)</option>
        <option value="sub">Subtract (-)</option>
        <option value="mul">Multiply (*)</option>
        <option value="div">Divide (/)</option>
    </select><br>

    <button onclick="calculate()">Calculate</button>

    <p id="result"></p>

    <script>
        function calculate() {
            let n1 = parseFloat(document.getElementById("num1").value);
            let n2 = parseFloat(document.getElementById("num2").value);
            let op = document.getElementById("operation").value;
            let res;

            if (isNaN(n1) || isNaN(n2)) {
                document.getElementById("result").innerText = "Please enter valid numbers!";
                return;
            }

            switch (op) {
                case "add":
                    res = n1 + n2;
                    break;
                case "sub":
                    res = n1 - n2;
                    break;
                case "mul":
                    res = n1 * n2;
                    break;
                case "div":
                    if (n2 === 0) {
                        document.getElementById("result").innerText = "Cannot divide by zero!";
                        return;
                    }
                    res = n1 / n2;
                    break;
                default:
                    res = "Invalid operation";
            }

            document.getElementById("result").innerText = "Result: " + res;
        }
    </script>
</body>
</html>
```

**Explanation:**
- `parseFloat()` converts input string values to numbers.
- A `switch` statement selects the arithmetic operation based on the dropdown value.
- Division by zero and invalid (non-numeric) input are explicitly handled — a common exam requirement.
- `document.getElementById()` is used for DOM access and manipulation of both input and output elements.

---

## Q3. Document Object Model (DOM) in HTML

The **DOM (Document Object Model)** is a programming interface/API for HTML and XML documents. It represents the page as a **tree of objects (nodes)** so that scripts (like JavaScript) can access and manipulate the structure, style, and content dynamically.

### DOM Tree Structure

```
Document
 └── html
      ├── head
      │    └── title
      └── body
           ├── h1
           ├── p
           └── div
                └── ul
                     ├── li
                     └── li
```

### Key Concepts

| Term | Description |
|---|---|
| Node | Every element, attribute, and piece of text in HTML |
| Element Node | Represents an HTML tag (e.g., `<p>`, `<div>`) |
| Text Node | Represents the text inside an element |
| Attribute Node | Represents an attribute of an element |
| Root Node | The `document` object itself |

### Common DOM Methods

```javascript
document.getElementById("id");         // select by id
document.getElementsByClassName("cls"); // select by class
document.getElementsByTagName("p");     // select by tag
document.querySelector(".cls");         // select first match (CSS selector)
document.querySelectorAll("p");         // select all matches

// Manipulation
document.getElementById("demo").innerHTML = "New Content";
document.getElementById("demo").style.color = "red";
element.setAttribute("src", "image.png");
element.appendChild(newNode);
element.removeChild(childNode);
```

**Importance of DOM:**
- Enables **dynamic** web pages (content changes without reloading).
- Bridges HTML structure with JavaScript logic.
- Forms the basis for event handling, form validation, and AJAX-based updates.

---

## Q4. HTML Form and Client-Side Validation (JavaScript) `[Long]`

Client-side validation checks form data in the browser **before** it is sent to the server, improving user experience and reducing unnecessary server load.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registration Form Validation</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .error { color: red; font-size: 13px; }
        form { width: 350px; margin: auto; }
        input { width: 100%; padding: 6px; margin-bottom: 5px; }
    </style>
</head>
<body>
    <h2 style="text-align:center;">Registration Form</h2>
    <form name="regForm" onsubmit="return validateForm()" method="post">

        Name: <input type="text" id="name">
        <p class="error" id="nameErr"></p>

        Email: <input type="text" id="email">
        <p class="error" id="emailErr"></p>

        Password: <input type="password" id="password">
        <p class="error" id="passErr"></p>

        Phone: <input type="text" id="phone">
        <p class="error" id="phoneErr"></p>

        <button type="submit">Register</button>
    </form>

    <script>
        function validateForm() {
            let valid = true;

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let phone = document.getElementById("phone").value.trim();

            // clear previous errors
            document.getElementById("nameErr").innerText = "";
            document.getElementById("emailErr").innerText = "";
            document.getElementById("passErr").innerText = "";
            document.getElementById("phoneErr").innerText = "";

            // Name validation
            if (name === "") {
                document.getElementById("nameErr").innerText = "Name is required.";
                valid = false;
            }

            // Email validation using regex
            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("emailErr").innerText = "Enter a valid email address.";
                valid = false;
            }

            // Password validation (min 6 chars)
            if (password.length < 6) {
                document.getElementById("passErr").innerText = "Password must be at least 6 characters.";
                valid = false;
            }

            // Phone validation (10 digits)
            let phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(phone)) {
                document.getElementById("phoneErr").innerText = "Enter a valid 10-digit phone number.";
                valid = false;
            }

            return valid; // prevents submission if false
        }
    </script>
</body>
</html>
```

**Explanation:**
- The `onsubmit="return validateForm()"` attribute intercepts submission — if `validateForm()` returns `false`, the form is **not submitted**.
- **Regular expressions** validate email and phone number formats.
- Each field displays its own inline error message, cleared and re-checked on every submit attempt.
- `.trim()` removes leading/trailing whitespace before checking emptiness.

---

## Q5. A Program with JavaScript

A commonly asked short program — checking whether a number is **prime**, and one to find the **factorial** of a number, shown together as they frequently appear in exams.

```html
<!DOCTYPE html>
<html>
<body>
    <script>
        // Program 1: Check Prime Number
        function isPrime(num) {
            if (num < 2) return false;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false;
            }
            return true;
        }

        let n = 29;
        document.write(n + (isPrime(n) ? " is a Prime Number" : " is not a Prime Number") + "<br>");

        // Program 2: Factorial using a function
        function factorial(num) {
            if (num === 0 || num === 1) return 1;
            return num * factorial(num - 1);
        }

        let f = 5;
        document.write("Factorial of " + f + " is " + factorial(f));
    </script>
</body>
</html>
```

**Output:**
```
29 is a Prime Number
Factorial of 5 is 120
```

---

## Q6. Session and Cookies in PHP

Both **sessions** and **cookies** are used to store data across multiple pages (since HTTP is stateless), but they differ in where the data is stored and how long it persists.

| Feature | Session | Cookie |
|---|---|---|
| Storage location | Server | Client (browser) |
| Security | More secure | Less secure (visible/editable by user) |
| Size limit | Large amount of data | ~4KB |
| Lifetime | Ends when browser closes / session destroyed | Can persist for a set expiry time |
| Identifier | `PHPSESSID` sent via cookie | Data itself stored in browser |

### Working with Sessions

```php
<?php
session_start(); // must be called before any output

$_SESSION["username"] = "Mahakal";
echo "Session variable set.";

// Retrieving on another page
session_start();
echo "Welcome " . $_SESSION["username"];

// Destroying a session
session_unset();
session_destroy();
?>
```

### Working with Cookies

```php
<?php
// Setting a cookie (name, value, expiry in seconds)
setcookie("user", "Mahakal", time() + (86400 * 7)); // expires in 7 days

// Retrieving a cookie
if (isset($_COOKIE["user"])) {
    echo "Welcome back, " . $_COOKIE["user"];
} else {
    echo "Cookie not set.";
}

// Deleting a cookie
setcookie("user", "", time() - 3600);
?>
```

**Note:** `setcookie()` must be called **before** any HTML output, as it modifies HTTP headers.

---

## Q7. PHP — Database Connectivity (Insert & Display) `[Long]`

### Database Table (assumed structure)

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(50),
    course VARCHAR(50)
);
```

### `db.php` — Connection File

```php
<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "college";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

### `insert.php` — Insert Form and Handling

```php
<?php
include("db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $course = $_POST["course"];

    // Using prepared statements to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO students (name, email, course) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $course);

    if ($stmt->execute()) {
        echo "Record inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
?>

<form method="post">
    Name: <input type="text" name="name" required><br>
    Email: <input type="email" name="email" required><br>
    Course: <input type="text" name="course" required><br>
    <button type="submit">Add Student</button>
</form>
```

### `display.php` — Displaying Records

```php
<?php
include("db.php");

$result = $conn->query("SELECT * FROM students");
?>

<table border="1" cellpadding="8">
    <tr>
        <th>ID</th><th>Name</th><th>Email</th><th>Course</th>
    </tr>
    <?php while ($row = $result->fetch_assoc()) { ?>
    <tr>
        <td><?php echo $row['id']; ?></td>
        <td><?php echo $row['name']; ?></td>
        <td><?php echo $row['email']; ?></td>
        <td><?php echo $row['course']; ?></td>
    </tr>
    <?php } ?>
</table>

<?php $conn->close(); ?>
```

**Explanation:**
- `mysqli` extension is used for MySQL connectivity.
- **Prepared statements** (`prepare`/`bind_param`) protect against SQL injection — an important point to mention in exams.
- `fetch_assoc()` retrieves each row as an associative array for looping through results with `while`.

---

## Q8. PHP Object-Oriented Programming `[Long]`

Demonstrates **class, object, constructor, inheritance, and encapsulation** — the core OOP pillars commonly asked in exams.

```php
<?php
class Person {
    // Encapsulation: properties are protected
    protected $name;
    protected $age;

    // Constructor
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function displayInfo() {
        echo "Name: " . $this->name . ", Age: " . $this->age . "<br>";
    }
}

// Inheritance: Student extends Person
class Student extends Person {
    private $course;

    public function __construct($name, $age, $course) {
        parent::__construct($name, $age); // calling parent constructor
        $this->course = $course;
    }

    // Method Overriding (Polymorphism)
    public function displayInfo() {
        parent::displayInfo();
        echo "Course: " . $this->course . "<br>";
    }
}

// Creating objects
$p1 = new Person("Ram", 30);
$p1->displayInfo();

$s1 = new Student("Sita", 21, "BCA");
$s1->displayInfo();
?>
```

**Output:**
```
Name: Ram, Age: 30
Name: Sita, Age: 21
Course: BCA
```

### OOP Concepts Used

| Concept | Where used |
|---|---|
| Class & Object | `Person`, `Student` classes; `$p1`, `$s1` objects |
| Constructor | `__construct()` in both classes |
| Encapsulation | `protected`/`private` properties, accessed via methods |
| Inheritance | `Student extends Person` |
| Polymorphism | `displayInfo()` overridden in `Student` |
| `parent::` keyword | Calls parent class constructor/method |

---

## Q9. AJAX and jQuery

**AJAX (Asynchronous JavaScript and XML)** allows web pages to update content **without reloading the entire page**, by exchanging data with the server in the background.

**jQuery** simplifies AJAX calls with concise methods like `$.ajax()`, `$.get()`, and `$.post()`.

### Example: Fetching Data with jQuery AJAX

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <button id="loadBtn">Load Data</button>
    <div id="output"></div>

    <script>
        $(document).ready(function () {
            $("#loadBtn").click(function () {
                $.ajax({
                    url: "data.php",
                    type: "GET",
                    success: function (response) {
                        $("#output").html(response);
                    },
                    error: function () {
                        $("#output").html("Error loading data.");
                    }
                });
            });
        });
    </script>
</body>
</html>
```

`data.php`:
```php
<?php
echo "<p>Data loaded successfully at " . date("H:i:s") . "</p>";
?>
```

### Why Use AJAX/jQuery

| Benefit | Description |
|---|---|
| No page reload | Only the required section updates |
| Faster UX | Reduces server load and improves speed |
| Simplified syntax | jQuery reduces boilerplate JavaScript code |
| Cross-browser compatibility | jQuery handles differences internally |

---

## Q10. CMS Features (WordPress or Joomla)

A **CMS (Content Management System)** allows users to create, manage, and modify website content without needing to code from scratch. **WordPress** is the most widely used CMS.

### Key Features of WordPress

| Feature | Description |
|---|---|
| Themes | Pre-designed templates to control site appearance |
| Plugins | Add-ons that extend functionality (SEO, forms, security, etc.) |
| User Roles | Admin, Editor, Author, Contributor, Subscriber — each with different permissions |
| Media Library | Centralized storage for images, videos, and documents |
| Post & Page Management | Separate handling of blog posts (time-based) and static pages |
| Widgets | Draggable content blocks for sidebars/footers |
| SEO Friendly | Clean URL structures, meta tag support via plugins |
| Custom Menus | Drag-and-drop navigation menu builder |
| Multisite Support | Manage multiple websites from a single installation |
| Security & Updates | Regular core, theme, and plugin updates |

**Advantages of using a CMS:**
- No advanced programming knowledge required to manage content.
- Faster website development using themes and plugins.
- Easy collaboration with multiple user roles.
- Large community support and extensive documentation.

---

## Quick Revision Summary

| Q. No | Topic | Type |
|---|---|---|
| 1 | Dialog Boxes (alert, confirm, prompt) | Theory + Short code |
| 2 | Calculator Program | Long — Full JS Code |
| 3 | DOM in HTML | Theory + Diagram |
| 4 | Form Validation | Long — Full JS Code |
| 5 | JS Program (Prime/Factorial) | Short Code |
| 6 | Session & Cookies in PHP | Theory + Code + Table |
| 7 | PHP DB Connectivity (Insert/Display) | Long — Full PHP Code |
| 8 | PHP OOP | Long — Full PHP Code |
| 9 | AJAX and jQuery | Theory + Code |
| 10 | CMS Features | Theory + Table |