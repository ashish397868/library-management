const express=require('express');
const auth = require("../middleware/auth");
const router=express.Router();
const addBookController=require('../controllers/booksController/addBookController');
const displayBookController=require('../controllers/booksController/displayBookController');
const deleteBookController=require('../controllers/booksController/deleteBookController');
const updateBookController=require('../controllers/booksController/updateBookController');
const returnBookController=require('../controllers/booksController/returnBookController');

router.get('/books',auth,displayBookController.displayBookTable)
router.get('/addbook',auth,addBookController.getAddBook)
router.post('/books',auth,addBookController.addBookPost)
router.delete('/books/:id',auth,deleteBookController.deleteBookById)
router.get('/books/:id',auth,displayBookController.displayBookById)
router.put('/books/:id',auth,updateBookController.updateBookById)
router.get('/books/:id/return',auth,returnBookController.getReturnBookPage)
router.post('/books/:id/return',auth,returnBookController.returnBookById)

module.exports=router;