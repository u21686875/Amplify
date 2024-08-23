const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory in the frontend folder
app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});