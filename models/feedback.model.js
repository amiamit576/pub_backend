import mongoose from 'mongoose';

// Feedback Schema with timestamps and phone validation
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Basic email format validation
  },
  phone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'], // Validation for Indian mobile numbers
  },
  feedbackType: {
    type: String,
    enum: ['Compliment', 'Complaint', 'Suggestion', 'Other'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
