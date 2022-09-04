const express = require("express");

const router = express.Router();

const { createSubCategory } = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router.route("/").post(createSubCategoryValidator, createSubCategory);

module.exports = router;
