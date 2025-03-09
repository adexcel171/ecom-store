import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  // Log the cookies to debug if they're being received
  console.log("Cookies received:", req.cookies);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("Token decoded successfully:", decoded); // Debug token decoding
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message); // Debug error
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    console.log("No open token found in cookies"); // Debug missing token
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
