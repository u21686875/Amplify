"use strict";

var express = require('express');
var path = require('path');
var app = express();

// Serve static files from the dist directory
app.use(express["static"]('public'));
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});