import AppError from '../utlis/appError.js';
import emailValidator from 'email-validator';
import User from '../models/user.model.js';

const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  httpOnly: true,
  sameSite: 'Lax',
};

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, terms } = req.body;

    if (!firstName || !lastName || !email || !password || !terms) {
      return next(new AppError('All fields are required', 400));
    }

    if (!emailValidator.validate(email)) {
      return next(new AppError('Invalid email format', 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError('Email already exists', 400));
    }

    const user = await User.create({ firstName, lastName, email, password, role, terms });
    res.status(201).json({
      status: 'success',
      message: "User registered successfully",
      data: { user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role } },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email and password are required', 400));
  }
  
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    
    return next(new AppError('Email or Password do not match or user does not exist', 401));
  }

  const token = await user.generateJWTToken();

  res.cookie('token', token, cookieOptions);


  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user: { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }
  });
};

export const logout = (req, res) => {
  console.log('logout method ')
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'Lax', 
    path: '/', 
  });
  console.log('logout method complete ')
  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};


export const getLoggedInUserDetails = async (req, res, next) => {

  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: 'User details',
    user,
  });
 
};
