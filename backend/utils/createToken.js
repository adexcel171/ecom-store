import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Best expiry for e-commerce login session
  });

  res.cookie("jwt", token, {
    httpOnly: false, // Allows browser access (needed for frontend auth)
    secure: process.env.NODE_ENV === "production" ? true : false, // Prevents issues on phone (allows HTTP locally)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Ensures cross-origin support
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiry
  });

  return token;
};

export default generateToken;
