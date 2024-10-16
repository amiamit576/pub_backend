import express from 'express';
import { signUp, login, logout, getLoggedInUserDetails  } from '../controller/user.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/login', login);
router.post('/logout',isLoggedIn, logout);
router.get("/getLoggedInUserDetails", isLoggedIn, getLoggedInUserDetails );

export default router;








