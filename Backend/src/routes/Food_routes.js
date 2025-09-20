const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/food_controller")
const authmiddleware = require("../middleware/auth_middleware")

// post method with /api/food[protected]
router.post("/",authmiddleware.authFoodPartnerMiddleware,foodController.createFood)

module.exports = router