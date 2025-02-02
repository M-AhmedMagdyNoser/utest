const router = require("express").Router();

const {
  createCategory,
  getCategories,
  getCategory,
} = require("../services/categoryService");

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

module.exports = router;
