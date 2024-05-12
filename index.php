<?php
// Start the session
session_start();

// Check if the session ID is set
if (!isset($_SESSION['session_id'])) {
    // Generate a new session ID
    $session_id = session_id();
    $_SESSION['session_id'] = $session_id;
    $_SESSION['start_time'] = time(); // Initialize start_time on the first visit
}

// Get the current page URL
$current_page_url = $_SERVER['REQUEST_URI'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Calculate the duration spent on the current page
$current_time = time();
$duration = $current_time - $_SESSION['start_time'];

// Insert the time tracking data into the database
$session_id = $_SESSION['session_id'];
$sql = "INSERT INTO time_tracking (session_id, page_url, duration) VALUES ('$session_id', '$current_page_url', $duration)";

if ($conn->query($sql) === TRUE) {
    // Data inserted successfully
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Update the start time in the session
$_SESSION['start_time'] = $current_time;

// Retrieve the total duration spent by the user from the database
$sql_total_duration = "SELECT SUM(duration) AS total_duration FROM time_tracking WHERE session_id = '$session_id'";
$result = $conn->query($sql_total_duration);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $total_duration = $row['total_duration'];
    // This line was removed to prevent displaying the total duration on the webpage
    // echo "Total duration spent on the website: " . formatDuration($total_duration);
} else {
    echo "Error retrieving total duration";
}

$conn->close();

// Function to format duration into hours:minutes:seconds
function formatDuration($seconds) {
    $hours = floor($seconds / 3600);
    $minutes = floor(($seconds / 60) % 60);
    $seconds = $seconds % 60;
    
    return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
}
?>


<!-- Rest of your index.php content goes here -->

<!-- Rest of your index.php content goes here -->
<!DOCTYPE html>
<html>
<head>
    <title>My Educational Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        nav {
            background-color: #f2f2f2;
            padding: 10px;
            text-align: center;
        }
        nav a {
            color: #333;
            text-decoration: none;
            padding: 10px;
        }
        main {
            padding: 20px;
        }
        footer {
            background-color: #333;
            color: #fff;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to My Educational Website</h1>
    </header>
    <nav>
        <a href="index.php">Home</a>
        <a href="#">Courses</a>
        <a href="about.php">About</a>
        <a href="#">Contact</a>
    </nav>
    <main>
        <h2>Home</h2>
        <p>This is the homepage of our educational website. Here, you can find information about our courses, enroll in online tests, and more.</p>
        <h3>Featured Courses</h3>
        <ul>
            <li>Introduction to Programming</li>
            <li>Web Development Fundamentals</li>
            <li>Data Science for Beginners</li>
        </ul>
    </main>
    <footer>
        <p>&copy; 2023 My Educational Website. All rights reserved.</p>
    </footer>
</body>
</html>
