import { Router } from "express";
const router = Router();


//Post Methods
router.route('/register').post((req, res) => res.json('Register route'));
router.route('/registerMail').post();
router.route('/authenticate').post();
router.route('/login').post();

// Get Mehods
router.route('/user/:username').get(); 
router.route('/generateOTP').get(); 
router.route('/verifyOTP').get(); 
router.route('/createResetSession').get(); 


//Put Method 
router.route('/updateuser').put();
router.route('/resetPassword').put();

export default router;