const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrowController');
const auth = require("../middleware/auth");

router.get('/books', auth, borrowController.getAvailableBooks);
router.get('/books/:id', auth, borrowController.getBorrowBookById);
router.post('/books/:id', auth, borrowController.borrowBook);
router.get('/borrowed', auth, borrowController.getBorrowedBooks);
router.get('/return/:id', auth, borrowController.getReturnBook);
router.post('/return/', auth, borrowController.returnBook);

module.exports = router;