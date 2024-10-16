import express from 'express';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import { 
  createReservation, 
  getAllReservations, 
  getReservationById, 
  updateReservation, 
  deleteReservation 
} from '../controller/reservation.controller.js';

const router = express.Router();

router.post('/createReservation', isLoggedIn, createReservation);
router.get('/getAllReservations', isLoggedIn, getAllReservations);
router.get('/getReservationById/:id', isLoggedIn, getReservationById);
router.put('/updateReservation/:id', isLoggedIn, updateReservation);
router.delete('/deleteReservation/:id', isLoggedIn, deleteReservation);

export default router;
