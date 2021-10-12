console.log('in index.js');
const express = require('express');
const { resolve } = require('path'); // For routing
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8088;
console.log(port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// Use the router files
app.use('/companies', require('./routes/api/company.js'));
app.use('/inventories', require('./routes/api/inventory.js'));

// app.get('/', (req, res) => {
//     try { 
//         // Try connecting to the database
//         res.send('Trying to connect to the database');
        
//     } 
//     catch(err) {
//         console.log(err);
//     }
// });

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
