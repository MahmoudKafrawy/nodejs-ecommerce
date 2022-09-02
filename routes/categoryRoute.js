const express = require("express");
const { param, validationResult } = require("express-validator");
const validatorMiddleWare = require("../middleware/validatorMiddleWare");
const {
  getCategories,
  createCatergory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");
const getCategoryValidator = require("../utils/validators/categoryValidator");
const router = express.Router();

router.route("/").get(getCategories).post(createCatergory);
router
  .route("/:id")
  .get(
    // 1- rules
    // 2- middleware to catch errors from rules if exist
    getCategoryValidator,
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
