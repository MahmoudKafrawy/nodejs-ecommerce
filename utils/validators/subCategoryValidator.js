const { check } = require("express-validator");
const validatorMiddleWare = require("../../middleware/validatorMiddleWare");
// I put rules and middleware here
// can use check instead of param to check body and param
exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name must entered")
    .isLength({ min: 2 })
    .withMessage("Too short name")
    .isLength({ max: 32 })
    .withMessage("Too Long name"),
  check("category").isMongoId().withMessage("invalid mongo ID"),
  validatorMiddleWare,
];

// exports.updateSubCategoryValidator = [
//   check("id").isMongoId().withMessage("invalid id"),
//   validatorMiddleWare,
// ];

// exports.deleteSubCategoryValidator = [
//   check("id").isMongoId().withMessage("invalid id"),
//   validatorMiddleWare,
// ];
