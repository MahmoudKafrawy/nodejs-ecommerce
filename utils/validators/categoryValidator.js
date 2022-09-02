const { check } = require("express-validator");
const validatorMiddleWare = require("../../middleware/validatorMiddleWare");
// I put rules and middleware here
// can use check instead of param to check body and param
exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleWare,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name must entered")
    .isLength({ min: 3 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too Long name"),
  validatorMiddleWare,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleWare,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleWare,
];
