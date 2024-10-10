const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();

// Serve the favicon from the 'public' folder
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 

// Other routes and middleware...

app.listen(3000);