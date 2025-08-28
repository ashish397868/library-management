const express=require('express');
const router=express.Router();
const homeController=require('../controllers/loginSignupController/homeController');
const signupController=require('../controllers/loginSignupController/signupController');
const loginController=require('../controllers/loginSignupController/loginController');
const logoutController=require('../controllers/loginSignupController/logout');

router.get('/',homeController.redirectHome)
router.get('/signup',signupController.getSignup)
router.post('/signup',signupController.signupPost)
router.get('/login',loginController.getLogin)
router.post('/login',loginController.loginPost)
router.get('/logout',logoutController.logout)

module.exports=router;