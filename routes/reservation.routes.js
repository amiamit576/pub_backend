import express from 'express';
import { isLoggedIn,authorizeRoles } from '../middleware/auth.middleware.js';
import { 
  createReservation, 
  getAllReservations, 
  getReservationById, 
  updateReservation, 
  deleteReservation,
  getAllReservationsAdmin,
  updateReservationAdmin,
  deleteReservationAdmin,
} from '../controller/reservation.controller.js';

const router = express.Router();

router.post('/createReservation', isLoggedIn, createReservation);
router.get('/getAllReservations', isLoggedIn, getAllReservations);
router.get('/getReservationById/:id', isLoggedIn, getReservationById);
router.put('/updateReservation/:id', isLoggedIn, updateReservation);
router.get('/getAllReservationsAdmin', isLoggedIn, authorizeRoles('admin'), getAllReservationsAdmin);
router.delete('/AdmindeleteReservation/:id', deleteReservationAdmin);
router.put('/AdminupdateReservation/:id', updateReservationAdmin);
router.delete('/deleteReservation/:id', isLoggedIn, deleteReservation);


export default router;
