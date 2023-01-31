import { Router } from "express";
const router = Router();


//Post Methods
router.route('/register').post((req, res) => res.json('Register route'));
router.route('/registerMail').post();
router.route('/authenticate').post();
router.route('/login').post();





export default router;