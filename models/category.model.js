const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    default: uuidv4,
    unique: true, // Ensure that categoryId is unique
  },
  categoryName: {
    type: String,
    required: true,
    unique: [true, "Category already exists"], // Custom error message
  },
}, { timestamps: true }); // Add timestamps if needed

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
