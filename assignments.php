<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .assignment-details {
            border: 1px solid #dddddd;
            padding: 20px;
            border-radius: 5px;
            background-color: #f9f9f9;
            display: none; /* Hide all questions initially */
        }

        h2 {
            margin-top: 0;
        }

        p {
            margin-bottom: 10px;
        }

        .option-label {
            margin-right: 10px;
        }

        .submit-btn, .next-btn, .prev-btn, .back-btn, .restart-btn, .quit-reason-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-right: 10px;
        }

        .submit-btn:hover, .next-btn:hover, .prev-btn:hover, .back-btn:hover, .restart-btn:hover, .quit-reason-btn:hover {
            background-color: #45a049;
        }

        .timer {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        #quitForm {
            display: none;
            border: 1px solid #dddddd;
            padding: 20px;
            border-radius: 5px;
            background-color: #f9f9f9;
            margin-top: 20px;
        }
        /* Add this CSS for the modal */
        .modal {
            display: none;
            position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
    </style>
    <script>
        let timerDuration; // Duration in seconds
        let remainingTime;
        let timerInterval;
        let currentQuestionIndex = 0; // Track current question

        function startTimer(duration) {
            let timer = duration, minutes, seconds;
            const display = document.querySelector('#timer');
            timerInterval = setInterval(() => {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                remainingTime = timer;

                if (--timer < 0) {
                    clearInterval(timerInterval);
                    document.getElementById("examForm").submit();
                }
            }, 1000);
        }

        window.onload = function () {
            const startTime = new Date();
            const endTime = new Date(startTime.getTime() + timerDuration * 1000);

            document.getElementById('start_time').value = startTime.toTimeString().split(' ')[0];
            document.getElementById('date').value = startTime.toISOString().split('T')[0];

            // Check if there is a saved remaining time in local storage
            const savedRemainingTime = localStorage.getItem('remainingTime');
            if (savedRemainingTime) {
                remainingTime = parseInt(savedRemainingTime, 10);
            } else {
                remainingTime = timerDuration;
            }

            startTimer(remainingTime);
            showQuestion(currentQuestionIndex); // Show the first question initially
        };

        function showQuestion(index) {
            const questions = document.querySelectorAll('.assignment-details');
            questions.forEach((question, i) => {
                question.style.display = (i === index) ? 'block' : 'none';
            });

            // Show or hide navigation buttons
            document.getElementById('prevBtn').style.display = (index === 0) ? 'none' : 'inline-block';
            document.getElementById('nextBtn').style.display = (index === questions.length - 1) ? 'none' : 'inline-block';
            document.getElementById('submitBtn').style.display = (index === questions.length - 1) ? 'inline-block' : 'none';
        }

        function nextQuestion() {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }

        function prevQuestion() {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }

        function submitForm() {
            // Capture end time when the submit button is clicked
            const endTime = new Date();
            document.getElementById('end_time').value = endTime.toTimeString().split(' ')[0];
            document.getElementById("examForm").submit();
        }
        // Modify the goBack() function
        function goBack() {
            clearInterval(timerInterval); // Pause the timer
            localStorage.setItem('remainingTime', remainingTime); // Save the remaining time in local storage
            document.getElementById('quitConfirmationModal').style.display = 'block'; // Show the quit confirmation modal
            }
            
            // New function to handle quit reason submission
            function submitQuitReason(reason) {
                if (reason === 'Other') {
                    document.getElementById('otherReasonContainer').style.display = 'block';
                } else {
                    console.log("Quit reason:", reason); // Replace this with actual form submission or handling
                    window.location.href = "student.php"; // Navigate to the student page
                    document.getElementById('quitConfirmationModal').style.display = 'none'; // Hide the modal
                    }
                }
                // Add this function to handle modal close
                var modal = document.getElementById('quitConfirmationModal');
                var span = document.getElementsByClassName("close")[0];
                
                span.onclick = function() {
                    modal.style.display = "none";
                }
                
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                function restartTimer() {
                    clearInterval(timerInterval); // Clear any existing timer
                    document.getElementById('examForm').reset(); // Reset the form to clear selected options
                    localStorage.removeItem('remainingTime'); // Remove the saved time from local storage
                    remainingTime = timerDuration; // Reset remaining time to the original duration
                    startTimer(remainingTime); // Start the timer again
                    showQuestion(0); // Reset to the first question
                    currentQuestionIndex = 0; // Reset the question index
                    }
    </script>
</head>
<body>

<div class="top-bar">
    <button type="button" class="back-btn" onclick="goBack()">Back</button>
    <div class="timer">
        Time Remaining: <span id="timer"></span>
        <button type="button" class="restart-btn" onclick="restartTimer()">Restart</button>
    </div>
</div>

<form id="examForm" action="submit.php?title=<?php echo urlencode($_GET['title']); ?>" method="post">
    <?php
    // Establishing a connection to the database (replace these values with your database credentials)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if title parameter is set in the URL
    if (isset($_GET['title'])) {
        // Get the title from the URL
        $title = $_GET['title'];

        // Fetch assignment details and timer from the database
        $sql = "SELECT a.*, e.timer FROM assignments a JOIN exam e ON a.title = e.title WHERE a.title = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $title);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Output data of the assignment
            while ($row = $result->fetch_assoc()) {
                echo "<div class='assignment-details'>";
                echo "<h2>Assignment Details</h2>";
                echo "<p><strong>Question:</strong> " . $row["question"] . "</p>";
                // Display options as radio buttons
                echo "<p><strong>Options:</strong></p>";
                echo "<p><input type='radio' name='option[" . $row['id'] . "]' value='" . $row["opt1"] . "' id='opt1_" . $row['id'] . "'><label class='option-label' for='opt1_" . $row['id'] . "'>" . $row["opt1"] . "</label></p>";
                echo "<p><input type='radio' name='option[" . $row['id'] . "]' value='" . $row["opt2"] . "' id='opt2_" . $row['id'] . "'><label class='option-label' for='opt2_" . $row['id'] . "'>" . $row["opt2"] . "</label></p>";
                echo "<p><input type='radio' name='option[" . $row['id'] . "]' value='" . $row["opt3"] . "' id='opt3_" . $row['id'] . "'><label class='option-label' for='opt3_" . $row['id'] . "'>" . $row["opt3"] . "</label></p>";
                echo "<p><input type='radio' name='option[" . $row['id'] . "]' value='" . $row["opt4"] . "' id='opt4_" . $row['id'] . "'><label class='option-label' for='opt4_" . $row['id'] . "'>" . $row["opt4"] . "</label></p>";
                echo "</div>";

                // Set the timer duration for JavaScript
                echo "<script>timerDuration = " . $row["timer"] * 60 . ";</script>"; // Timer in seconds
            }
        } else {
            echo "No assignment details found for the given title";
        }
    } else {
        echo "No title specified";
    }

    $conn->close();
    ?>

    <!-- Hidden fields to store date, start time, and end time -->
    <input type="hidden" id="date" name="date">
    <input type="hidden" id="start_time" name="start_time">
    <input type="hidden" id="end_time" name="end_time">

    <!-- Navigation buttons -->
    <button type="button" class="prev-btn" id="prevBtn" onclick="prevQuestion()">Previous</button>
    <button type="button" class="next-btn" id="nextBtn" onclick="nextQuestion()">Next</button>
    <button type="button" class="submit-btn" id="submitBtn" onclick="submitForm()" style="display: none;">Submit</button>
</form>

<!--Quitting Back button -->
<div id="quitConfirmationModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>🤷‍♂️Why are you leaving this test?</h2>
        <button class="quit-reason-btn" onclick="submitQuitReason('Boring')">Boring</button>
        <button class="quit-reason-btn" onclick="submitQuitReason('More Questions')">More Questions</button>
        <button class="quit-reason-btn" onclick="submitQuitReason('Difficult')">Difficult</button>
        <button class="quit-reason-btn" onclick="submitQuitReason('Other')">Other</button>
        <div id="otherReasonContainer" style="display: none;">
            <input type="text" id="otherReason" placeholder="Enter your reason">
            <button class="quit-reason-btn" onclick="submitQuitReason($('#otherReason').val())">Submit</button>
        </div>
    </div>
</div>
</body>
</html>
