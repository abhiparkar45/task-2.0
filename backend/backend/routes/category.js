const express = require("express");
const router = express.Router();

const {
  newCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

router.route("/categories/new").post(newCategory);
router.route("/categories").get(getAllCategories);
router
  .route("/category/:id")
  .put(updateCategory)
  .delete(deleteCategory)
  .get(getCategory);

module.exports = router;
