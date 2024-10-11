import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters'],
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    maxlength: [50, 'Last name cannot exceed 50 characters'],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  role: {
    type: String,
    lowercase: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  terms: {
    type: Boolean,
    required: [true, "You must accept the terms and conditions"],
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  comparePassword: async function (plainPassword) {
    

    return await bcrypt.compare(plainPassword, this.password);
  },

  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  }
};

const User = mongoose.model('User', userSchema);

export default User;
