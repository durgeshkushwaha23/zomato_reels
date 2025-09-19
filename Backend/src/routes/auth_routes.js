const express = require("express")
const authControllers = require("../Controllers/auth_controller")
const router = express.Router();




router.post("/user/register",authControllers.registerUser)
router.post("/user/login",authControllers.loginUser)



module.exports = router;