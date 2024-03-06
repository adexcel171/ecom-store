import jwt from "jsonwebtoken";


const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "100d",
  });

  res.cookie("jwt", token, {
    httpOnly: false,
<<<<<<< HEAD
    secure: true, // Set to false during development
=======
    secure: false, // Set to false during development
>>>>>>> 4543f32c7c069411fdb54d27e6f0074c077b344b
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  

  return token;
};

export default generateToken;
