const express = require("express");

// access params from different routes
const router = express.Router({ mergeParams: true });

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  setCategoryIdToBody,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
