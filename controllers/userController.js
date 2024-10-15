const User = require("../models/user.model");
const bcrypt = require("bcrypt");


exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    // Use findOne instead of findById for string-based userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    // console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile", error });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    // Check if the new email is already used by another user
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.userId !== req.user.userId) {
        return res.status(400).json({ message: "Email is already in use" });
      }
    }

    const user = await User.findOneAndUpdate(
      { userId: req.user.userId },
      { fullName, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    if (error.code && error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Duplicate key error", error });
    } else {
    //   console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Error updating user profile", error });
    }
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const email = req.user.email; // Ensure you have the right user identifier

    // Find the user by email or any unique identifier
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Set new password
    user.password = newPassword; // The password will be hashed by the pre-save hook
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    // console.error("Error changing password:", error);
    res.status(500).json({ message: "Error changing password", error });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the refresh token from the user document
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    // console.error("Error logging out:", error);
    res.status(500).json({ message: "Error logging out" });
  }
};
