const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/auth.Jwt.middlewares");


//http://localhost:5000/api/v1/Product
//router.post("/", uploadToFirebase, upload, productController.createProduct);
router.post("",authJwt.verifyToken,upload,uploadToFirebase,productController.createProduct);
//http://localhost:5000/api/v1/Product
router.get("", productController.getProducts);
//http://localhost:5000/api/v1/Product/32132123131
router.get("/:id", productController.getProductById);
//http://localhost:5000/api/v1/Product/32132123131
router.delete("/:id", authJwt.verifyToken, productController.deleteProduct);
//http://localhost:5000/api/v1/post/32132123131
router.put("/:id", authJwt.verifyToken, upload, productController.updateProduct);
module.exports = router;