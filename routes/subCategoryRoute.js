const express = require("express");

const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory);

module.exports = router;
