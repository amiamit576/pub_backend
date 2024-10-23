import Feedback from '../models/feedback.model.js';

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting feedback', error });
  }
};

// Get all feedback (optional if needed)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};
