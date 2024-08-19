const Role = require("../models/role.model");
const checkAdmin = require("../middleware/checkAdmin");
const User = require("../models/user.model")
const mongoose = require("mongoose")

exports.createRole = async (req, res) => {
  try {
    const { roleName, company } = req.body;
    const role = new Role({ roleName, company });
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("company");
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoleById = async (req, res) => {
    try {
      const roleId = req.params.roleId;
  
      // Check if roleId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "Invalid roleId format" });
      }
  
      const role = await Role.findById(roleId).populate("company");
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.updateRole = async (req, res) => {
    try {
      const roleId = req.params.roleId;
  
      // Check if roleId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "Invalid roleId format" });
      }
  
      const role = await Role.findByIdAndUpdate(roleId, req.body, { new: true });
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.deleteRole = async (req, res) => {
    try {
      const roleId = req.params.roleId;
  
      // Check if roleId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "Invalid roleId format" });
      }
  
      const role = await Role.findByIdAndDelete(roleId);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  exports.assignRole = async (req, res) => {
    try {
      const { userId, roleId } = req.body;
  
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: "Invalid userId or roleId format" });
      }
  
      // Find the user and role by their ObjectId
      const user = await User.findById(userId);
      const role = await Role.findById(roleId);
  
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!role) return res.status(404).json({ message: "Role not found" });
  
      // Assign the new roleId to the user
      user.role = role._id;
      await user.save();
  
      // Populate the role data when returning the user
      const populatedUser = await User.findById(user._id).populate('role');
  
      res.status(200).json({ message: "Role assigned successfully", user: populatedUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  