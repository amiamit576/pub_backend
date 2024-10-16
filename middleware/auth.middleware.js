import jwt from 'jsonwebtoken'

import AppError from "../utlis/appError.js";



export const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token)

    if (!token) {
      return (new AppError("Unauthorized, please login to continue", 401));
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded)
    if (!decoded) {
      return (new AppError("Unauthorized, please login to continue", 401));
    }
    req.user = decoded;
    next();
  };
