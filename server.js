const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();
const port = process.env.PORT;

// Import routes
const bookRouter = require('./routes/booksRouter');
const loginSignupRouter = require('./routes/loginSignup');
const dashboardRouter = require('./routes/dashboardController');
const borrowRouter = require('./routes/borrowRouter');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET || "secretKey123",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Custom middleware
app.use((req, res, next) => {
    // Make user data available to all views
    res.locals.user = req.session.userdata;
    next();
});

// View engine setup
app.set('view engine', 'ejs');

// Routes
app.use('/', loginSignupRouter);
app.use('/', bookRouter);
app.use('/', dashboardRouter);
app.use('/borrow', borrowRouter);

// Database connection
const database = require('./config/db');
database();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});