import jwt from 'jsonwebtoken'

import AppError from "../utlis/appError.js";



export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;
    next();
  };
