const express = require("express");
const router = express.Router()
const cartController = require("../controllers/cart.controllers");

//http://localhost:5000/api/v1/auth/createCart
router.post("/", cartController.createCart);

module.exports = router;