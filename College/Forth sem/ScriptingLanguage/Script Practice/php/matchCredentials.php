<!-- Write a PHP function that accepts username and password as arguments and checks with student table; if credentials match, redirect to dashboard page, otherwise display 'Invalid username/password' -->
<?php
function checkLogin($username, $password) {
    $conn = new mysqli("localhost", "root", "", "college_db");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $username = $conn->real_escape_string($username);
    $password = $conn->real_escape_string($password);

    $sql = "SELECT * FROM student WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid username/password";
    }

    $conn->close();
}

// Example call
checkLogin($_POST['username'], $_POST['password']);
?>