import express, { Request, Response, Router } from 'express';
import { sendOTP, signup, login } from '../controllers/authController';

const router: Router = express.Router();

router.post('/sendotp', sendOTP);
router.post('/signup', signup as any);
router.post('/login', login as any);

export default router;
