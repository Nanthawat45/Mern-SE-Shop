const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/auth.Jwt.middlewares");

//http://localhost:5000/api/v1/auth/sign
router.post("/sign", userController.sign);
//http://localhost:5000/api/v1/auth/login   
router.post("/", userController.addUser);
//http://localhost:5000/api/v1/auth/users
router.get("/", userController.getAllUsers);
//http://localhost:5000/api/v1/auth/users/:id
router.put("/:id", authJwt.verifyToken, userController.updateUser);

router.delete("/:id", authJwt.verifyToken, userController.deleteUser);

router.patch("/:id", authJwt.verifyToken, userController.makeUser);



module.exports = router;