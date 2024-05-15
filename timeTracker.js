// CLIENT SIDE SCRIPT FILES 

// Start-Track time on each page
let pageStartTime;

window.addEventListener('load', () => {
  pageStartTime = new Date().getTime();
});

window.addEventListener('beforeunload', async () => {
  const pageEndTime = new Date().getTime();
  const timeSpentOnPage = pageEndTime - pageStartTime;
  const pageURL = window.location.href;
  const userId = getCurrentUserId(); // Assuming you have a function to get the current user ID

  try {
    // Send the time spent on the current page to the server
    await sendDataToServer('/api/track-page-time', {
      userId,
      pageURL,
      timeSpentOnPage,
    });
  } catch (error) {
    console.error('Failed to send page time data to server:', error);
  }
});

// End-Track time on each page

// Start-Track of the Overall time on the website

let overallStartTime;

window.addEventListener('load', async () => {
  const userId = getCurrentUserId();

  try {
    // Get the overall start time and time from the server
    const { startTime, overallTime } = await fetchDataFromServer(`/api/get-overall-time?userId=${userId}`);
    overallStartTime = startTime;

    window.addEventListener('beforeunload', async () => {
      const pageEndTime = new Date().getTime();
      const timeSpentOnPage = pageEndTime - pageStartTime;
      const newOverallTime = overallTime + timeSpentOnPage;

      try {
        // Send the updated overall time to the server
        await sendDataToServer('/api/update-overall-time', {
          userId,
          overallTime: newOverallTime,
        });
      } catch (error) {
        console.error('Failed to update overall time on server:', error);
      }
    });
  } catch (error) {
    console.error('Failed to fetch overall time data from server:', error);
  }
});
// End-Track of the Overall time on the website

// Start-Helper functions to communicate with the server
async function sendDataToServer(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  }
  
  async function fetchDataFromServer(url) {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
  
    return response.json();
  }
  //End-Helper functions to communicate with the server