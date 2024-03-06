import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  // Generate a JWT token using the user's _id and a secret key
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // Set the cookie in the HTTP response
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true, // Cookie is accessible only through HTTP(S) and not JavaScript
      maxAge: 15 * 60 * 1000, // Max age of the cookie in milliseconds (15 minutes in this case)
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", // Configure sameSite attribute based on environment
      secure: process.env.NODE_ENV === "Development" ? false : true, // Set secure attribute based on environment
    })
    .json({
      success: true,
      message,
    });
};
