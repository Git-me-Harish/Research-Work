// Start of server script for the project upload 

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('public'));

// Route for uploading project details
app.post('/upload-project', upload.single('project-file'), (req, res) => {
    const { projectTitle, projectDescription } = req.body;
    const projectFile = req.file;

    // Save project details to the database (You'll need a database connection and schema for this)

    // Respond with JSON data
    res.json({ message: 'Project uploaded successfully' });
});

// Route for fetching projects
app.get('/get-projects', (req, res) => {
    // Fetch projects from the database (You'll need to implement this)

    // For demonstration, simulate fetching projects
    const projects = [
        { title: 'Project 1', description: 'Description 1', filename: 'project1.pdf' },
        { title: 'Project 2', description: 'Description 2', filename: 'project2.pdf' }
    ];

    // Respond with JSON data
    res.json(projects);
});
// END of server script for the project upload 


// START SCRIPT FOR THE CARRIER GUIDANCE  SECTION
// Sample data for career resources, events, and stories (replace with actual data from your database)
const careerResources = [
    { title: 'Article 1', link: 'https://example.com/article1' },
    { title: 'Article 2', link: 'https://example.com/article2' },
    { title: 'Article 3', link: 'https://example.com/article3' }
];

const careerEvents = [
    { title: 'Webinar 1', date: '2024-05-01', registrationLink: 'https://example.com/webinar1' },
    { title: 'Workshop 1', date: '2024-05-05', registrationLink: 'https://example.com/workshop1' },
    { title: 'Mentorship Program', date: '2024-06-01', registrationLink: 'https://example.com/mentorship' }
];

const successStories = [
    { title: 'Success Story 1', author: 'John Doe', company: 'Tech Inc.' },
    { title: 'Success Story 2', author: 'Jane Smith', company: 'Healthcare Ltd.' },
    { title: 'Success Story 3', author: 'Michael Johnson', company: 'Marketing Agency' }
];

// Route for fetching career resources
app.get('/career-resources', (req, res) => {
    res.json(careerResources);
});

// Route for fetching career events
app.get('/career-events', (req, res) => {
    res.json(careerEvents);
});

// Route for fetching success stories
app.get('/success-stories', (req, res) => {
    res.json(successStories);
});
// END OF SCRIPT FOR THE CARRIER GUIDANCE  SECTION

// Start of the SCRIPT FOR Networking Opportunities
// Sample data for networking features (replace with actual data from your database)
const networkingFeatures = [
    { title: 'Discussion Forum', link: 'https://example.com/forum' },
    { title: 'Chat Room', link: 'https://example.com/chat' },
    { title: 'Mentorship Program', link: 'https://example.com/mentorship' }
];

// Route for fetching networking features
app.get('/networking-features', (req, res) => {
    res.json(networkingFeatures);
});

//End of the SCRIPT FOR Networking Opportunities

//Start of the SCRIPT FOR Goal Setting and Tracking
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/goalApp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Define Goal schema
const goalSchema = new mongoose.Schema({
    name: String,
    progress: Number
});
const Goal = mongoose.model('Goal', goalSchema);

// Route for saving a new goal
app.post('/goals', (req, res) => {
    const { name, progress } = req.body;
    const goal = new Goal({ name, progress });
    goal.save()
        .then(() => res.status(201).send('Goal saved successfully'))
        .catch(err => res.status(500).send(err.message));
});

// Route for fetching all goals
app.get('/goals', (req, res) => {
    Goal.find()
        .then(goals => res.json(goals))
        .catch(err => res.status(500).send(err.message));
});
//End of the SCRIPT FOR Goal Setting and Tracking


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// End of total server script for the project upload 


