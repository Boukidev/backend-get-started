const express = require("express");
const productCtrl = require("../controllers/product.js");

const router = express.Router();

router.post("/api/products", productCtrl.postProducts);
router.get("/api/products", productCtrl.getProducts);
router.get("/api/products/:id", productCtrl.getProduct);
router.put("/api/products/:id", productCtrl.putProduct);
router.delete("/api/products/:id", productCtrl.deleteProduct);

module.exports = router;
