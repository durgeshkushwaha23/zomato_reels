const foodModel = require("../model/Food_model");
const stroageService = require("../services/storage_service");

async function createFood(req, res) {
  // Check if req.foodpartner exists
  if (!req.foodpartner || !req.foodpartner.id) {
    return res
      .status(400)
      .json({ message: "Food partner information is missing" });
  }

  const { v4: uuid } = await import("uuid");
  const fileuploadResult = await stroageService.uploadFile(
    req.file.buffer,
    uuid()
  );

  const foodItm = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileuploadResult.url,
    foodpartner: req.foodpartner.id,
  });
  res.status(201).json({
    message: "food created sucessfully",
    food: foodItm,
  });
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

module.exports = {
  createFood,
  getFoodItems
};
