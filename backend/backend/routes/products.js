const express = require("express");
const router = express.Router();

const {
  newProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products/new").post(newProduct);
router.route("/products/:id").get(getAllProducts);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProduct);
router.route("/product/:id").delete(deleteProduct);

module.exports = router;
