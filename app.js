let startTime = null;
let endTime = null;
let totalTime = 0;

window.onload = function() {
  startTimer();
};

window.onbeforeunload = function() {
  stopTimer();
};

// Function to start the timer
function startTimer() {
  startTime = new Date().getTime();
  console.log('Timer started.');
}

// Function to stop the timer
function stopTimer() {
  if (startTime !== null) {
    endTime = new Date().getTime();
    totalTime += endTime - startTime;
    console.log('Timer stopped. Total time:', totalTime, 'milliseconds');
    sendTimeToServer(totalTime);
  } else {
    console.log('Timer not started.');
  }
}

// Function to send time data to server
function sendTimeToServer(time) {
  // Simulate AJAX request to send time data to server
  console.log('Sending time data to server:', time, 'milliseconds');
  fetch('/api/save-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timeSpent: time }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Time data sent to server successfully:', data);
    })
    .catch(error => {
      console.error('Error sending time data:', error);
    });
}

// Fetch time spent data from server and populate table
fetch('/api/get-timespents')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('timeSpentTableBody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(item.startTime).toLocaleString()}</td>
        <td>${new Date(item.endTime).toLocaleString()}</td>
        <td>${item.timeSpent / 1000} seconds</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching time spent data:', error);
  });
