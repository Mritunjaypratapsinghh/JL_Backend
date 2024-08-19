const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  // Extract token from Authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  console.log("Received Token:", token); // Debug: print the token

  try {
    // Verify token using the secret key
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

exports.checkAuthorization = (roles) => {
  return (req, res, next) => {
    // Check if req.user and req.user.role are defined
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({ message: "Access denied. No role information" });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission" });
    }

    next(); // Pass control to the next middleware or route handler
  };
};
