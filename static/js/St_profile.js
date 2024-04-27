 // STUDENT PROFILE SCRIPTS 

 // Start of the  script of the dynamic ACADEMIC PROGRESS -> // Fetch data from backend and update the UI dynamically
 document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch courses data
        const coursesResponse = await axios.get('/api/getCourses');
        const courses = coursesResponse.data;

        // Update courses list dynamically
        const courseList = document.querySelector('.course-list');
        courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('course');
            courseItem.innerHTML = `
                <div class="course-details">
                    <h6>${course.name}</h6>
                    <div class="progress">
                        <div class="progress-bar" style="width: ${course.progress}%;">${course.progress}%</div>
                    </div>
                    <p>Completion Status: ${course.progress}%</p>
                    <a href="${course.materialsLink}">View Course Materials</a>
                </div>
            `;
            courseList.appendChild(courseItem);
        });

        // Fetch test scores data
        const testScoresResponse = await axios.get('/api/getTestScores');
        const testScores = testScoresResponse.data;

        // Update test scores dynamically
        const testScoresContainer = document.querySelector('.test-scores');
        testScores.forEach(score => {
            const scoreItem = document.createElement('div');
            scoreItem.classList.add('test-score');
            scoreItem.innerHTML = `
                <h6>${score.testName}</h6>
                <p>Date: ${score.date}</p>
                <p>Score: ${score.score}%</p>
                <a href="${score.detailsLink}">View Details</a>
            `;
            testScoresContainer.appendChild(scoreItem);
        });

        // Fetch progress overview data
        const progressOverviewResponse = await axios.get('/api/getProgressOverview');
        const progressData = progressOverviewResponse.data;

        // Update progress chart dynamically
        const progressChartCanvas = document.getElementById('progress-chart');
        const progressChart = new Chart(progressChartCanvas, {
            type: 'bar',
            data: {
                labels: progressData.labels,
                datasets: [{
                    label: 'Progress',
                    data: progressData.progressData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        // Fetch certificates/achievements data
        const achievementsResponse = await axios.get('/api/getAchievements');
        const achievements = achievementsResponse.data;

        // Update achievements list dynamically
        const achievementsList = document.querySelector('.achievements');
        achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.classList.add('achievement');
            achievementItem.innerHTML = `
                <h6>${achievement.name}</h6>
                <p>Date Earned: ${achievement.date}</p>
                <p>Description: ${achievement.description}</p>
                <a href="${achievement.downloadLink}">Download Certificate</a>
            `;
            achievementsList.appendChild(achievementItem);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
// End of the  script of the dynamic ACADEMIC PROGRESS -> // Fetch data from backend and update the UI dynamically


// Start of the Script of Dynamic EDUCATIONAL RESOURCES -> // Fetch data from backend and update the UI dynamically
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch course materials data
        const materialsResponse = await axios.get('/api/getCourseMaterials');
        const courseMaterials = materialsResponse.data;

        // Update course materials dynamically
        const courseMaterialsContainer = document.querySelector('.course-materials');
        courseMaterials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.classList.add('material');
            materialItem.innerHTML = `
                <h6>${material.title}</h6>
                <p>${material.description}</p>
                <a href="${material.downloadLink}">Download</a>
            `;
            courseMaterialsContainer.appendChild(materialItem);
        });

        // Fetch video lectures data
        const lecturesResponse = await axios.get('/api/getVideoLectures');
        const videoLectures = lecturesResponse.data;

        // Update video lectures dynamically
        const videoLecturesContainer = document.querySelector('.video-lectures');
        videoLectures.forEach(lecture => {
            const lectureItem = document.createElement('div');
            lectureItem.classList.add('lecture');
            lectureItem.innerHTML = `
                <h6>${lecture.title}</h6>
                <video controls>
                    <source src="${lecture.videoSource}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            videoLecturesContainer.appendChild(lectureItem);
        });

        // Fetch assignments data
        const assignmentsResponse = await axios.get('/api/getAssignments');
        const assignments = assignmentsResponse.data;

        // Update assignments dynamically
        const assignmentsContainer = document.querySelector('.assignments');
        assignments.forEach(assignment => {
            const assignmentItem = document.createElement('div');
            assignmentItem.classList.add('assignment');
            assignmentItem.innerHTML = `
                <h6>${assignment.title}</h6>
                <p>Deadline: ${assignment.deadline}</p>
                <p>Status: ${assignment.status}</p>
                <a href="${assignment.detailsLink}">View Details</a>
            `;
            assignmentsContainer.appendChild(assignmentItem);
        });

        // Fetch discussion forums data
        const forumsResponse = await axios.get('/api/getDiscussionForums');
        const discussionForums = forumsResponse.data;

        // Update discussion forums dynamically
        const forumsContainer = document.querySelector('.discussion-forums');
        discussionForums.forEach(forum => {
            const forumItem = document.createElement('div');
            forumItem.classList.add('forum');
            forumItem.innerHTML = `
                <h6>${forum.title}</h6>
                <p>${forum.description}</p>
                <a href="${forum.joinLink}">Join Forum</a>
            `;
            forumsContainer.appendChild(forumItem);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
// End of the Script of Dynamic EDUCATIONAL RESOURCES 

// Start of the Script of Dynamic PERSONAL DEVELOPMENT 
// Define career interests and corresponding options
const careerInterests = [
    { value: 'IT', label: 'Information Technology', badges: ['Software Developer', 'Data Analyst', 'IT Consultant'] },
    { value: 'healthcare', label: 'Healthcare', badges: ['Nurse', 'Doctor', 'Medical Researcher'] },
    { value: 'marketing', label: 'Marketing', badges: ['Digital Marketer', 'Marketing Manager', 'SEO Specialist'] },
    { value: 'finance', label: 'Finance', badges: ['Financial Analyst', 'Investment Banker', 'Accountant'] }
    // Add more career interests as needed
];

// Function to populate career interests dropdown and badges
function populateCareerInterests() {
    const careerDropdown = document.getElementById('career-interests');
    const industryOptions = document.getElementById('industry-options');

    // Populate career interests dropdown
    careerInterests.forEach(interest => {
        const option = document.createElement('option');
        option.value = interest.value;
        option.text = interest.label;
        careerDropdown.appendChild(option);
    });

    // Add badges based on selected career interest
    careerDropdown.addEventListener('change', () => {
        const selectedInterest = careerDropdown.value;
        const selectedCareer = careerInterests.find(interest => interest.value === selectedInterest);
        if (selectedCareer) {
            industryOptions.innerHTML = ''; // Clear previous badges
            selectedCareer.badges.forEach(badge => {
                const badgeElement = document.createElement('div');
                badgeElement.classList.add('badge');
                badgeElement.textContent = badge;
                industryOptions.appendChild(badgeElement);
            });
        }
    });
}

// Call the function to populate career interests dropdown and badges
populateCareerInterests();
// End of the Script of Dynamic PERSONAL DEVELOPMENT 

// START Function to fetch courses based on SELECTED SKILLS 
function fetchCourses(selectedSkills) {
    // Assume backend endpoint for fetching courses
    const endpoint = '/api/courses';

    // Make a GET request to fetch courses
    fetch(`${endpoint}?skills=${selectedSkills}`)
        .then(response => response.json())
        .then(data => {
            const coursesContainer = document.getElementById('skills-courses');
            coursesContainer.innerHTML = ''; // Clear previous courses

            data.forEach(course => {
                const courseElement = document.createElement('div');
                courseElement.classList.add('course');
                courseElement.innerHTML = `
                    <h4>${course.title}</h4>
                    <p>${course.description}</p>
                    <a href="${course.link}" target="_blank">Learn More</a>
                `;
                coursesContainer.appendChild(courseElement);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

// Function to handle quiz submission
function submitQuiz(quizData) {
    // Assume backend endpoint for quiz submission
    const endpoint = '/api/quiz';

    // Make a POST request to submit quiz data
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Quiz submission successful:', data);
        // Update UI or display results based on backend response
    })
    .catch(error => {
        console.error('Error submitting quiz:', error);
    });
}

// Event listener for skill assessments
const skillAssessmentsContainer = document.getElementById('skill-assessments');
skillAssessmentsContainer.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect quiz data from the form
    const quizForm = event.target;
    const formData = new FormData(quizForm);
    const quizData = {};
    formData.forEach((value, key) => {
        quizData[key] = value;
    });

    // Submit quiz data to the backend
    submitQuiz(quizData);
});

// Example usage:
// Fetch courses based on selected skills (e.g., 'programming')
const selectedSkills = 'programming';
fetchCourses(selectedSkills);
// END Function to fetch courses based on SELECTED SKILLS 

//START OF SCRIPTS FOR Personal Projects:
document.getElementById('project-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let formData = new FormData(this);
    
    // Send formData to the server using fetch or XMLHttpRequest
    fetch('/upload-project', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from the server
        console.log(data);
        // Reload or update project gallery
        loadProjects();
    })
    .catch(error => console.error('Error:', error));
});

// Function to fetch and display projects dynamically
function loadProjects() {
    fetch('/get-projects')
    .then(response => response.json())
    .then(projects => {
        // Clear previous projects
        document.getElementById('project-gallery').innerHTML = '';

        // Display fetched projects
        projects.forEach(project => {
            let projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <a href="/uploads/${project.filename}" target="_blank">View Project</a>
            `;
            document.getElementById('project-gallery').appendChild(projectCard);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Call loadProjects initially to load existing projects
loadProjects();
//END OF SCRIPTS FOR Personal Projects:


// START OF SCRIPT OF CARRIER GUIDANCE 

  // Fetch career resources
  fetch('/career-resources')
  .then(response => response.json())
  .then(resources => {
      let resourceList = '';
      resources.forEach(resource => {
          resourceList += `<div class="resource-item">${resource.title}</div>`;
      });
      document.getElementById('career-resources').innerHTML = resourceList;
  })
  .catch(error => console.error('Error fetching career resources:', error));

  // Fetch career events
  fetch('/career-events')
  .then(response => response.json())
  .then(events => {
      let eventList = '';
      events.forEach(event => {
          eventList += `<div class="event-item">${event.title}</div>`;
      });
      document.getElementById('career-events').innerHTML = eventList;
  })
  .catch(error => console.error('Error fetching career events:', error));

  // Fetch success stories
  fetch('/success-stories')
  .then(response => response.json())
  .then(stories => {
      let storyList = '';
      stories.forEach(story => {
          storyList += `<div class="story-item">${story.title}</div>`;
      });
      document.getElementById('success-stories').innerHTML = storyList;
  })
  .catch(error => console.error('Error fetching success stories:', error));

  // END OF SCRIPT OF CARRIER GUIDANCE 

// Start of the SCRIPT FOR Networking Opportunities
  // Fetch networking features (forums, boards, mentorship programs)
  fetch('/networking-features')
  .then(response => response.json())
  .then(features => {
      let featureList = '';
      features.forEach(feature => {
          featureList += `<div class="network-item">${feature.title}</div>`;
      });
      document.getElementById('networking-features').innerHTML = featureList;
  })
  .catch(error => console.error('Error fetching networking features:', error));
  // End of the SCRIPT FOR Networking Opportunities

//  Start of the SCRIPT FOR Goal Setting and Tracking
// Function to handle goal form submission
   document.getElementById('goal-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const goalName = document.getElementById('goal-name').value;
    const goalProgress = document.getElementById('goal-progress').value;

    // Create a new goal object
    const goal = {
        name: goalName,
        progress: goalProgress
    };

    // Save the goal to local storage
    saveGoal(goal);

    // Reset form fields
    document.getElementById('goal-form').reset();

    // Refresh goal list
    displayGoals();
});

// Function to save goal to local storage
function saveGoal(goal) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
}

// Function to display goals from local storage
function displayGoals() {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    let goalList = '';
    goals.forEach((goal, index) => {
        goalList += `<div>${index + 1}. ${goal.name} - ${goal.progress}%</div>`;
    });
    document.getElementById('goal-list').innerHTML = goalList;
}

// Initial display of goals
displayGoals();

// End of the SCRIPT FOR Goal Setting and Tracking
