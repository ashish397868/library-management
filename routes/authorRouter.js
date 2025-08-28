const express=require('express');
const auth = require("../middleware/auth");
const router=express.Router();
const addAuthorController=require('../controllers/authorController/addAuthorController');
const displayAuthorController=require('../controllers/authorController/displayAuthorController');
const updateAuthorController=require('../controllers/authorController/updateAuthorController');
const deleteAuthorController=require('../controllers/authorController/deleteAuthorController');

// Author Routes
router.get('/authors',auth,displayAuthorController.displayAuthorTable)
router.get('/authors/:id',auth,displayAuthorController.displayAuthorById)
router.put('/authors/:id',auth,updateAuthorController.updateAuthorById)
router.delete('/authors/:id',auth,deleteAuthorController.deleteAuthorById)
router.get('/addauthor',auth,addAuthorController.getAddAuthor)
router.post('/authors',auth,addAuthorController.addAuthorPost)

module.exports=router;