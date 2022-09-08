const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategory = require("../models/subCategoryModel");
const ApiError = require("../utils/apiError");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

//@desc    Create Sub Category
//@route   POST /api/v1/subcategories
//@access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

//@desc    Get All Categories
//@route   GET /api/v1/categories?page?limit
//@access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 4;
  const skip = (page - 1) * limit;

  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }

  const subCategories = await SubCategory.find(filterObject)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" }); // to get name only without id use (-_id)
  res.status(200).json({ results: subCategories.length, page, data: subCategories });
});

//@desc    Get Specific Sub Category by ID
//@route   GET /api/v1/subcategories/:id
//@access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!subCategory) {
    // res.status(404).json({ msg: "No Category for this id" });
    return next(new ApiError("Not Found ", 404));
  }
  res.status(200).json({ data: subCategory });
});

//@desc    Update Sub Category
//@route   PUT /api/v1/subcategories/:id
//@access  Private
exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const nameSlugify = slugify(name);
  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: nameSlugify, category },
    { new: true }
  );
  if (!subcategory) {
    res.status(404).json({ msg: "not found" });
  }
  res.status(200).json({ data: subcategory });
});

//@desc    Delete Specific Sub Category by ID
//@route   Delete /api/v1/categories/:id
//@access  PRIVATE
exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete({ _id: id });
  if (!subCategory) {
    res.status(404).json({ msg: "not found" });
  }
  res.status(204).send();
});
