const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createProductValidator = [
  body("title").notEmpty().withMessage("Product title is required.").trim(),
  body("description")
    .notEmpty()
    .withMessage("Product description is required.")
    .trim(),
  body("price")
    .notEmpty()
    .withMessage("Product price is required.")
    .isNumeric()
    .withMessage("Product price must be a number."),
  body("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number.")
    .custom((value, { req }) => {
      if (value > req.body.price)
        throw new Error(
          "Product price after discount must be less than product price"
        );
      else return true;
    }),
  body("brand").optional().isMongoId().withMessage("Invalid brand id format."),
  body("category")
    .notEmpty()
    .withMessage("Product category is required.")
    .isMongoId()
    .withMessage("Invalid category id format."),
  body("subcategory")
    .notEmpty()
    .withMessage("Product subcategory is required.")
    .isMongoId()
    .withMessage("Invalid subcategory id format."),
  body("quantity")
    .notEmpty()
    .withMessage("Product quantity is required.")
    .isNumeric()
    .withMessage("Product quantity must be a number.")
    .isInt()
    .withMessage("Product quantity must be an integer."),
  body("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number.")
    .isInt()
    .withMessage("Product sold must be an integer."),
  validatorMiddleware,
];

exports.getProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id format"),
  body("title").optional().trim(),
  body("description").optional().trim(),
  body("price").optional().isNumeric().withMessage("Price must be a number."),
  body("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number.")
    .custom((value, { req }) => {
      if (value > req.body.price)
        throw new Error(
          "Product price after discount must be less than product price"
        );
      else return true;
    }),
  body("brand").optional().isMongoId().withMessage("Invalid brand id format."),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id format."),
  body("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subcategory id format."),
  body("quantity")
    .optional()
    .isNumeric()
    .withMessage("Quantity must be a number.")
    .isInt()
    .withMessage("Quantity must be an integer."),
  body("sold")
    .optional()
    .isNumeric()
    .withMessage("Sold must be a number.")
    .isInt()
    .withMessage("Sold must be an integer."),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  param("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];
