import { Router } from "express";
const router = Router();

//import all controllers

import * as controller from '../controllers/appcontroller.js'




//Post Methods
router.route('/register').post((req, res) => res.json('Register route'));
router.route('/registerMail').post(); // send the email
router.route('/authenticate').post(); // authenticate user
router.route('/login').post(); // login in app

// Get Mehods
router.route('/user/:username').get(); //user with userName
router.route('/generateOTP').get(); // genarate Random OTP
router.route('/verifyOTP').get(); // verify generated OTP
router.route('/createResetSession').get(); // reset all the variables;


//Put Method 
router.route('/updateuser').put(); // is use to update he user profile
router.route('/resetPassword').put(); // use to reset password

export default router;