import Reservation from '../models/reservation.model.js';
import sendEmail from '../utlis/sendEmail.js';


import User from '../models/user.model.js'; 

export const createReservation = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id; 



    // Fetch user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { partySize, date, tableNumber, timeSlot, seatingPreference, additionalDetails } = req.body;
    console.log("Reservation data:", req.body);

    // Create a new reservation
    const newReservation = new Reservation({
      user: userId,
      partySize,
      date,
      tableNumber,
      timeSlot,
      seatingPreference,
      additionalDetails,
    });

    // Save the reservation to the database
    const savedReservation = await newReservation.save();

    const userEmail = user.email; // Get the user's email from the fetched user object
    console.log("User Email:", userEmail);

    const subject = 'Reservation Confirmation';
    const message = `
      <h1>Reservation Confirmed</h1>
      <p>Your reservation has been successfully created. Here are the details:</p>
      <ul>
        <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
        <li><strong>Time Slot:</strong> ${timeSlot.from}</li>
        <li><strong>Table Number:</strong> ${tableNumber}</li>
        <li><strong>Party Size:</strong> ${partySize}</li>
        <li><strong>Seating Preference:</strong> ${seatingPreference}</li>
        <li><strong>Additional Details:</strong> ${additionalDetails}</li>
      </ul>
      <p>Thank you for choosing our restaurant. We look forward to serving you!</p>
    `;

    // Send reservation confirmation email
    await sendEmail(userEmail, subject, message);

    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(400).json({ error: error.message });
  }
};


// Get all reservations for the logged-in user
export const getAllReservations = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const reservations = await Reservation.find({ user: userId });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single reservation by ID for the logged-in user
export const getReservationById = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const reservation = await Reservation.findOne({ _id: req.params.id, user: userId });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a reservation for the logged-in user
export const updateReservation = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a reservation for the logged-in user
export const deleteReservation = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const deletedReservation = await Reservation.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// allreservervation for  Admin
export const getAllReservationsAdmin = async (req, res) => {
  try {
    // Fetch all reservations from the database
    const allReservations = await Reservation.find().populate('user', 'name email');

    res.status(200).json(allReservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin-specific update reservation
export const updateReservationAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Admin-specific delete reservation
export const deleteReservationAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};