"use strict";

var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express["static"]('./public'));

// Serve the main HTML file for all routes
app.get('*', function (req, res) {
  res.sendFile('./public/index.html');
});
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});