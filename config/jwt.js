const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;

// Function to generate a JWT token
function generateToken(userId, role) {
  const payload = {
    userId: userId,
    role: role,
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
const verifyUserRole = (role) => (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);
    // Check if the decoded token matches the expected role
    if (decoded.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Store the decoded token in the request object for future use
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  verifyUserRole,
};
