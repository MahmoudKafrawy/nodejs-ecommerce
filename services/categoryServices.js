const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/CategoryModel");
const ApiError = require("../utils/apiError");

//@desc    Get All Categories
//@route   GET /api/v1/categories?page?limit
//@access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@desc    Get Specific Category by ID
//@route   GET /api/v1/categories/:id
//@access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    // res.status(404).json({ msg: "No Category for this id" });
    return next(new ApiError("Not Found ", 404));
  }
  res.status(200).json({ data: category });
});
//@desc    Create Category
//@route   POST /api/v1/categories
//@access  Private
exports.createCatergory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
//@desc    Update Category
//@route   PUT /api/v1/categories
//@access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const nameSlugify = slugify(name);
  const category = await Category.findOneAndUpdate({ _id: id }, { name, slug: nameSlugify }, { new: true });
  if (!category) {
    res.status(404).json({ msg: "not found" });
  }
  res.status(200).json({ data: category });
});
//@desc    Delete Specific Category by ID
//@route   Delete /api/v1/categories/:id
//@access  PRIVATE
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete({ _id: id });
  if (!category) {
    res.status(404).json({ msg: "not found" });
  }
  res.status(204).send();
});
