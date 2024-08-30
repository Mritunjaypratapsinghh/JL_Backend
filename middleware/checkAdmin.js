const User = require("../models/user.model");
const Role = require("../models/role.model");

exports.checkAdmin = async (req, res, next) => {
  try {
    // Fetch user details using userId
    const user = await User.findOne({ userId: req.user.userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch role separately
    const role = await Role.findOne({ roleId: user.role });

    if (!role || role.roleName !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking admin status", error });
  }
};
