const { param } = require("express-validator");
const validatorMiddleWare = require("../../middleware/validatorMiddleWare");
// I put rules and middleware here
// can use check instead of param to check body and param
const getCategoryValidator = [
  param("id").isMongoId().withMessage("invalid id"),
  validatorMiddleWare,
];

module.exports = getCategoryValidator;
