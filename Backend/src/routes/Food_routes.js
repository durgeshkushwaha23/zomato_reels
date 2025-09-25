const express = require("express");
const router = express.Router();
const foodController = require("../Controllers/food_controller");
const authmiddleware = require("../middleware/auth_middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// post method with /api/food[protected]
router.post(
  "/",
  authmiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood
);

//get method /api/food[protected]
router.get("/",authmiddleware.authUserMiddleware,foodController.getFoodItems)








module.exports = router;
