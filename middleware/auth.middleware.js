import jwt from 'jsonwebtoken'

import AppError from "../utlis/appError.js";



export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)

    if (!token) {
      return (new AppError("Unauthorized, please login to continue", 401));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return (new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;
    next();
  };

  // Middleware to check if user is admin or not
  export const authorizeRoles = (...roles) => {
    return async (req, res, next) => {
      try {
        if (!roles.includes(req.user.role)) {
          throw new AppError("You do not have permission to view this route", 403);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  

