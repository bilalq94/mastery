// app.js

// ---------------------------------------------------------
// Setup
// ---------------------------------------------------------

// Declare variables
var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var configDB     = require('./config/database');
var seed         = require('./seed');
var port         = process.env.PORT || 1337;

// Allow Express to serve static files in "public" directory
app.use(express.static('public'));

// Views + Templating
app.set('views', './views');
app.set('view engine', 'pug');

// ---------------------------------------------------------
// Database configurations
// ---------------------------------------------------------
mongoose.connect(configDB.url);
seed.seedDB();

// ---------------------------------------------------------
// API Endpoints
// ---------------------------------------------------------
require('./config/api')(app);

// ---------------------------------------------------------
// Routes
// ---------------------------------------------------------
require('./config/routes')(app);

// ---------------------------------------------------------
// Launch
// ---------------------------------------------------------

// Server launch (TODO: Implement try-catch)
app.listen(port);
console.log('Launched server at: http://localhost:' + port);