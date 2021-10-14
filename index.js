console.log('in index.js');
const express = require('express');
const { resolve } = require('path'); // For routing
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;
console.log(port);

app.use(cors());
app.use(express.json());                            // Automatically parses JSON data
app.use(express.urlencoded({ extended: true }));    // Allows to parse encoded Form data
app.use(express.static('public'));                  // Sets aside static assets folder for static content (html/css/js)

// Use the router files
app.use('/companies', require('./routes/api/company.js'));

app.get('/', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});

// Catch any unmatched routes and send index.html
app.get('*', (req, res) => {
    res.sendFile(resolve('public', 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
