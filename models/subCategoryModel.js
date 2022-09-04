const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Must enter name"],
      unique: [true, "sub category must be unique"],
      minlength: [3, "Too short name"],
      maxlength: [32, "Too Long name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.objectID,
      ref: "Category",
      required: [true, "sub category must belong to parent category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subCategorySchema, "subCategory");
