// backend/server.js

const express = require('express');
const path = require('path');
const smartHomeController = require('./smartHomeController');

const app = express();
const port = 3001;

app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API routes
app.post('/api/controlFanSpeed', async (req, res) => {
    // Handle control fan speed request
});

app.get('/api/getDeviceStatus/:id', async (req, res) => {
    // Handle get device status request
});

// Serve the React app for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
