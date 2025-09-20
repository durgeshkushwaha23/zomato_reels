const express = require("express")
const authControllers = require("../Controllers/auth_controller")
const router = express.Router();



//user auth apis
router.post("/user/register",authControllers.registerUser)
router.post("/user/login",authControllers.loginUser)
router.get("/user/logout",authControllers.logoutUser)


//food partner apis
router.post("/food-partner/register",authControllers.registerFoodPartner)
router.post("/food-partner/login",authControllers.loginFoodPartner)
router.get("/food-partner/logout",authControllers.logoutFoodPartner)


module.exports = router;