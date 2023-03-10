import { Router } from "express";
const router = Router();

//import all controllers

import * as controller from '../controllers/appcontroller.js'
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from "../middleware/auth.js";



//Post Methods
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail); // send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app

// Get Mehods
router.route('/user/:username').get(controller.getUser); //user with userName
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // genarate Random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables;


//Put Method 
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update he user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password

export default router;