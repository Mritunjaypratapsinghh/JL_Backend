const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  console.log("Received Token:", token); // Debug: print the token

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded); // Debug: print decoded token
    req.user = decoded; // Attach decoded user data to request
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error); // Log detailed error
    res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};
