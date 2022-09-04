const mongoose = require("mongoose");

// Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must entered"],
      unique: [true, "name must be unique"],
      minlength: [3, "Too short name"],
      maxlength: [32, "Too Long name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// model
const CategoryModel = mongoose.model("Category", categorySchema, "Category");

module.exports = CategoryModel;
