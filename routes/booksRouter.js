const express=require('express');
const auth = require("../middleware/auth");
const router=express.Router();
const addBookController=require('../controllers/booksController/addBookController');
const displayBookController=require('../controllers/booksController/displayBookController');
const deleteBookController=require('../controllers/booksController/deleteBookController');
const updateBookController=require('../controllers/booksController/updateBookController');

router.get('/books',auth,displayBookController.displayBookTable)
router.get('/addbook',auth,addBookController.getAddBook)
router.post('/books',auth,addBookController.addBookPost)
router.delete('/books/:id',auth,deleteBookController.deleteBookById)
router.get('/books/:id',auth,displayBookController.displayBookById)
router.put('/books/:id',auth,updateBookController.updateBookById)

module.exports=router;