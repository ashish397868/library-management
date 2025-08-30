const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middleware/auth');

// Protect the dashboard route so req.user is populated from the JWT
router.get('/dashboard', verifyToken, dashboardController.getDashboard);

module.exports = router;