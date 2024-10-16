import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
    validate: {
      validator: Number.isInteger,
      message: 'Party size must be an integer',
    },
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value >= new Date(),
      message: 'Reservation date must be in the future',
    },
  },
  tableNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
    validate: {
      validator: Number.isInteger,
      message: 'Table number must be an integer',
    },
  },
  timeSlot: {
    from: {
      type: String,
      match: [/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, 'Please provide time in HH:MM format'],
    },
   
  },
  seatingPreference: {
    type: String,
    enum: ['Indoor', 'Outdoor', 'Window'],
   
  },
  additionalDetails: {
    type: String,
    maxlength: 500,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validation at the schema level for timeSlot
reservationSchema.pre('save', function (next) {
  const { from, to } = this.timeSlot;
  if (from >= to) {
    return next(new Error('Time slot "from" must be earlier than "to"'));
  }
  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
