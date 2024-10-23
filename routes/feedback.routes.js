import express from 'express';
import { createFeedback, getAllFeedback } from '../controller/feedback.controller.js';
import { authorizeRoles,isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/createFeedback', createFeedback);


router.get('/getAllFeedback',isLoggedIn,authorizeRoles('admin'), getAllFeedback);

export default router;
