const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Function to generate a JWT token
function generateToken(userId) {
  const payload = {
    userId: userId,
  };

  const options = {
    expiresIn: "1day", // Token expiration time (e.g., 1 hour)
  };

  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
